import mongoose from "mongoose";

const listSchema = mongoose.Schema({
  name: String,
  userId: mongoose.Schema.Types.ObjectId,
  created: String,
  totalCount: Number,
  doneCount: Number,
});

const List = mongoose.model("List", listSchema);

export default List;
