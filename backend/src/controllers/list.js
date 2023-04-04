import db from "../models/index.js";

const List = db.List;
const Todo = db.Todo;

export const create = async (req, res) => {
  // Save List to Database
  try {
    const list = new List({
      name: req.body.name,
      userId: req.userId,
      created: req.body.created,
      totalCount: 0,
      doneCount: 0,
    });

    const data = await list.save();

    res.send({ message: "List was created successfully!", list: data });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

export const findAll = async (req, res) => {
  try {
    const data = await List.find({ userId: req.userId });
    res.send({ lists: data || [] });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

export const findOne = async (req, res) => {
  try {
    const data = await List.findById(req.params.id);
    res.send({ list: data });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

export const update = async (req, res) => {
  try {
    const data = await List.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
      },
      { new: true }
    );

    res.send({ message: "List was updated successfully.", list: data });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

export const remove = async (req, res) => {
  try {
    await List.findByIdAndRemove(req.params.id);

    // Delete all todos that belong to the list
    await Todo.deleteMany({ listId: req.params.id });

    res.send({ message: "List was deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};
