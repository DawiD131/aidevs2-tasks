import { execTask } from "../../execTask.js";
import { apiFetch } from "../../http-client.js";
import { openai } from "../../openAi.js";

// your question: {
//     "code": 0,
//         "msg": "In a moment you will receive from me a database on three people. It is over 30kb in size. You need to prepare me for an exam in which I will be questioned on this database. Unfortunately, the capacity of my memory is just 9kb. Send me the optimised database",
//         "database": "https://zadania.aidevs.pl/data/3friends.json",
//         "hint": "I will use GPT-3.5-turbo to answer all test questions"
// }
//

execTask("optimaldb").then(async ({ question, sendAnswer }) => {
  const db = await apiFetch("https://zadania.aidevs.pl/data/3friends.json");

  const summarize = async (content) => {
    const resp = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: [
            {
              type: "text",
              text: `Your task is to shorten given text but you have to keep all information from text`,
            },
          ],
        },
        {
          role: "user",
          content: [{ type: "text", text: content }],
        },
      ],
    });

    return resp.choices[0].message.content;
  };

  const optimalContents = [];
  await Promise.all(
    Object.entries(db).map(async ([_, v]) => {
      optimalContents.push(await summarize(v.join(" ")));
    }),
  );

  sendAnswer(optimalContents.join(" "));
});
