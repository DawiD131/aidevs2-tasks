import { execTask } from "../../execTask.js";
import { openai } from "../../openAi.js";

// your question: {
//   "code": 0,
//       "msg": "I will give you a drawing of a gnome with a hat on his head. Tell me what is the color of the hat in POLISH. If any errors occur, return \"ERROR\" as answer",
//       "hint": "it won't always be a drawing of a gnome >:)",
//       "url": "https://zadania.aidevs.pl/gnome/5c749d3e10dde716b06b2649ea21d748.png"
// }

execTask("gnome").then(async ({ question, sendAnswer }) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: `When image isn't a drawing of garden gnome return just 'error' string.
         When image is drawing of a garden gnome return color of hat on his head and translate it to PL language`,
          },
        ],
      },
      {
        role: "user",
        content: [
          { type: "text", text: "What’s in this image?" },
          {
            type: "image_url",
            image_url: {
              url: question.url,
            },
          },
        ],
      },
    ],
  });

  await sendAnswer(response.choices[0].message.content);
});
