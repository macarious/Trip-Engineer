import express from "express";
import pkg from "@prisma/client";
import * as dotenv from 'dotenv'

dotenv.config()
const travelPlanRouter = express.Router();
const { PrismaClient } = pkg;
const prisma = new PrismaClient();


/**
 * CREATE -- create a plan with only metadata
 */
travelPlanRouter.post("/", async (req, res) => {
    // Verify user status
    const auth0Id = req.auth.payload.sub;
    if (!auth0Id) {
        res.status(401).send("Unauthorized");
        return;
    };

    // Verify required fields
    const { location, durationDays, arrivalTime, departureTime, hasCar, userId } = req.body;
    if (!location || !durationDays || !arrivalTime || !departureTime || !hasCar || !userId) {
        res.status(400).send("Missing required fields");
        return;
    };

    // Create the plan
    const plan = await prisma.travelPlan.create({
        data: {
            location,
            durationDays,
            arrivalTime,
            departureTime,
            hasCar,
            user: { connect: { id: auth0Id } },
        },
    });

    // Return the plan
    res.status(201).json(plan);
});


/**
 * RETRIEVE -- retrieve a plan by id
 */
travelPlanRouter.get("/:id", async (req, res) => {
    // Verify user status
    const auth0Id = req.auth.payload.sub;
    if (!auth0Id) {
        res.status(401).send("Unauthorized");
        return;
    };

    // Retrieve the plan
    const plan = await prisma.travelPlan.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    // Return the plan
    res.json(plan);
});


/**
 * RETRIEVE -- retrieve all plans
 */
travelPlanRouter.get("/", async (req, res) => {
    // Verify user status
    const auth0Id = req.auth.payload.sub;
    if (!auth0Id) {
        res.status(401).send("Unauthorized");
        return;
    };

    // Retrieve the user
    const user = await prisma.user.findUnique({
        where: {
            auth0Id,
        },
    });
    if (!user) {
        res.status(404).send("User not found");
        return;
    }

    // Retrieve the plans
    const plans = await prisma.travelPlan.findMany({
        where: {
            userId: user.id,
        },
    });

    // Return the plans
    res.json(plans);
});


/**
 * UPDATE -- updates a plan with generated itineraries
 */
travelPlanRouter.put("/:id", async (req, res) => {
    // Verify user status
    const auth0Id = req.auth.payload.sub;
    if (!auth0Id) {
        res.status(401).send("Unauthorized");
        return;
    };

    // Verify required fields
    const { id } = req.params;
    const { travelPlan } = req.body;
    const plan = await prisma.travelPlan.update({
        where: {
            id: parseInt(id),
        },
        data: {
            plan: travelPlan
        },
    });
    res.json(plan);
});


/**
 * DELETE -- delete a plan by id
 */
travelPlanRouter.delete("/:id", async (req, res) => {
    const auth0Id = req.auth.payload.sub;
    if (!auth0Id) {
        res.status(401).send("Unauthorized");
        return;
    };

    const { id } = req.params;
    const plan = await prisma.travelPlan.delete({
        where: {
            id: parseInt(id),
        },
    });
    res.json(plan);
});

export default travelPlanRouter;