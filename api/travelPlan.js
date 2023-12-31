import * as dotenv from 'dotenv';
import express from "express";
import pkg from "@prisma/client";
import isPlanBelongsToUser from "./util/isPlanBelongsToUser.js";
import userStatusVerified from "./util/userStatusVerified.js";

dotenv.config();
const travelPlanRouter = express.Router();
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// This file contains all the endpoints related to travel plans

/**
 * CREATE -- create a plan with only metadata (no schedule)
 */
travelPlanRouter.post("/", async (req, res) => {
    const auth0Id = req.auth.payload.sub;

    // Verify user status
    if (!userStatusVerified(req, res)) {
        return;
    };

    // Verify required fields
    const { location, durationDays, arrivalTime, departureTime, hasCar } = req.body;
    console.log(req.body);
    if (!location || !durationDays || !arrivalTime || !departureTime || hasCar === undefined) {
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
            user: { connect: { auth0Id: auth0Id } },
        },
    });

    // Return the plan
    res.status(201).json(plan);
});


/**
 * RETRIEVE -- retrieve a plan by id
 */
travelPlanRouter.get("/:id", async (req, res) => {
    const { id } = req.params;

    // Verify user status
    if (!userStatusVerified(req, res)) {
        return;
    };

    // Retrieve the plan
    const plan = await prisma.travelPlan.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    // Verify ownership of plan
    if (!isPlanBelongsToUser(req, res, plan)) {
        return;
    };

    // Return the plan
    res.json(plan);
});


/**
 * RETRIEVE -- retrieve all plans
 */
travelPlanRouter.get("/", async (req, res) => {
    // Verify user status
    if (!userStatusVerified(req, res)) {
        return;
    };

    // Retrieve the user
    const auth0Id = req.auth.payload.sub;
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
    const { id } = req.params;
    const schedule = req.body;
    
    // Verify user status
    if (!userStatusVerified(req, res)) {
        return;
    };

    // Verify required fields
    if (!schedule) {
        res.status(400).send("Missing required fields");
        return;
    };

    // Retrieve the plan
    const plan = await prisma.travelPlan.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    // Verify ownership of plan
    if (!isPlanBelongsToUser(req, res, plan)) {
        return;
    };

    // Update the plan
    const updatedPlan = await prisma.travelPlan.update({
        where: {
            id: parseInt(id),
        },
        data: {
            schedule
        },
    });

    // Return the updated plan
    res.json(updatedPlan);
});


/**
 * DELETE -- delete a plan by id
 */
travelPlanRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    
    // Verify user status
    if (!userStatusVerified(req, res)) {
        return;
    };

    // Retrieve the plan
    const plan = await prisma.travelPlan.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    // Verify ownership of plan
    if (!isPlanBelongsToUser(req, res, plan)) {
        return;
    };

    // Delete all notes attached to the plan
    await prisma.travelNote.deleteMany({
        where: {
            travelPlanId: parseInt(id),
        },
    });

    // Delete the plan
    const deletedPlan = await prisma.travelPlan.delete({
        where: {
            id: parseInt(id),
        },
    });

    // Return the deleted plan
    res.json(deletedPlan);
});

export default travelPlanRouter;