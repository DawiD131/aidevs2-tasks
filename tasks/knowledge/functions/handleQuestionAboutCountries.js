import { ChatOpenAI } from "langchain/chat_models/openai";
import { config } from "../../../config.js";
import { HumanMessage, SystemMessage } from "langchain/schema";
import { apiFetch } from "../../../http-client.js";

export const handleQuestionAboutCountries = async (question) => {
  const model = new ChatOpenAI({
    openAIApiKey: config.openAiApiKey,
    modelName: "gpt-4",
  });

  const getCountries = async () => {
    return await apiFetch(
      "https://restcountries.com/v3.1/independent?status=true&fields=name,population",
    );
  };

  const countriesInformation = await getCountries();

  const { content } = await model.call([
    new SystemMessage(`
    Based on available information about countries answer to question as briefly as possible

    context###
    ${countriesInformation
      .map(
        (it) =>
          `currency -> ${it.name.official}, population -> ${it.population}`,
      )
      .join("\r\n")}
    ###
      `),
    new HumanMessage(question),
  ]);

  console.log(content);
  return content;
};
