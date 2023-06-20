import express from "express";
import pkg from "@prisma/client";
import * as dotenv from 'dotenv'

dotenv.config()
const travelNoteRouter = express.Router();
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// (Later: include checks for the owner of travel plan)

/**
 * CREATE -- create a note
 */
travelNoteRouter.post("/:planId", async (req, res) => {
    const { planId } = req.params;
    const { content } = req.body;

    // Verify user status
    const auth0Id = req.auth.payload.sub;
    if (!auth0Id) {
        res.status(401).send("Unauthorized");
        return;
    };

    // Verify required fields
    if (!content) {
        res.status(400).send("Missing required fields");
        return;
    };

    // Create the note
    const note = await prisma.travelNote.create({
        data: {
            content,
            travelPlan: { connect: { id: planId } }, 
        },
    });

    // Return the note
    res.status(201).json(note);
});


/**
 * RETRIEVE -- retrieve a note by id
 */
travelNoteRouter.get("/:noteId", async (req, res) => {
    const { noteId } = req.params;

    // Verify user status
    const auth0Id = req.auth.payload.sub;
    if (!auth0Id) {
        res.status(401).send("Unauthorized");
        return;
    };

    // Retrieve the note
    const note = await prisma.travelNote.findUnique({
        where: {
            id: parseInt(noteId),
        },
    });

    // Return the plan
    res.json(note);
});


/**
 * RETRIEVE -- retrieve all notes for a plan
 */
travelNoteRouter.get("/:planId", async (req, res) => {
    const { planId } = req.params;

    // Verify user status
    const auth0Id = req.auth.payload.sub;
    if (!auth0Id) {
        res.status(401).send("Unauthorized");
        return;
    };

    // Retrieve the plans
    const plans = await prisma.travelNote.findMany({
        where: {
            travelPlanId: planId,
        },
    });

    // Return the plans
    res.json(plans);
});


/**
 * UPDATE -- updates a note by id
 */
travelNoteRouter.put("/:noteId", async (req, res) => {
    const { noteId } = req.params;
    const { content } = req.body;

    // Verify user status
    const auth0Id = req.auth.payload.sub;
    if (!auth0Id) {
        res.status(401).send("Unauthorized");
        return;
    };

    // Verify required fields
    if (!content) {
        res.status(400).send("Missing required fields");
        return;
    };

    // Update the note
    const plan = await prisma.travelNote.update({
        where: {
            id: parseInt(noteId),
        },
        data: {
            content,
        },
    });
    res.json(plan);
});


/**
 * DELETE -- delete a note by id
 */
travelNoteRouter.delete("/:noteId", async (req, res) => {
    const { noteId } = req.params;

    // Verify user status
    const auth0Id = req.auth.payload.sub;
    if (!auth0Id) {
        res.status(401).send("Unauthorized");
        return;
    };

    // Delete the note
    const plan = await prisma.travelNote.delete({
        where: {
            id: parseInt(noteId),
        },
    });
    res.json(plan);
});

export default travelNoteRouter;