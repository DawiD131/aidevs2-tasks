export const functionsSchema = [
  {
    name: "handleQuestionAboutCurrency",
    description: "Handle any question about currencies",
    parameters: {
      type: "object",
      properties: {
        question: {
          type: "string",
          description: "question about any currency",
        },
      },
      required: ["question"],
    },
  },
  {
    name: "handleQuestionAboutCountries",
    description: "Handle any question about country",
    parameters: {
      type: "object",
      properties: {
        question: {
          type: "string",
          description: "question about any country",
        },
      },
      required: ["question"],
    },
  },
  {
    name: "handleAnyQuestion",
    description: "Handle question any question",
    parameters: {
      type: "object",
      properties: {
        question: {
          type: "string",
          description: "any question",
        },
      },
      required: ["question"],
    },
  },
];
