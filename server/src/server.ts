import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("Please set the MONGO_URI environment variable ");
  process.exit(1);
}

const client = new MongoClient(MONGO_URI);
client.connect();

app.use(cors());
app.use(express.json());

// Define the endpoint for creating a new document
app.post("/api/documents", async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).send({ message: "Content is required" });
  }

  const db = client.db();
  const result = await db.collection("documents").insertOne({ content });

  res.send({ id: result.insertedId });
});

// Define the endpoint for getting a document by ID
app.get("/api/documents/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const db = client.db();
    const document = await db
      .collection("documents")
      .findOne({ _id: new ObjectId(id) });

    if (!document) {
      return res.status(404).send({ message: "Document not found" });
    }

    res.send({ content: document.content });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
