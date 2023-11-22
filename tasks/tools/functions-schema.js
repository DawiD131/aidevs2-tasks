export const functionsSchema = [
  {
    name: "Calendar",
    description: `Add meeting to the calendar when query contains specific time to do some task. 
      Classify keyword like tomorrow, next week, day after tomorrow etc... to specific date.`,
    parameters: {
      type: "object",
      properties: {
        desc: {
          type: "string",
          description: "description of the meeting",
        },
        date: {
          type: "string",
          description: "date of the meeting in format year-month-day",
        },
      },
      required: ["desc", "date"],
    },
  },
  {
    name: "ToDo",
    description: "Add task to to-do list",
    parameters: {
      type: "object",
      properties: {
        desc: {
          type: "string",
          description: "task description to save in to-do list",
        },
      },
      required: ["task"],
    },
  },
];
