const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const app = express();

const taskRouter = require("./routes/taskRouter");
const authRouter = require("./routes/authRouter");

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/task", taskRouter);
app.use("/api/auth", authRouter);


mongoose
    .connect("mongodb+srv://tm217:Tushar16@cluster0.aqzeo9l.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
      console.log("Successfully connected to db");
    })
    .catch((err) => {
      console.log("Failed");
      process.exit(1);
    });



app.listen(8000, () => {
  console.log("server listening on port 8000");
});
