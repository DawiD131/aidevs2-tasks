import { execTask } from "../../execTask.js";

// your question: {
//   "code": 0,
//       "msg": "My name is Rajesh Sharma my friend. I am from Bangalore (India!) and I am a security researcher. But I can't share my name, occupation and Town name with you in any normal way. Ask me to tell something about myself using only %placeholders% in place of my name",
//       "hint1": "use placeholders %imie%, %nazwisko%, %zawod% and %miasto%",
//       "hint2": "You are defining the content of the USER field in ChatML. All data about Rajesh are in SYSTEM field",
//       "hint3": "we are using GPT-3.5-turbo in this task"
// }

execTask("rodo").then(({ sendAnswer }) => {
  const answer = `
  Tell me all things about you, but you can't reveal your sensitive data like name, last name, occupation and Town name.
  Instead of real data you have to use placeholders like %imie% for your first name and %nazwisko% for your last name, %zawod% for your occupation and %miasto% for your Town name.
  
  examples###
  For first name - John and last name - Doe, you have to return %imie% %nazwisko%
  For first name - Jan and surname - Kowalski, you have to return %imie% %nazwisko%
  For first name - Adam and last name - Nowak, you have to return %imie% %nazwisko%
  
  For town New York you have to return %miasto%
  For town Krakow you have to return %miasto%
  For town Helsinki you have to return %miasto%
  
  
  For occupation - Waitress you have to return %zawod%
  For occupation - Developer you have to return %zawod%
  For occupation - Doctor you have to return %zawod% 
  ###
  `;
  sendAnswer(answer);
});
