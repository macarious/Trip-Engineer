import express from "express";
import pkg from "@prisma/client";
import * as dotenv from 'dotenv';
import isPlanBelongsToUser from "./util/isPlanBelongsToUser.js";
import userStatusVerified from "./util/verifyUser.js";

dotenv.config();
const travelPlanRouter = express.Router();
const { PrismaClient } = pkg;
const prisma = new PrismaClient();


/**
 * CREATE -- create a plan with only metadata
 */
travelPlanRouter.post("/", async (req, res) => {
    // Verify user status
    if (!userStatusVerified(req, res)) {
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
    auth0Id = req.auth.payload.sub;
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
    if (!userStatusVerified(req, res)) {
        return;
    };

    const { id } = req.params;
    const { travelPlan } = req.body;

    // Verify required fields
    if (!travelPlan) {
        res.status(400).send("Missing required fields");
        return;
    };

    // Retrieve the plan
    const plan = await prisma.travelPlan.findUnique({
        where: {
            id: parseInt(id),
        },
        data: {
            plan: travelPlan
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
            plan: travelPlan
        },
    });

    // Return the updated plan
    res.json(updatedPlan);
});


/**
 * DELETE -- delete a plan by id
 */
travelPlanRouter.delete("/:id", async (req, res) => {
    // Verify user status
    if (!userStatusVerified(req, res)) {
        return;
    };
    
    const { id } = req.params;

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