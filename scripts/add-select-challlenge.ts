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
      type: "SELECT",
      question: "El Tensor Electromagnético",
      order: 4,
      imageSrc: null,
      textContent: `  

      ¿Qué objeto matemático unifica a E y B en una sola entidad covariante que se ve igual en todos los marcos de referencia?.
      `,
    });

    console.log("Reading challenge added successfully!");
  } catch (error) {
    console.error("Error adding challenge:", error);
    throw new Error("Failed to add challenge");
  }
};

void main();