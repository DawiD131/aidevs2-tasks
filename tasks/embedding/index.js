import { execTask } from "../../execTask.js";
import { config } from "../../config.js";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

// your question: {
//   "code": 0,
//       "msg": "send embedding of this sentence created via text-embedding-ada-002. Send me just array of params: Hawaiian pizza",
//       "hint1": "this is required structure: [0.003750941, 0.0038711438, 0.0082909055, -0.008753223, -0.02073651, -0.018862579, -0.010596331, -0.022425512, ..., -0.026950065]",
//       "hint2": "it must be a valid JSON array of numbers",
//       "hint3": "just return as JSON array content of .data[0].embedding"
// }

execTask("embedding").then(async ({ question, sendAnswer }) => {
  const chat = new OpenAIEmbeddings({
    openAIApiKey: config.openAiApiKey,
    batchSize: 512,
  });

  const embedding = await chat.embedQuery("Hawaiian pizza");
  sendAnswer(embedding);
});
