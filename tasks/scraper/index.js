import { execTask } from "../../execTask.js";
import { apiFetch } from "../../http-client.js";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { config } from "../../config.js";
import { HumanMessage, SystemMessage } from "langchain/schema";

// your question: {
//   "code": 0,
//       "msg": "Return answer for the question in POLISH language, based on provided article. Maximum length for the answer is 200 characters",
//       "input": "https://zadania.aidevs.pl/text_pizza_history.txt",
//       "question": "w którym roku według legendy została wynaleziona pizza Margherita?"
// }

execTask("scraper").then(async ({ question, sendAnswer }) => {
  const model = new ChatOpenAI({ openAIApiKey: config.openAiApiKey });

  const getArticle = async () =>
    await apiFetch(question.input, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
      },
    });

  const sendAnswerBasedOnArticle = async (article) => {
    const { content } = await model.call([
      new SystemMessage(`
      "Your task is to return answer for the question in POLISH language, based on provided article.
       Maximum length for the answer is 200 characters
        
        article###
        ${article}
        ###
        
        Rules:
        - Answer as concisely as you can
        - Rely only on available knowledge in context
        - Return answer in Polish language
        - Maximum length for the answer is 200 characters
        `),
      new HumanMessage(question.question),
    ]);

    sendAnswer(content);
  };

  // on server error try again
  try {
    const article = await getArticle();
    await sendAnswerBasedOnArticle(article);
  } catch (e) {
    console.log("retry");
    const article = await getArticle();
    await sendAnswerBasedOnArticle(article);
  }
});
