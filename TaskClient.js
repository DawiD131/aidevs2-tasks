import { apiFetch } from "./http-client.js";
import { config } from "./config.js";

export const TaskClient = () => {
  let taskToken = "";

  const getQuestion = async (taskName) => {
    const resp = await apiFetch(`token/${taskName}`, {
      method: "POST",
      body: { apikey: config.aidevsApiKey },
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
