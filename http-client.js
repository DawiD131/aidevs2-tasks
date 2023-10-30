import { ofetch } from "ofetch";

export const apiFetch = ofetch.create({
  baseURL: "https://zadania.aidevs.pl/",
  onResponseError(context) {
    console.log(context.response._data.msg);
  },
});
