import { apiFetch } from "../../http-client.js";
import { HumanMessage, SystemMessage } from "langchain/schema";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { config } from "../../config.js";

const processTask = async () => {
  let task_token = "";
  const getAnswer = async (question) => {
    const resp = await apiFetch(`token/liar`, {
      method: "POST",
      body: { apikey: config.aidevsApiKey },
    });
    const body = new URLSearchParams();
    body.append("question", question);

    task_token = resp.token;
    return await apiFetch(`task/${resp.token}`, {
      method: "POST",
      body,
    });
  };

  const chat = new ChatOpenAI({ openAIApiKey: config.openAiApiKey });
  const QUESTION = "What is capital of Poland?";
  const { answer } = await getAnswer(QUESTION);

  const guardSystemPrompt =
    "Your task is to check if given answer is correct. Return YES if answer is correct, or NO if incorrect";

  const { content } = await chat.call([
    new SystemMessage(guardSystemPrompt),
    new HumanMessage(
      `The question is: ${QUESTION}, check if this answer: ${answer} is correct`,
    ),
  ]);

  try {
    await apiFetch(`answer/${task_token}`, {
      method: "POST",
      body: { answer: content },
    });

    console.log("success!");
  } catch {
    console.log("fail!");
  }
};

await processTask();
