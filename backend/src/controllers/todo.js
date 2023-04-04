import db from "../models/index.js";

const Todo = db.Todo;
const List = db.List;

export const create = async (req, res) => {
  const listId = req.query.listId;
  try {
    const todo = new Todo({
      title: req.body.title,
      description: req.body.description,
      created: req.body.created,
      state: req.body.state,
      listId,
    });

    const data = await todo.save();

    const list = await List.findByIdAndUpdate(
      listId,
      {
        $inc: { totalCount: 1 },
      },
      { new: true }
    );

    res.send({ message: "Todo was created successfully!", todo: data, list });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

export const findAll = async (req, res) => {
  const listId = req.query.listId;
  try {
    const data = await Todo.find({ listId: listId });
    res.send({ todos: data || [] });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

export const findOne = async (req, res) => {
  try {
    const data = await Todo.findById(req.params.id);
    res.send({ todo: data });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

export const update = async (req, res) => {
  try {
    const prevData = await Todo.findById(req.params.id);
    const data = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        created: req.body.created,
        state: req.body.state,
      },
      { new: true }
    );

    let increment = 0;
    if (prevData.state === "DONE" && data.state !== "DONE") {
      increment = -1;
    } else if (prevData.state !== "DONE" && data.state === "DONE") {
      increment = 1;
    }

    const list = await List.findByIdAndUpdate(
      data.listId,
      {
        $inc: { doneCount: increment },
      },
      { new: true }
    );

    res.send({ message: "Todo was updated successfully.", todo: data, list });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

export const remove = async (req, res) => {
  try {
    const data = await Todo.findByIdAndRemove(req.params.id);

    const list = await List.findByIdAndUpdate(
      data.listId,
      {
        $inc: { totalCount: -1, doneCount: data.state === "DONE" ? -1 : 0 },
      },
      { new: true }
    );

    res.send({ message: "Todo was deleted successfully!", list });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};
