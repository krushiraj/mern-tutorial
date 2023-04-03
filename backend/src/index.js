// express app backend module for TODO++
// react app is in ../frontend

import express from "express";
import cors from "cors";
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

app.get("/", (req, res) => {
  res.send("Hello to TODO++ API");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
