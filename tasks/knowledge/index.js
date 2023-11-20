import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";
import { execTask } from "../../execTask.js";
import { functionsSchema } from "./functions-schema.js";
import { functionsCaller } from "./functionsCaller.js";

const parseFunctionCall = (result) => {
  if (result?.additional_kwargs?.function_call === undefined) {
    return null;
  }
  return {
    name: result.additional_kwargs.function_call.name,
    args: JSON.parse(result.additional_kwargs.function_call.arguments),
  };
};

execTask("knowledge").then(async ({ question, sendAnswer }) => {
  const model = new ChatOpenAI({
    modelName: "gpt-4-0613",
  }).bind({
    functions: functionsSchema,
  });
  const result = await model.invoke([new HumanMessage(question.question)]);

  const action = parseFunctionCall(result);
  if (action) {
    const answer = await functionsCaller(action.name, action.args.question);
    await sendAnswer(answer);
  }
});
