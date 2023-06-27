import * as dotenv from 'dotenv';
import express from "express";
import pkg from "@prisma/client";

dotenv.config();
const generatorRouter = express.Router();
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// This file contains the endpoints related to schedule generation

/**
 * POST -- Generate a schedule from OpenAI
 */

generatorRouter.post("/", async (req, res) => {
    const { location, durationDays, arrivalTime, departureTime, hasCar } = req.body;

    // Verify user status
    const auth0Id = req.auth.payload.sub;
    if (!auth0Id) {
        res.status(401).send("Unauthorized");
        return;
    };

    // Verify required fields
    if (!location || !durationDays || !arrivalTime || !departureTime || hasCar === undefined) {
        res.status(400).send("Missing required fields");
        return;
    };

    // Construct the headers to be sent to the API
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Authorization", process.env.OPENAI_TOKEN);

    // Construct the prompt to be sent to the API
    const prompt = `Create a concise trip schedule for a self-guided tour in ${location}. ${ hasCar? "Car" : "No car" } available. Trip starts on day 1 at ${ arrivalTime }, and ends on day ${ durationDays } at ${ departureTime }. Include arrival as first activity on day 1 and departure as final activity on day ${ durationDays }. For each day, suggest a maximum of 5 activities. For each activity, provide start time, title of activity (including the name or type of activity and the location), short description of activity (two sentences), and address. Each day, visit a different geographical area. The type of activities may include sightseeing, shopping, local markets, museums, recreation, local cuisine at a specific restaurant, theme parks, attractions, and outdoor activities. Do not suggest hotel. Utilize local knowledge.`
    console.log(`Prompt: ${prompt}`);

    // // Construct the function to be called by the API
    // function extractTravelPlan(newTravelPlan) {
    //     console.log("Travel Plan Generated", newTravelPlan);
    // };

    // Construct the body to be sent to the API
    const body = JSON.stringify({
        "model": "gpt-3.5-turbo-0613",
        "messages": [
            {
            "role": "user",
            "content": prompt
            }
        ],
        "functions": [
            {
                "name": "extractTravelPlan",
                "description": "Extract the travel plan details from the input",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "travelPlan": {
                            "type": "array",
                            "description": `An array of daily schedules, there are ${durationDays} items in this array (one item for each day)`,
                            "items": {
                                "type": "array",
                                "description": "A daily plan; an array of activities, maximum number of items in array equals to 5",
                                "items": {
                                    "type": "object",
                                    "description": "An activity in a daily plan",
                                    "properties": {
                                        "timeOfDay": {
                                            "type": "string",
                                            "description": "The start time of the activity (ex. 13:00)"
                                        },
                                        "activityName": {
                                            "type": "string",
                                            "description": "Must include both the name of activity and its location (ex. Evening stroll in Stanley Park)"
                                        },
                                        "description": {
                                            "type": "string",
                                            "description": "Two sentences describing the activity (ex. Visit the famous park, walk along the seawall, and enjoy the scenic views of the city and surrounding nature. From the captivating Totem Poles and breathtaking views at Prospect Point to the serene Beaver Lake and scenic seawall, Stanley Park offers an unforgettable experience where you can immerse yourself in the splendor of nature while exploring its rich cultural heritage.)"
                                        },
                                        "address": {
                                            "type": "string",
                                            "description": "The address of the activity (ex. 2099 Beach Ave, Vancouver, BC V6G 1Z4); if activity has no proper of structured address format, return the city name instead (ex. Vancouver, BC)"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "required": ["travelPlan"]
                }
            }
        ],
        "function_call": {
            "name": "extractTravelPlan"
        },
        "temperature": 0.2,
        "top_p": 1,
        "n": 1,
        "stream": false,
        "max_tokens": 2048
    });

    // Construct the request options to be sent to the API
    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: body,
        redirect: 'follow'
    };

    // Call Open AI API to set travelPlan
    const response = await fetch(process.env.OPENAI_URL, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));

    if (!response) {
        res.status(500).send("Error generating schedule");
    };

    // Return the travelPlan
    console.log(response);  
    const { choices } = response;
    const travelPlanObject = JSON.parse(choices[0].message.function_call.arguments);
    const generatedPlan = travelPlanObject.travelPlan;

    // Log the generated plan
    console.log("Generated Travel Plan:", generatedPlan);
    res.json(generatedPlan);
});

export default generatorRouter;