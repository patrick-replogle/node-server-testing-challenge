const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use((err, req, res, next) => {
  console.log("Error:", err);
  res.status(500).json({
    message: "Something went wrong. Try again later"
  });
});

server.get("/", (req, res) => {
  res.status(200).json({ message: "It's alive" });
});

module.exports = server;
