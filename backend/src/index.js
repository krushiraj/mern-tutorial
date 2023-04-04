// express app backend module for TODO++
// react app is in ../frontend

import express from "express";
import cors from "cors";
import config from "./config/index.js";

import db from "./models/index.js";

import userRoutes from "./routes/user.js";
import listRoutes from "./routes/list.js";
import todoRoutes from "./routes/todo.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

// enable CORS
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/list", listRoutes);
app.use("/todo", todoRoutes);

app.get("/", (req, res) => {
  res.send("Hello to TODO++ API");
});

db.mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
