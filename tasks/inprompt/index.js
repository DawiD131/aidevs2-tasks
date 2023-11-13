import { execTask } from "../../execTask.js";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { config } from "../../config.js";
import { HumanMessage, SystemMessage } from "langchain/schema";

execTask("inprompt").then(async ({ question, sendAnswer }) => {
  const chat = new ChatOpenAI({ openAIApiKey: config.openAiApiKey });

  const { content: personName } = await chat.call([
    new SystemMessage(
      "Your task is only to extract and return human name from given text. Return only found name.",
    ),
    new HumanMessage("return human name from this text: " + question.question),
  ]);

  const informationAboutPerson = question.input.filter((text) =>
    text.includes(personName),
  );

  const { content: answer } = await chat.call([
    new SystemMessage(`
    Your task is to answer to given question about person. 
 
    context###
    ${informationAboutPerson}
    ###
      `),
    new HumanMessage(question.question),
  ]);

  sendAnswer(answer);
});
