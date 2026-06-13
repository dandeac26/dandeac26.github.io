import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Tag,
  ChevronDown,
  ChevronUp,
  Share2,
  Check,
} from "lucide-react";
import BlogPost from "./BlogPost";

interface BlogMeta {
  title: string;
  date: string;
  description: string;
  tags: string[];
  slug: string;
  content: string;
  banner?: string;
}

// Import all blog markdown files at build time
const blogModules = import.meta.glob("../data/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function parseFrontmatter(raw: string): {
  data: Record<string, string | string[]>;
  content: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const frontmatter = match[1];
  const content = match[2];
  const data: Record<string, string | string[]> = {};

  for (const line of frontmatter.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();

    // Parse array values like [tag1, tag2]
    if (value.startsWith("[") && value.endsWith("]")) {
      data[key] = value
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim());
    } else {
      data[key] = value;
    }
  }

  return { data, content };
}

function loadBlogPosts(): BlogMeta[] {
  return Object.entries(blogModules)
    .map(([path, raw]) => {
      const slug = path.split("/").pop()?.replace(".md", "") ?? "";
      const { data, content } = parseFrontmatter(raw);
      return {
        title: (data.title as string) ?? slug,
        date: (data.date as string) ?? "",
        description: (data.description as string) ?? "",
        tags: (data.tags as string[]) ?? [],
        slug,
        content,
        banner: (data.banner as string) || undefined,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

const Blog: React.FC = () => {
  const posts = loadBlogPosts();
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // Open (and scroll to) a post when the page is loaded with a #post-<slug>
  // hash, e.g. someone follows a shared link. Also reacts to later hash
  // changes so back/forward and pasted links work without a reload.
  useEffect(() => {
    // Take over scroll handling so the browser's native "jump to #id" and its
    // scroll restoration don't fight our smooth scroll on first paint.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const applyHash = () => {
      const hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      if (!hash.startsWith("post-")) return;
      const slug = hash.slice("post-".length);
      if (!posts.some((p) => p.slug === slug)) return;
      setExpandedSlug(slug);

      // The target sits far down the page and contains lazy-loaded images, so
      // its position keeps shifting while things load. Re-scroll a few times
      // (and once on full window load) so we reliably settle on the post.
      const scrollToPost = () => {
        const el = document.getElementById(`post-${slug}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      };
      const timers = [50, 250, 600, 1200].map((d) =>
        window.setTimeout(scrollToPost, d)
      );
      window.addEventListener("load", scrollToPost, { once: true });
      return timers;
    };

    const initialTimers = applyHash() ?? [];
    window.addEventListener("hashchange", applyHash);
    return () => {
      window.removeEventListener("hashchange", applyHash);
      initialTimers.forEach((t) => window.clearTimeout(t));
    };
    // posts is derived from static imports, so it's stable across renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = useCallback((slug: string) => {
    setExpandedSlug((current) => {
      const next = current === slug ? null : slug;
      // Keep the URL in sync so the address bar reflects the open post and
      // can be copied/shared directly, without forcing a scroll jump.
      const url = next
        ? `#post-${slug}`
        : window.location.pathname + window.location.search;
      window.history.replaceState(null, "", url);
      return next;
    });
  }, []);

  const handleShare = useCallback(
    async (slug: string, e: React.MouseEvent) => {
      e.stopPropagation();
      const url = `${window.location.origin}${window.location.pathname}#post-${slug}`;
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        // Fallback for non-secure contexts where the Clipboard API is blocked.
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopiedSlug(slug);
      setTimeout(
        () => setCopiedSlug((s) => (s === slug ? null : s)),
        2000
      );
    },
    []
  );

  return (
    <section
      id="blog"
      className="py-16 md:py-24 bg-surface-alt transition-colors"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold text-heading mb-10"
        >
          Blog
        </motion.h2>

        <div className="space-y-4">
          {posts.map((post, index) => {
            const isExpanded = expandedSlug === post.slug;
            return (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                id={`post-${post.slug}`}
                className="scroll-mt-6 bg-card rounded-xl overflow-hidden shadow-sm"
              >
                {/* Optional banner */}
                {post.banner && (
                  <button
                    onClick={() => toggle(post.slug)}
                    className="group block w-full cursor-pointer overflow-hidden"
                    aria-label={`Toggle ${post.title}`}
                  >
                    <motion.div
                      animate={{ height: isExpanded ? "auto" : "13rem" }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="relative overflow-hidden"
                    >
                      <img
                        src={post.banner}
                        alt={`${post.title} banner`}
                        loading="lazy"
                        className={`w-full transition-transform duration-[600ms] ease-out ${
                          isExpanded
                            ? "h-auto object-contain"
                            : "h-full object-cover group-hover:scale-[1.04]"
                        }`}
                      />
                      {/* subtle gradient + lift on hover, only while collapsed */}
                      {!isExpanded && (
                        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      )}
                    </motion.div>
                  </button>
                )}

                {/* Post Header */}
                <div className="flex items-start">
                  <button
                    onClick={() => toggle(post.slug)}
                    className="flex-1 min-w-0 text-left p-5 flex items-start justify-between gap-3 sm:gap-4 hover:bg-hover transition-colors cursor-pointer"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-heading mb-1">
                        {post.title}
                      </h3>
                      <p className="text-body text-sm mb-2">
                        {post.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        {post.tags.length > 0 && (
                          <span className="flex items-center gap-1">
                            <Tag size={12} />
                            {post.tags.join(", ")}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-muted mt-1 shrink-0">
                      {isExpanded ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </div>
                  </button>

                  {/* Share — a polished pill that copies a direct link */}
                  <div className="shrink-0 p-3 sm:p-4">
                    <button
                      onClick={(e) => handleShare(post.slug, e)}
                      title={
                        copiedSlug === post.slug ? "Link copied!" : "Copy link"
                      }
                      aria-label={`Copy link to ${post.title}`}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-medium transition-all duration-200 cursor-pointer active:scale-95 ${
                        copiedSlug === post.slug
                          ? "border-green-500/40 bg-green-500/10 text-green-500"
                          : "border-border bg-surface-alt text-muted hover:text-accent hover:border-accent hover:shadow-sm"
                      }`}
                    >
                      {copiedSlug === post.slug ? (
                        <Check size={15} />
                      ) : (
                        <Share2 size={15} />
                      )}
                      <span className="hidden sm:inline">
                        {copiedSlug === post.slug ? "Copied" : "Share"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Expanded Post Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-border pt-4">
                        <BlogPost content={post.content} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {posts.length === 0 && (
            <p className="text-center text-muted">
              No blog posts yet. Check back soon!
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;
