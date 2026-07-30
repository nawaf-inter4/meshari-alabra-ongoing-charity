import type { ReactNode } from "react";

interface BidiTextProps {
  text: string;
  direction: "ltr" | "rtl";
}

const ARABIC_SCRIPT = /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]/u;
const PARENTHETICAL = /(\([^()]+\))/gu;

function textDirection(text: string, fallback: "ltr" | "rtl") {
  return ARABIC_SCRIPT.test(text) ? "rtl" : fallback;
}

/**
 * Keeps neutral parentheses attached to their contents when Arabic and Latin
 * runs share a line. The outer LTR isolate owns the punctuation while the
 * inner bdi preserves the content's natural reading direction.
 */
export default function BidiText({ text, direction }: BidiTextProps) {
  const parts = text.split(PARENTHETICAL);
  const content: ReactNode[] = [];

  parts.forEach((part, index) => {
    if (!part) return;

    const isParenthetical = part.startsWith("(") && part.endsWith(")");
    if (!isParenthetical) {
      content.push(<bdi key={index} dir={direction}>{part}</bdi>);
      return;
    }

    const inner = part.slice(1, -1);
    content.push(
      <span
        key={index}
        dir="ltr"
        className="inline-block [unicode-bidi:isolate]"
        data-bidi-parenthetical
      >
        (<bdi dir={textDirection(inner, direction)}>{inner}</bdi>)
      </span>,
    );
  });

  return <>{content}</>;
}
