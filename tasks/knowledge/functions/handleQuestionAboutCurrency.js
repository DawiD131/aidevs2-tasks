import { ChatOpenAI } from "langchain/chat_models/openai";
import { config } from "../../../config.js";
import { HumanMessage, SystemMessage } from "langchain/schema";
import { apiFetch } from "../../../http-client.js";

export const handleQuestionAboutCurrency = async (question) => {
  const model = new ChatOpenAI({
    openAIApiKey: config.openAiApiKey,
    modelName: "gpt-4",
  });

  const getCurrencies = async () => {
    const resp = await apiFetch(
      "http://api.nbp.pl/api/exchangerates/tables/A?format=json",
    );

    return resp[0].rates;
  };

  const currenciesInfo = await getCurrencies();

  const { content } = await model.call([
    new SystemMessage(`
    Based on available information about currencies answer to question as briefly as possible

    context###
    ${currenciesInfo
      .map(
        (it) =>
          `currency -> ${it.currency}, code -> ${it.code}, rate: ${it.mid}`,
      )
      .join("\r\n")}
    ###
      `),
    new HumanMessage(question),
  ]);

  return content;
};
