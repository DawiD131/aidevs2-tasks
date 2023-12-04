import { execTask } from "../../execTask.js";

// your question: {
//     "code": 0,
//         "msg": "Provide me the URL to your API (HTTPS) via /answer/ endpoint. I will ask your API a question that requires search engine integration. Your job is to provide me answer to my question",
//         "hint1": "Please use SerpAPI or similar service. https://serpapi.com (free account is enough)",
//         "hint2": "Probably I will ask more than one question, so be prepared for that",
//         "hint3": "Please return the answer in JSON format, with \"reply\" field!",
//         "hint4": "Return as concise an answer as possible"
// }

execTask("google").then(({ sendAnswer }) => {
  sendAnswer("https://afc2-139-28-41-62.ngrok-free.app/answer");
});

// server app
// const express = require('express')
// const app = express()
// const port = 3001
// const axios = require('axios')
//
// app.use(express.json());
//
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
//
// app.post('/answer', async (req, res) => {
//   const resp = await axios.get(`https://serpapi.com/search.json?engine=google&q=${req.body.question}&api_key={{your_api_key}}`)
//   res.send({
//     reply: resp.data.organic_results[0].link
//   })
// })
//
// app.listen(port, () => {
//   console.log(`app listening on port ${port}`)
// })
