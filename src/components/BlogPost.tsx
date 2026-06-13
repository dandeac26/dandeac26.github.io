import ReactMarkdown from "react-markdown";

interface BlogPostProps {
  content: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ content }) => {
  return (
    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none prose-headings:text-heading prose-p:text-body prose-a:text-accent prose-strong:text-heading">
      <ReactMarkdown
        components={{
          img: ({ src, alt }) => {
            // Diagrams (e.g. the scam flowchart) are allowed their natural
            // size; tall phone screenshots are height-capped so they don't
            // dominate the post.
            const isDiagram =
              typeof src === "string" && src.includes("scam-flow");
            return (
              <img
                src={src}
                alt={alt}
                loading="lazy"
                className={`mx-auto my-5 block rounded-lg border border-border ${
                  isDiagram ? "" : "max-h-[30rem] w-auto"
                }`}
              />
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default BlogPost;
