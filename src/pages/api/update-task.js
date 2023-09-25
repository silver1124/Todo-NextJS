import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const taskId = req.query.taskId;
    const { completed } = req.body;

    try {
      // Connect to the MongoDB database
      const client = await MongoClient.connect(
        "mongodb+srv://Todoapp:4sGOzZymIvyU5qYn@cluster0.pvyqnnf.mongodb.net/todo?retryWrites=true&w=majority&appName=AtlasApp"
      );
      const db = client.db();

      // Update the task's status in the database
      const result = await db
        .collection("todo")
        .updateOne(
          { _id: ObjectId(taskId) },
          { $set: { completed: completed } }
        );

      // Close the MongoDB connection
      client.close();

      if (result.modifiedCount === 1) {
        res.status(200).json({ message: "Task updated successfully" });
      } else {
        res.status(404).json({ message: "Task not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating task" });
    }
  }
}