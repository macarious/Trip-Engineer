import express from "express";
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// PING endpoint
app.get("/ping", (req, res) => {
  res.send("pong");
})

/**
 * CREATE -- post a schedule
 */

/**
 * RETRIEVE -- retrieve a schedule
 */

/**
 * UPDATE -- update a schedule
 */

/**
 * DELETE -- delete a scehdule
 */

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000 🎉 🚀");
});
