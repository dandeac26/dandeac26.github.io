import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Tag, ChevronDown, ChevronUp } from "lucide-react";
import BlogPost from "./BlogPost";

interface BlogMeta {
  title: string;
  date: string;
  description: string;
  tags: string[];
  slug: string;
  content: string;
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
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

const Blog: React.FC = () => {
  const posts = loadBlogPosts();
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

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

        <div className="max-w-3xl mx-auto space-y-4">
          {posts.map((post, index) => {
            const isExpanded = expandedSlug === post.slug;
            return (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card rounded-xl overflow-hidden shadow-sm"
              >
                {/* Post Header (clickable) */}
                <button
                  onClick={() => setExpandedSlug(isExpanded ? null : post.slug)}
                  className="w-full text-left p-5 flex items-start justify-between gap-4 hover:bg-hover transition-colors cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-heading mb-1">
                      {post.title}
                    </h3>
                    <p className="text-body text-sm mb-2">{post.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted">
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
                  <div className="text-muted mt-1">
                    {isExpanded ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </div>
                </button>

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
