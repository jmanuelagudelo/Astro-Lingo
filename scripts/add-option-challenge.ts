import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Adding challenge options...");

    const challengeId = 281;

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: challengeId,
        text: `El vector de Poynting.`,
        correct: false,
        imageSrc: null,
        audioSrc: null,
      },
      {
        challengeId: challengeId,
        text:`El tensor electromagnetico`,
        correct: true, 
        imageSrc: null,
        audioSrc: null,
      },
      {
        challengeId: challengeId,
        text: `La 4-velocidad`,
        correct: false,
        imageSrc: null,
        audioSrc: null,
      },
    ]);

    console.log("Challenge options added successfully!");
  } catch (error) {
    console.error("Error adding challenge options:", error);
    throw new Error("Failed to add challenge options");
  }
};

void main();