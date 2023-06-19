import express from "express";
import pkg from "@prisma/client";

const planRouter = express.Router();
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

/**
 * CREATE -- create a plan with only metadata
 */

/**
 * RETRIEVE -- retrieve a plan
 */

/**
 * UPDATE -- updates a plan with generated itineraries
 */

/**
 * DELETE -- delete a plan
 */

export default planRouter;