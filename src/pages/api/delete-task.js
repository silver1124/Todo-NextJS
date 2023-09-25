import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { taskId } = req.query;

    try {
      const client = await MongoClient.connect(
        "mongodb+srv://Todoapp:4sGOzZymIvyU5qYn@cluster0.pvyqnnf.mongodb.net/todo?retryWrites=true&w=majority&appName=AtlasApp"
      );

      const db = client.db("todo");
      const collection = db.collection("todo");

      await collection.deleteOne({ _id: taskId });

      client.close();

      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting task" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}