import { fileURLToPath } from "url";
import path from "path";
import { configDotenv } from "dotenv";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

configDotenv({ path: path.resolve(__dirname, ".env") });

export const config = {
  openAiApiKey: process.env.OPENAI_API_KEY,
  aidevsApiKey: process.env.AIDEVS_API_KEY,
};
