import express from "express";
import pkg from "@prisma/client";

const planRouter = express.Router();
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

/**
 * CREATE -- create a plan with only metadata
 */
planRouter.post("/", async (req, res) => {
    const { location, durationDays, arrivalTime, departureTime, hasCar, userId } = req.body;
    const plan = await prisma.travelPlan.create({
        data: {
            location,
            durationDays,
            arrivalTime,
            departureTime,
            hasCar,
            user: { connect: { id: userId } },
        },
    });
    res.json(plan);
});

/**
 * RETRIEVE -- retrieve a plan
 */
planRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const plan = await prisma.travelPlan.findUnique({
        where: {
            id: parseInt(id),
        },
    });
    res.json(plan);
});

/**
 * UPDATE -- updates a plan with generated itineraries
 */
planRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { itineraries } = req.body;
    const plan = await prisma.travelPlan.update({
        where: {
            id: parseInt(id),
        },
        data: {
            itineraries: {
                create: itineraries,
            },
        },
    });
    res.json(plan);
});

/**
 * DELETE -- delete a plan
 */
planRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const plan = await prisma.travelPlan.delete({
        where: {
            id: parseInt(id),
        },
    });
    res.json(plan);
});

export default planRouter;