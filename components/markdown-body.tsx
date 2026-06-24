"use client";
import type { ReactNode } from "react";

function parseInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[1]) {
      nodes.push(
        <strong key={match.index} className="font-semibold text-text">
          {match[1]}
        </strong>,
      );
    } else if (match[2] && match[3]) {
      nodes.push(
        <a
          key={match.index}
          href={match[3]}
          target="_blank"
          rel="noreferrer noopener"
          className="text-accent underline underline-offset-2 transition hover:opacity-80"
        >
          {match[2]}
        </a>,
      );
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function MarkdownBody({ content }: { content: string }) {
  const blocks = content.split(/\n\n+/);
  const elements: ReactNode[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i].trim();
    if (!block) continue;

    if (block.startsWith("# ")) {
      elements.push(
        <h2
          key={i}
          className="font-display italic text-text mt-12 mb-4"
          style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
        >
          {block.slice(2)}
        </h2>,
      );
    } else if (block.startsWith("## ")) {
      elements.push(
        <h3
          key={i}
          className="font-display italic text-text mt-10 mb-3"
          style={{ fontSize: "clamp(1.4rem, 3vw, 1.75rem)" }}
        >
          {block.slice(3)}
        </h3>,
      );
    } else if (/^\d+\.\s/.test(block)) {
      const items = block.split(/\n/).filter(Boolean);
      elements.push(
        <ol key={i} className="my-4 list-decimal pl-6 space-y-3 text-text-muted leading-relaxed">
          {items.map((item, j) => (
            <li key={j}>{parseInline(item.replace(/^\d+\.\s*/, ""))}</li>
          ))}
        </ol>,
      );
    } else if (/^[-*]\s/.test(block)) {
      const items = block.split(/\n/).filter(Boolean);
      elements.push(
        <ul key={i} className="my-4 list-disc pl-6 space-y-2 text-text-muted leading-relaxed">
          {items.map((item, j) => (
            <li key={j}>{parseInline(item.replace(/^[-*]\s*/, ""))}</li>
          ))}
        </ul>,
      );
    } else {
      elements.push(
        <p key={i} className="my-4 text-text-muted leading-relaxed">
          {parseInline(block)}
        </p>,
      );
    }
  }

  return <div className="max-w-prose">{elements}</div>;
}
