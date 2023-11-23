import { execTask } from "../../execTask.js";

// your question: {
//     "code": 0,
//         "msg": "Provide me the URL to your API (HTTPS) via /answer/ endpoint. I will ask your API a general knowledge question",
//         "hint1": "I will sent data as JSON, and my question would be inside \"question\" field",
//         "hint2": "Probably I will ask more than one question, so be prepared for that",
//         "hint3": "Please return the answer in JSON format, with \"reply\" field!"
// }

execTask("ownapi").then(({ question, sendAnswer }) => {
  sendAnswer("https://fe47-139-28-41-62.ngrok-free.app/answer");
});
