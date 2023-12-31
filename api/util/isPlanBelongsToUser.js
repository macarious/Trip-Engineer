import pkg from "@prisma/client";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// This function verifies that if plan belongs to user.
// Returns true if plan belongs to user, false otherwise.
// Return error message if plan does not belong to user.
export default async function isPlanBelongsToUser(req, res, plan) {
    // Retrieve the user which the plan belongs to, and verify if user is the same as the current user
    const user = await prisma.user.findUnique({
        where: {
            id: plan.userId,
        },
    });
    
    if (user.auth0Id !== req.auth.payload.sub) {
        res.status(401).send("Unauthorized");
        return false;
    }
    return true;
};