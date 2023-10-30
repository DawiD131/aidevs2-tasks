import { execTask } from "../../execTask.js";
import { openai } from "../../openAi.js";

// your question: {
//         "msg": "please write blog post for the provided outline",
//         "blog": [
//         "Wstęp: kilka słów na temat historii pizzy",
//         "Niezbędne składniki na pizzę",
//         "Robienie pizzy",
//         "Pieczenie pizzy w piekarniku"
//     ]
// }

execTask("blogger").then(async ({ question, sendAnswer }) => {
  const conversation = [
    {
      role: "system",
      content:
        "As a blogger your task is to write more about some topics. For given array of topics, your one and only task is to write about each one, you have to develop each outline for minimum 50 words and maximum 70. You have to return answer in json as array of developed topics." +
        "It is forbidden to assign an array to any field in the returned response, so you return only json with array, but json can't have any named fields only value as array",
    },
    {
      role: "user",
      content: `please write about each outline ${JSON.stringify(
        question.blog,
        null,
      )}`,
    },
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: conversation,
  });

  sendAnswer(JSON.parse(response.choices[0].message.content));
});
