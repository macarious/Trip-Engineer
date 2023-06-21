import express from "express";
import pkg from "@prisma/client";
import * as dotenv from 'dotenv';
import isNoteBelongsToUser from "./util/isNoteBelongsToUser.js";
import isPlanBelongsToUser from "./util/isPlanBelongsToUser.js";
import userStatusVerified from "./util/verifyUserStatus.js";


dotenv.config()
const travelNoteRouter = express.Router();
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// This file contains all the endpoints related to travel notes

travelNoteRouter.post("/", async (req, res) => {
    const { title, travelPlanId } = req.body;
    
    // Verify user status
    if (!userStatusVerified(req, res)) {
        return;
    };
    
    // Verify required fields
    if (!title || !travelPlanId) {
        res.status(400).send("Missing required fields");
        return;
    };

    // Create the note
    const note = await prisma.travelNote.create({
        data: {
            title,
            travelPlan: { connect: { id: travelPlanId } },
        },
    });

    // Return the note
    res.status(201).json(note);
});





/**
 * CREATE -- create a note
 */
travelNoteRouter.post("/:planId", async (req, res) => {
    const { planId } = req.params;
    const { title } = req.body;

    // Verify user status
    if (!userStatusVerified(req, res)) {
        return;
    };

    // Verify required fields
    if (!title) {
        res.status(400).send("Missing required fields");
        return;
    };

    // Create the note
    const note = await prisma.travelNote.create({
        data: {
            title,
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
    if (!userStatusVerified(req, res)) {
        return;
    };

    // Retrieve the note
    const note = await prisma.travelNote.findUnique({
        where: {
            id: parseInt(noteId),
        },
    });

    // Verify ownership of note
    if (!isNoteBelongsToUser(req, res, note)) {
        return;
    };

    // Return the note
    res.json(note);
});


/**
 * RETRIEVE -- retrieve all notes for a plan
 */
travelNoteRouter.get("/:planId", async (req, res) => {
    const { planId } = req.params;

    // Verify user status
    if (!userStatusVerified(req, res)) {
        return;
    };

    // Retrieve the plan which the note belongs to
    const plan = await prisma.travelPlan.findUnique({
        where: {
            id: parseInt(planId),
        },
    });

    // Verify ownership of plan
    if (!isPlanBelongsToUser(req, res, plan)) {
        return;
    };

    // Retrieve the notes
    const notes = await prisma.travelNote.findMany({
        where: {
            travelPlanId: planId,
        },
    });

    // Return the notes
    res.json(notes);
});


/**
 * UPDATE -- updates a note by id
 */
travelNoteRouter.put("/:noteId", async (req, res) => {
    const { noteId } = req.params;
    const { title } = req.body;

    // Verify user status
    if (!userStatusVerified(req, res)) {
        return;
    };

    // Verify required fields
    if (!title) {
        res.status(400).send("Missing required fields");
        return;
    };

    // Retrieve the note
    const note = await prisma.travelNote.findUnique({
        where: {
            id: parseInt(noteId),
        },
    });

    // Verify ownership of note
    if (!isNoteBelongsToUser(req, res, note)) {
        return;
    };
    
    // Update the note
    plan = await prisma.travelNote.update({
        where: {
            id: parseInt(noteId),
        },
        data: {
            title,
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
    if (!userStatusVerified(req, res)) {
        return;
    };

    // Retrieve the note
    const note = await prisma.travelNote.findUnique({
        where: {
            id: parseInt(noteId),
        },
    });

    // Verify ownership of note
    if (!isNoteBelongsToUser(req, res, note)) {
        return;
    };

    // Delete the note
    const deteledNote = await prisma.travelNote.delete({
        where: {
            id: parseInt(noteId),
        },
    });

    // Return the deleted note
    res.json(deteledNote);
});


export default travelNoteRouter;