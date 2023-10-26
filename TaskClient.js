import { apiFetch } from "./http-client.js";
import { configDotenv } from "dotenv";
import { fileURLToPath } from "url";
import * as path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

configDotenv({ path: path.resolve(__dirname, ".env") });

export const TaskClient = () => {
  let taskToken = "";

  const getQuestion = async (taskName) => {
    const resp = await apiFetch(`token/${taskName}`, {
      method: "POST",
      body: { apikey: process.env.AIDEVS_API_KEY },
    });
    taskToken = resp.token;
    return await apiFetch(`task/${taskToken}`);
  };

  const sendAnswer = async (answer) =>
    await apiFetch(`answer/${taskToken}`, {
      method: "POST",
      body: { answer },
    });

  return {
    getQuestion,
    sendAnswer,
  };
};
