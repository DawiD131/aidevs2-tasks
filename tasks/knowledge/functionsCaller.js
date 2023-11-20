import { handleAnyQuestion } from "./functions/handleAnyQuestion.js";
import { handleQuestionAboutCurrency } from "./functions/handleQuestionAboutCurrency.js";
import { handleQuestionAboutCountries } from "./functions/handleQuestionAboutCountries.js";

export const functionsCaller = async (name, param) => {
  const availableFunctions = {
    handleAnyQuestion,
    handleQuestionAboutCurrency,
    handleQuestionAboutCountries,
  };

  return await availableFunctions[name](param);
};
