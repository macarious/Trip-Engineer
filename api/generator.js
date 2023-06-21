import * as dotenv from 'dotenv';
import express from "express";

dotenv.config();
const generatorRouter = express.Router();

/**
 * POST -- Generate a schedule from OpenAI
 */
generatorRouter.post("/", async (req, res) => {
    // Verify user status
    const auth0Id = req.auth.payload.sub;
    if (!auth0Id) {
        res.status(401).send("Unauthorized");
        return;
    };

    // Verify required fields
    const { durationDays, arrivalTime, departureTime, hasCar } = req.body;
    if (!durationDays || !arrivalTime || !departureTime || !hasCar) {
        res.status(400).send("Missing required fields");
        return;
    };

    // Construct the headers to be sent to the API
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Authorization", process.env.OPENAI_API_KEY);

    // Construct the prompt to be sent to the API
    const prompt = `Create a concise trip schedule for a self-guided tour in Vancouver. ${ hasCar? "Car" : "No car" } available. Trip starts on day 1 at ${ arrivalTime }, and ends on day ${ durationDays } at ${ departureTime }. Consider commuting time to/from airport. Include arrival and departure as activity. For each day, suggest a maximum of 5 activities. For each activity, provide start time, short description of activity, and address. Each day, visit a different geographical area. Activities may include sightseeing, shopping, cultural/recreational activities, enjoying local cuisine, and visiting coffee shops. Do not suggest hotel. Utilize local knowledge.`
    console.log(`Prompt: ${prompt}`);

    // Construct the function to be called by the API
    function extractTravelPlan(newTravelPlan) {
        console.log(`New Travel Plan Generated: ${newTravelPlan}`);
        return newTravelPlan;
    };

    // Construct the body to be sent to the API
    const body = JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [
            {
            "role": "user",
            "content": prompt
            }
        ],
        "function_call": [
            {
                "name": "extractTravelPlan",
                "description": "Extract the travel plan details from the input",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "travelPlan": {
                            "type": "array",
                            "description": "An array of daily plans",
                            "items": {
                                "type": "array",
                                "description": "A daily plan; an array of activities",
                                "items": {
                                    "type": "object",
                                    "description": "An activity",
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
        "temperature": 0.2,
        "top_p": 1,
        "n": 1,
        "stream": false,
        "max_tokens": 1024,
        "presence_penalty": 0,
        "frequency_penalty": 0
    });

    // Construct the request options to be sent to the API
    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: body,
        redirect: 'follow'
    };

    // Call Open AI API to set travelPlan
    fetch(process.env.OPENAI_API_URL, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    // Return the travelPlan
    res.json(generatedTravelPlan);
});

export default generatorRouter;