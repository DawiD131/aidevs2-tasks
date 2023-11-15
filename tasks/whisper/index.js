import { execTask } from "../../execTask.js";
import { OpenAIWhisperAudio } from "langchain/document_loaders/fs/openai_whisper_audio";

// your question: {
//   "code": 0,
//       "msg": "please return transcription of this file: https://zadania.aidevs.pl/data/mateusz.mp3",
//       "hint": "use WHISPER model - https://platform.openai.com/docs/guides/speech-to-text"
// }

execTask("whisper").then(async ({ question, sendAnswer }) => {
  const loader = new OpenAIWhisperAudio("./mateusz.mp3");

  const docs = await loader.load();

  sendAnswer(docs[0].pageContent);
});
