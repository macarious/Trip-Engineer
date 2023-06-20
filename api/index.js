import express from "express";
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";
import requireAuth from "./auth.js";
import planRouter from "./plan.js";
import generatorRouter from "./generator.js";

const app = express();
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

// PING endpoint
app.get("/ping", (req, res) => {
    res.send("pong");
    });

// Trip Plans related endpoints
app.use("/plan", requireAuth, planRouter);

// Schedule Generation related endpoints
app.use("/generator", requireAuth, generatorRouter);

// User Related endpoints:
// get Profile information of authenticated user
app.get("/me", requireAuth, async (req, res) => {
    const auth0Id = req.auth.payload.sub;
    const user = await prisma.user.findUnique({
        where: {
            auth0Id,
        },
    });
    res.json(user);
});

// Verify user status; if not registered in database, create it
app.post("/verify-user", requireAuth, async (req, res) => {
    console.log(`${process.env.AUTH0_AUDIENCE}`);
    const auth0Id = req.auth.payload.sub;
    const email = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/email`];
    const name = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/name`];
  
    const user = await prisma.user.findUnique({
        where: {
            auth0Id,
        },
    });
  
    if (user) {
        res.json(user);

    } else {
        const newUser = await prisma.user.create({
        data: {
            auth0Id,
            email,
            name,
        },
    });
  
      res.json(newUser);
    }
    });

app.listen(8000, () => {
    console.log("Server running on http://localhost:8000 🎉 🚀");
});

