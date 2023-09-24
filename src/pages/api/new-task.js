import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    try {
      const client = await MongoClient.connect(
        "mongodb+srv://Todoapp:4sGOzZymIvyU5qYn@cluster0.pvyqnnf.mongodb.net/todo?retryWrites=true&w=majority&appName=AtlasApp"
      );

      const db = client.db();

      const meetupsCollection = db.collection("todo");

      const result = await meetupsCollection.insertOne(data);

      console.log(result);

      client.close();

      res.status(201).json({ message: "Todo Inserted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error inserting todo." });
    }
  }
}

export default handler;