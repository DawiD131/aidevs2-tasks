import { execTask } from "../../execTask.js";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { config } from "../../config.js";
import { HumanMessage, SystemMessage } from "langchain/schema";

const getSystemPrompt = (facts) => `
 Your task is to guess who the person is based on the facts.
 When you don't know correct answer, return only NO.
 
 facts###
  ${facts}
 ###
 
 important rules###
 - When you don't know correct answer or you are not sure about it return just NO.
 - When you are sure about answer return name of guessed person.  
 ###
`;

const factsAboutPerson = [];
const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
};

const doTask = async () => {
  await execTask("whoami").then(async ({ question, sendAnswer }) => {
    factsAboutPerson.push(question.hint);

    const model = new ChatOpenAI({
      openAIApiKey: config.openAiApiKey,
      modelName: "gpt-4",
    });

    const { content } = await model.call([
      new SystemMessage(
        getSystemPrompt(factsAboutPerson.map((it) => `- ${it}`).join("\r\n")),
      ),
      new HumanMessage("Give me name of guessed person"),
    ]);

    if (content !== "NO") {
      await sendAnswer(content);
    } else {
      console.log(content);
      await sleep(2000);
      await doTask();
    }
  });
};

await doTask();
