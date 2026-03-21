import ReactMarkdown from "react-markdown";

interface BlogPostProps {
  content: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ content }) => {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:text-heading prose-p:text-body prose-a:text-accent prose-strong:text-heading prose-code:bg-code-bg prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default BlogPost;
