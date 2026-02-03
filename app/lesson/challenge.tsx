import Image from "next/image";

import { challengeOptions, challenges } from "@/db/schema";
import { cn } from "@/lib/utils";

import { Card } from "./card";
import { LatexText } from "./latex-text";
import { ReadingChallenge } from "./reading-challenge";

type ChallengeProps = {
  options: (typeof challengeOptions.$inferSelect)[];
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  selectedOption?: number;
  disabled?: boolean;
  type: (typeof challenges.$inferSelect)["type"];
  question: string;
  textContent?: string | null;
  challengeImageSrc?: string | null;
};

export const Challenge = ({
  options,
  onSelect,
  status,
  selectedOption,
  disabled,
  type,
  question,
  textContent,
  challengeImageSrc,
}: ChallengeProps) => {
  if (type === "READ") {
    return (
      <ReadingChallenge 
        title={question}
        text_content={textContent || ""}
        imageSrc={challengeImageSrc} 
      />
    );
  }

  const imageUrl = challengeImageSrc ? `/${challengeImageSrc}` : null;
  
  return (
    <div className="flex flex-col gap-y-6">
      {/* Texto adicional del challenge con soporte LaTeX */}
      {textContent && (
        <div className="rounded-xl border-2 bg-white p-4 lg:p-6">
          <LatexText 
            content={textContent}
            className="text-sm leading-relaxed text-neutral-600 lg:text-base"
          />
        </div>
      )}

      {/* Imagen del challenge (si existe) */}
      {imageUrl && (
        <div className="flex justify-center">
          <div className="relative h-[200px] w-full max-w-[400px] lg:h-[300px] lg:max-w-[500px]">
            <Image
              src={imageUrl}
              fill
              alt={question}
              className="object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Opciones de respuesta */}
      <div
        className={cn(
          "grid gap-2",
          type === "ASSIST" && "grid-cols-1",
          type === "SELECT" &&
            "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
        )}
      >
        {options.map((option, i) => (
          <Card
            key={option.id}
            id={option.id}
            text={option.text}
            imageSrc={option.imageSrc}
            shortcut={`${i + 1}`}
            selected={selectedOption === option.id}
            onClick={() => onSelect(option.id)}
            status={status}
            audioSrc={option.audioSrc}
            disabled={disabled}
            type={type}
          />
        ))}
      </div>
    </div>
  );
};