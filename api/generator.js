import * as dotenv from 'dotenv';
import express from "express";

dotenv.config();
const generatorRouter = express.Router();

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
    const prompt = `Create a concise trip schedule for a self-guided tour in ${location}. ${ hasCar? "Car" : "No car" } available. Trip starts on day 1 at ${ arrivalTime }, and ends on day ${ durationDays } at ${ departureTime }. Consider commuting time to/from airport. Include arrival and departure as activity. For each day, suggest a maximum of 5 activities. For each activity, provide start time, short description of activity, and address. Each day, visit a different geographical area. Activities may include sightseeing, shopping, cultural/recreational activities, enjoying local cuisine, and visiting coffee shops. Do not suggest hotel. Utilize local knowledge.`
    console.log(`Prompt: ${prompt}`);

    // // Construct the function to be called by the API
    // function extractTravelPlan(newTravelPlan) {
    //     console.log("Travel Plan Generated", newTravelPlan);
    // };

    // Construct the body to be sent to the API
    const body = JSON.stringify({
        "model": process.env.OPENAI_MODEL,
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
                            "description": "An array of daily schedules, number of items in array equals to the number of days",
                            "items": {
                                "type": "array",
                                "description": "A daily plan; an array of activities, maximum number of items in array equals to 5",
                                "items": {
                                    "type": "object",
                                    "description": "An activity in a daily plan",
                                    "properties": {
                                        "timeOfDay": {
                                            "type": "string",
                                            "description": "The start time of the activity (ex. 4:00 AM)"
                                        },
                                        "activityName": {
                                            "type": "string",
                                            "description": "The name of the activity (ex. Evening stroll in Stanley Park)"
                                        },
                                        "description": {
                                            "type": "string",
                                            "description": "The description of the activity (ex. Enjoy the sunset and the view of the city)"
                                        },
                                        "address": {
                                            "type": "string",
                                            "description": "The address of the activity (ex. 2099 Beach Ave, Vancouver, BC V6G 1Z4)"
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
    const { choices } = response;
    const travelPlanObject = JSON.parse(choices[0].message.function_call.arguments);
    const generatedPlan = travelPlanObject.travelPlan;

    // Log the generated plan
    console.log("Generated Travel Plan:", generatedPlan);
    res.json(generatedPlan);
});

export default generatorRouter;