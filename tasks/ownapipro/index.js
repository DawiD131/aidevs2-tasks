import { execTask } from "../../execTask.js";

execTask("ownapipro").then(({ sendAnswer }) => {
  sendAnswer("https://fe47-139-28-41-62.ngrok-free.app/answer");
});
