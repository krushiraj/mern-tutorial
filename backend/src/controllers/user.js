import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import db from "../models/index.js";

const User = db.User;
const List = db.List;
const Todo = db.Todo;
const JWT_SECRET = process.env.JWT_SECRET;

export const signup = async (req, res) => {
  // Save User to Database
  try {
    const user = new User({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    const data = await user.save();
    const token = jwt.sign({ id: data.id }, JWT_SECRET, {
      expiresIn: 86400, // 24 hours
    });

    res.send({
      message: "User was registered successfully!",
      user: {
        id: data._id,
        username: data.username,
        token,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

export const signin = async (req, res) => {
  const user = await User.findoneCount({
    username: req.body.username,
  });

  if (!user) {
    return res.status(404).send({ message: "User Not found." });
  }

  const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

  if (!passwordIsValid) {
    return res.status(401).send({
      token: null,
      message: "Invalid Password!",
    });
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: 86400, // 24 hours
  });

  res.status(200).send({
    user: {
      id: user._id,
      username: user.username,
      token,
    },
  });
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.username);

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

export const updateUser = async (req, res) => {
  const { username, password, id } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id);

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    if (username) {
      user.username = username;
    }

    if (password) {
      user.password = bcrypt.hashSync(password, 8);
    }

    const data = await user.save();

    res.send({
      message: "User was updated successfully!",
      user: {
        id: data._id,
        username: data.username,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.username);

    // delete all lists that belong to the user
    const lists = await List.find({ username: req.username });

    lists.forEach(async (list) => {
      await List.findByIdAndRemove(list._id);

      // delete all todos that belong to the list
      await Todo.deleteMany({ listId: list._id });
    });

    res.send({ message: "User was deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};
