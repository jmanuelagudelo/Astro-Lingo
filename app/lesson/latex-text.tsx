"use client";

import { useEffect, useRef } from "react";

import katex from "katex";

type LatexTextProps = {
  content: string;
  className?: string;
};

export const LatexText = ({ content, className }: LatexTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderLatex = (text: string) => {
      let result = text;

      // Procesar display math ($$...$$)
      result = result.replace(/\$\$(.*?)\$\$/g, (_match: string, formula: string) => {
        try {
          return katex.renderToString(formula, {
            displayMode: true,
            throwOnError: false,
          });
        } catch (e) {
          return _match;
        }
      });

      // Procesar inline math ($...$)
      result = result.replace(/\$(.*?)\$/g, (_match: string, formula: string) => {
        try {
          return katex.renderToString(formula, {
            displayMode: false,
            throwOnError: false,
          });
        } catch (e) {
          return _match;
        }
      });

      return result;
    };

    containerRef.current.innerHTML = renderLatex(content);
  }, [content]);

  return <div ref={containerRef} className={className} />;
};