import * as dotenv from 'dotenv';
import express from "express";
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";
import travelPlanRouter from './travelPlan.js';
import travelNoteRouter from './travelNote.js'; 
import generatorRouter from './generator.js';
import { auth } from  'express-oauth2-jwt-bearer'

dotenv.config();
const app = express();
const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const PORT = parseInt(process.env.PORT) || 8080;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

// This checks if the user is authenticated
const requireAuth = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER,
    tokenSigningAlg: 'RS256'
    });

// This is the root endpoint

// PING endpoint
app.get("/ping", (req, res) => {
    res.send("pong");
    });


// Travel Plans related endpoints -- create, retrieve, update, delete a travel plan
app.use("/plan", requireAuth, travelPlanRouter);


// Travel Notes related endpoints -- create, retrieve, update, delete a travel note
app.use("/note", requireAuth, travelNoteRouter);


// Schedule Generation related endpoints -- generate a schedule from OpenAI
app.use("/generator", requireAuth, generatorRouter);


// User Related endpoints -- authenticate, get profile information, verify user status:

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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} 🎉 🚀`);
});

