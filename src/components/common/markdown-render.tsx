"use client";

import React from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
export const components = {
  h1: (props: any) => (
    <h1 className="text-3xl font-bold my-4 text-foreground" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-2xl font-bold my-3 text-foreground" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-xl font-bold my-2 text-foreground" {...props} />
  ),
  p: (props: any) => (
    <p className="my-2 leading-relaxed text-foreground" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc pl-5 my-2 text-foreground" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal pl-5 my-2 text-foreground" {...props} />
  ),
  li: (props: any) => <li className="my-1 text-foreground" {...props} />,
  a: (props: any) => <a className="text-primary hover:underline" {...props} />,
  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-border pl-4 italic my-2 text-muted-foreground"
      {...props}
    />
  ),
  code: (props: any) => (
    <code
      className="bg-muted rounded px-1 py-0.5 font-mono text-sm text-foreground"
      {...props}
    />
  ),
  pre: (props: any) => (
    <pre
      className="bg-muted rounded p-4 overflow-x-auto my-4 font-mono text-sm text-foreground"
      {...props}
    />
  ),
  img: (props: any) => (
    <img className="max-w-full h-auto my-4" {...props} alt={props.alt || ""} />
  ),
  table: (props: any) => (
    <table
      className="border-collapse table-auto w-full my-4 border-border"
      {...props}
    />
  ),
  th: (props: any) => (
    <th
      className="border border-border px-4 py-2 text-left font-bold text-foreground"
      {...props}
    />
  ),
  td: (props: any) => (
    <td className="border border-border px-4 py-2 text-foreground" {...props} />
  ),
};

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [html, setHtml] = React.useState<string>("");

  React.useEffect(() => {
    const processMarkdown = async () => {
      // Process markdown to HTML
      const result = await unified()
        .use(remarkParse) // Parse markdown
        .use(remarkRehype) // Convert to HTML AST
        .use(rehypeSanitize) // Sanitize HTML (important for security)
        .use(rehypeStringify) // Convert to HTML string
        .process(content);

      setHtml(String(result));
    };

    processMarkdown();
  }, [content]);

  // Render HTML with custom components
  if (!html) return <div>Loading...</div>;

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className="markdown-content"
    />
  );
}
