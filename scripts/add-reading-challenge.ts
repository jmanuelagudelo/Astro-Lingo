import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Adding reading challenge...");

    const lessonId = 45;

    await db.insert(schema.challenges).values({
      lessonId: lessonId,
      type: "READ",
      question: "La unidad definitiv",
      order: 5,
      imageSrc: null,
      textContent: `
      Hacia la Relatividad General Con la unificación del electromagnetismo y la dinámica, la Relatividad Especial cerró las brechas de la física del siglo XIX. Sin embargo, este formalismo solo funciona en marcos inerciales sin gravedad. Para entender el peso y la caída de los cuerpos, Einstein necesitaría generalizar estas ideas en la Relatividad General.

`,
    });

    console.log("Reading challenge added successfully!");
  } catch (error) {
    console.error("Error adding challenge:", error);
    throw new Error("Failed to add challenge");
  }
};

void main();