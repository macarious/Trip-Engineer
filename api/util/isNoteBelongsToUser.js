import pkg from "@prisma/client";
import isPlanBelongsToUser from "./isPlanBelongsToUser.js";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// This function verifies that if note belongs to user.
// Returns true if note belongs to user, false otherwise.
// Return error message if note does not belong to user.
export default async function isNoteBelongsToUser(req, res, note) {
    // Retrive the plan which the note belongs to
    const plan = await prisma.travelPlan.findUnique({
        where: {
            id: note.travelPlanId,
        },
    });

    // Retrieve the user which the plan belongs to, and verify if user is the same as the current user
    return await isPlanBelongsToUser(req, res, plan);
};