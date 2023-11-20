import { ChatOpenAI } from "langchain/chat_models/openai";
import { config } from "../../../config.js";
import { HumanMessage, SystemMessage } from "langchain/schema";

export const handleAnyQuestion = async (question) => {
  const model = new ChatOpenAI({ openAIApiKey: config.openAiApiKey });

  const { content } = await model.call([
    new SystemMessage(`
    Answer to any question as briefly as possible 
      `),
    new HumanMessage(question),
  ]);

  return content;
};
