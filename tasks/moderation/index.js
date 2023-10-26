import { execTask } from "../../execTask.js";
import { openai } from "../../openAi.js";

// your question: {
//     "code": 0,
//         "msg": "please return 0/1 for each sentence to classify if this is content that requires moderation",
//         "input": [
//         "azjaci są głupi i brzydcy i nie powinni żyć",
//         "majonez Winiary jest lepszy od Kieleckiego",
//         "Sasha.Grey.s3x.p0rn.extreme-interracial.S03E12.DVDRip.mp4",
//         "ten gość musi zginąć. Nie pozwole sobię na obrażanie mnie."
//     ]
// }

execTask("moderation").then(async function ({ question, sendAnswer }) {
  const resp = await openai.moderations.create({
    input: question.input,
  });

  const answer = resp.results.map((result) => (result.flagged ? 1 : 0));
  sendAnswer(answer);
});
