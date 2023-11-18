import { execTask } from "../../execTask.js";
import { QdrantClient } from "@qdrant/js-client-rest";
import { config } from "dotenv";
import { apiFetch } from "../../http-client.js";
import { v4 as uuidv4 } from "uuid";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

const COLLECTION_NAME = "articles";
const qdrant = new QdrantClient({ url: config.qdrantUrl });
const embeddings = new OpenAIEmbeddings({ maxConcurrency: 5 });
const result = await qdrant.getCollections();
const indexed = result.collections.find(
  (collection) => collection.name === COLLECTION_NAME,
);
// Create collection if not exists
if (!indexed) {
  await qdrant.createCollection(COLLECTION_NAME, {
    vectors: { size: 1536, distance: "Cosine", on_disk: true },
  });
}

execTask("search").then(async ({ question, sendAnswer }) => {
  const articles = await apiFetch("https://unknow.news/archiwum.json");

  const collectionInfo = await qdrant.getCollection(COLLECTION_NAME);

  if (!collectionInfo.points_count) {
    const documents = articles
      .map((doc) => {
        const metadata = {
          id: uuidv4(),
          url: doc.url,
          source: COLLECTION_NAME,
        };

        return { ...doc, metadata };
      })
      .slice(0, 300);

    const points = [];
    for (const document of documents) {
      console.log(document);
      const [embedding] = await embeddings.embedDocuments([document.info]);
      points.push({
        id: document.metadata.id,
        payload: document.metadata,
        vector: embedding,
      });
    }

    await qdrant.upsert(COLLECTION_NAME, {
      wait: true,
      batch: {
        ids: points.map((point) => point.id),
        vectors: points.map((point) => point.vector),
        payloads: points.map((point) => point.payload),
      },
    });
  }

  const queryEmbedding = await embeddings.embedQuery(question.question);

  const search = await qdrant.search(COLLECTION_NAME, {
    vector: queryEmbedding,
    limit: 1,
    filter: {
      must: [
        {
          key: "source",
          match: {
            value: COLLECTION_NAME,
          },
        },
      ],
    },
  });

  sendAnswer(search[0].payload.url);
});
