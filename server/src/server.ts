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

// Connect to database
const client = new MongoClient(MONGO_URI);
client.connect();

app.use(cors());
app.use(express.json());

// Index route
app.get("/", (req, res) => {
  res.send("uwu");
});

// Define the endpoint for creating a new document
app.post("/api/documents", async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).send({ message: "Content is required" });
  }

  const db = client.db();

  // Random ID
  let ID = Math.random().toString(36).substring(2, 10);

  await db
    .collection("documents")
    .insertOne({ documentID: ID, content, createdAt: Date.now() });

  res.send({ id: ID });
});

// Define the endpoint for getting a document by ID
app.get("/api/documents/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const db = client.db();
    const document = await db
      .collection("documents")
      .findOne({ documentID: id });

    if (!document) {
      return res.status(404).send({ message: "Document not found" });
    }

    res.send({ content: document.content, createdAt: document.createdAt });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server error" });
  }
});

// 404 route
app.use((req, res, next) => {
  res.status(404);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
