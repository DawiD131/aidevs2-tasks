import { TaskClient } from "./TaskClient.js";
import colors from "colors";
export const execTask = (taskName) => {
  const taskClient = TaskClient();

  return new Promise(async (resolve, reject) => {
    try {
      const question = await taskClient.getQuestion(taskName);
      console.log(`your question: ${JSON.stringify(question, null, 2)}`.blue);
      resolve({
        question,
        sendAnswer: async (answer) => {
          try {
            console.log(`your answer: ${answer}`.green);
            await taskClient.sendAnswer(answer);
            console.log("success!".green);
          } catch (e) {
            console.log("answer is incorrect!".red);
          }
        },
      });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};
