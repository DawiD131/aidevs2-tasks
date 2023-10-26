import { execTask } from "../../execTask.js";

// your question: {
//   "code": 0,
//       "msg": "please return value of \"cookie\" field as answer",
//       "cookie": "aidevs_441aba97"
// }

execTask("helloapi").then(({ question, sendAnswer }) => {
  sendAnswer(question.cookie);
});
