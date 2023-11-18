import { execTask } from "../../execTask.js";
import { apiFetch } from "../../http-client.js";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { config } from "../../config.js";
import { HumanMessage, SystemMessage } from "langchain/schema";

execTask("people").then(async ({ question, sendAnswer }) => {
  const model = new ChatOpenAI({ openAIApiKey: config.openAiApiKey });

  const { content } = await model.call([
    new SystemMessage(`
      from given text extract name and surname of person using full names, without diminutive and give answer in json format:
      {
        "name": "person name",
        "surname": "person surname"
      } 
      
      ###
      
      user: Tomek Bzik
      AI: {
      "name": "Tomasz",
      "surname": "Bzik"
      }
      
      user: Krysia Ludek
      AI: {
      "name": "Krystyna",
      "surname": "Ludek"
      }
      `),
    new HumanMessage(
      `Extract name and surname from this text: ${question.question}`,
    ),
  ]);

  const personalFacts = await apiFetch(question.data);
  const foundPerson = personalFacts.find(
    (it) =>
      it.imie === JSON.parse(content).name &&
      it.nazwisko === JSON.parse(content).surname,
  );

  const personalCtx = `
  Informacje o ${foundPerson.imie} ${foundPerson.nazwisko}.
  ${foundPerson.o_mnie},
  Moja ulubiona postać z kapitana bomby to ${foundPerson.ulubiona_postac_z_kapitana_bomby}.
  Mój ulubiony serial to: ${foundPerson.ulubiony_serial}.
  Mój ulubiony film to: ${foundPerson.ulubiony_film}.
  Mój ulubiony kolor to: ${foundPerson.ulubiony_kolor}
  `;

  const { content: answer } = await model.call([
    new SystemMessage(`
      Return brief answer to question about person based available facts

      context###
      ${personalCtx}
      ###
      `),
    new HumanMessage(question.question),
  ]);

  sendAnswer(answer);
});
