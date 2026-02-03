import Image from "next/image";

import { LatexText } from "./latex-text";

type ReadingChallengeProps = {
  title: string;
  text_content: string;
  imageSrc?: string | null;
};

export const ReadingChallenge = ({
  text_content,
  imageSrc,
}: ReadingChallengeProps) => {
  const imageUrl = imageSrc ? `/${imageSrc}` : null;

  return (
    <div className="flex flex-col gap-y-6">

      {/* Párrafo de lectura con soporte LaTeX */}
      <div className="rounded-xl border-2 bg-white p-6 lg:p-8">
        <LatexText 
          content={text_content}
          className="text-base leading-relaxed text-neutral-700 lg:text-lg"
        />
      </div>

      {/* Imagen centrada en la parte inferior */}
      {imageUrl && (
        <div className="flex justify-center">
          <div className="relative h-[200px] w-full max-w-[400px] lg:h-[300px] lg:max-w-[500px]">
            <Image
              src={imageUrl}
              fill
              alt="Reading illustration"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};