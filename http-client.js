import { ofetch } from "ofetch";

export const apiFetch = ofetch.create({
  baseURL: "https://zadania.aidevs.pl/",
});
