import express from "express";
import pkg from "@prisma/client";

const databaseRouter = express.Router();
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export default databaseRouter;

/**
 * CREATE -- post a schedule
 */

/**
 * RETRIEVE -- retrieve a schedule
 */

/**
 * UPDATE -- update a schedule
 */

/**
 * DELETE -- delete a scehdule
 */