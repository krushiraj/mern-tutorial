import jwt from "jsonwebtoken";

import db from "../models/index.js";
import config from "../config/index.js";

const User = db.User;

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Username
    const user = await User.findoneCount({
      username: req.body.username,
    });
    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
    return;
  }
};

export const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};
