import { execTask } from "../../execTask.js";

// your question: {
//   "code": 0,
//       "msg": "send me definition of function named addUser that require 3 params: name (string), surname (string) and year of born in field named \"year\" (integer). Set type of function to \"object\"",
//       "hint1": "I will use this function like this: addUser({'John','Smith',1974})",
//       "hint2": "send this definition as correct JSON structure inside 'answer' field (as usual)"
// }
execTask("functions").then(async ({ question, sendAnswer }) => {
  const functionStructure = {
    name: "addUser",
    description: "create new user based on passed params",
    parameters: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "user's name",
        },
        surname: {
          type: "string",
          description: "user's surname",
        },
        year: {
          type: "integer",
          description: "user's age",
        },
      },
    },
  };

  sendAnswer(functionStructure);
});
