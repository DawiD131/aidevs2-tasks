import { execTask } from "../../execTask.js";
import { apiFetch } from "../../http-client.js";

// your question: {
//     "code": 0,
//         "msg": "Create meme using RednerForm API and send me the URL to JPG via /answer/ endpoint",
//         "service": "https://renderform.io/",
//         "image": "https://zadania.aidevs.pl/data/monkey.png",
//         "text": "Gdy koledzy z pracy mówią, że ta cała automatyzacja to tylko chwilowa moda, a Ty właśnie zastąpiłeś ich jednym, prostym skryptem",
//         "hint": "https://zadania.aidevs.pl/hint/meme"
// }

execTask("meme").then(async ({ question, sendAnswer }) => {
  const getMeme = async () => {
    return await apiFetch("https://get.renderform.io/api/v2/render", {
      method: "POST",
      headers: {
        "X-API-KEY": "key-WDAXtllMhN9yIZbqUrSQwWTeT5lQKu8i76",
      },
      body: {
        template: "hungry-trouts-rumble-fiercely-1480",
        data: {
          "description.text": question.text,
          "image.src": question.image,
        },
      },
    });
  };

  const memeUrl = await getMeme();

  sendAnswer(memeUrl.href);
});
