import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  listId: mongoose.Schema.Types.ObjectId,
  state: String,
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
