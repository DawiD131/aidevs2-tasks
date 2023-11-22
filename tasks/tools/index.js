import { execTask } from "../../execTask.js";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { functionsSchema } from "./functions-schema.js";
import { HumanMessage, SystemMessage } from "langchain/schema";

const parseFunctionCall = (result) => {
  if (result?.additional_kwargs?.function_call === undefined) {
    return null;
  }
  return {
    name: result.additional_kwargs.function_call.name,
    args: JSON.parse(result.additional_kwargs.function_call.arguments),
  };
};
execTask("tools").then(async ({ question, sendAnswer }) => {
  const model = new ChatOpenAI({
    modelName: "gpt-4-0613",
  }).bind({
    functions: functionsSchema,
  });
  const result = await model.invoke([
    new SystemMessage(`
      context###
      today is ${new Date()}
      ### 
      `),
    new HumanMessage(question.question),
  ]);

  const action = parseFunctionCall(result);
  if (action) {
    await sendAnswer({ tool: action.name, ...action.args });
  }
});
