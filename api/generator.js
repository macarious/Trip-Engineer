import express from "express";
import { useState } from "react";

const generatorRouter = express.Router();const { travelPlan, setTravelPlan } = useState(
    {
        day1: {
            activity1: {
                timeOfDay: "12:00",
                activityName: "Granville Island",
                description: "Granville Island is a peninsula and shopping district in Vancouver, British Columbia, Canada. It is located across False Creek from Downtown Vancouver, under the south end of the Granville Street Bridge.",
                address: "1661 Duranleau St, Vancouver, BC V6H 3S3",
            },
    },
});

// Construct the headers to be sent to the API
const headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");
headers.append("Authorization", process.env.OPENAI_API_KEY);

// Construct the prompt to be sent to the API
const prompt = `Create a concise trip schedule for a self-guided tour in Vancouver. ${ hasCar? "Car" : "No car" } available. Trip starts on day 1 at ${ arrivalTime }, and ends on day ${ durationDays } at ${ departureTime }. Consider commuting time to/from airport. Include arrival and departure as activity. For each day, suggest a maximum of 5 activities. For each activity, provide start time, short description of activity, and address. Each day, visit a different geographical area. Activities may include sightseeing, shopping, cultural/recreational activities, enjoying local cuisine, and visiting coffee shops. Do not suggest hotel. Utilize local knowledge.`

// Construct the function to be called by the API
function create_itinerary(newTravelPlan) {
    setTravelPlan(newTravelPlan);
    console.log(newTravelPlan);
}

// Construct the body to be sent to the API
const body = JSON.stringify({
    "model": "gpt-3.5-turbo",
    "messages": [
        {
        "role": "user",
        "content": prompt
        }
    ],
    "functions": [
        {
            "name": "create_itinerary",
            "description": "Generate a travel plan",
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
                                        "description": "The start time of the activity"
                                    },
                                    "activityName": {
                                        "type": "string",
                                        "description": "The name of the activity"
                                    },
                                    "description": {
                                        "type": "string",
                                        "description": "The description of the activity"
                                    },
                                    "address": {
                                        "type": "string",
                                        "description": "The address of the activity"
                                    }
                                }
                            }
                        }
                    }
                }
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

const requestOptions = {
    method: 'POST',
    headers: headers,
    body: body,
    redirect: 'follow'
};

fetch("https://api.openai.com/v1/chat/completions", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));


/**
 * POST -- Generate a schedule from OpenAI
 */
generatorRouter.post("/", async (req, res) => {
    const { travelPlan } = req.body;
    const newTravelPlan = create_itinerary(travelPlan);
    res.json(newTravelPlan);
});

export default generatorRouter;