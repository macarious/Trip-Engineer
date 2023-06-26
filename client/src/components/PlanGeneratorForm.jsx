import { useState } from 'react';
import { Link } from "react-router-dom";
import { Button, ButtonGroup, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useAuthToken } from "../AuthTokenContext";
import backToTop from "../util/backToTop";
import TravelPlanCardGroup from "./TravelPlanCardGroup";
import useTravelPlans from "../hooks/useTravelPlans";

export default function PlanGeneratorForm() {

    const { accessToken } = useAuthToken();
    
    const [travelPlans, setTravelPlans] = useTravelPlans();
    const [generatedPlanLocation, setGeneratedPlanLocation] = useState("");
    const [generatedSchedule, setGeneratedSchedule] = useState("");
    const [durationDays, setDurationDays] = useState(1);
    const [hasCar, setHasCar] = useState(true);
    const [formData, setFormData] = useState(
        {
            location: "",
            durationDays: durationDays,
            arrivalTime: "09:00",
            departureTime: "18:00",
            hasCar: hasCar,
            plan: []
    });
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);

    // This function is called when plan generation is unsuccessful
    function unsuccessfulOutcome() {
        alert("Error: Failed to generate plan");
        setLoading(false);
        return;
    };

    // This function is called when plan generation is successful
    function successfulOutcome() {
        setGeneratedPlanLocation(formData.location);
        setLoading(false);
    };

    // This function is called when the form is submitted
    async function handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target;

        // Show the user that the form is being validated
        setValidated(true);

        // Check if the form is valid
        if (!form.checkValidity()) {
            e.stopPropagation();
            setLoading(false);
            return;
        };

        // If the form is valid, set validated to true
        setLoading(true);
        console.log("Form is valid. Now submitting:", formData);

        // Send a POST request to the API to generate a travel plan
        const newSchedule = await fetch(process.env.REACT_APP_API_URL + "/generator", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then((response) => response.json())
        .catch((error) => {
            unsuccessfulOutcome()
            return;
        });

        if (!newSchedule) {
            unsuccessfulOutcome()
            return;
        };

        // Send a POST request to the API to save the travel plan to the database
        const newTravelPlan = await fetch(process.env.REACT_APP_API_URL + "/plan", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then((response) => response.json())
        .catch((error) => {
            unsuccessfulOutcome()
            return;
        });

        if (!newTravelPlan) {
            unsuccessfulOutcome()
            return;
        };

        // Send a PUT request to insert the new travel plan array to the existing travel plan in the database
        const travelPlanId = newTravelPlan.id;
        const updatedTravelPlan = await fetch(process.env.REACT_APP_API_URL + `/plan/${travelPlanId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newSchedule),
        })
        .then((response) => response.json())
        .catch((error) => {
            unsuccessfulOutcome()
            return;
        });

        if (!updatedTravelPlan) {
            unsuccessfulOutcome()
            return;
        };

        // If the travel plans are updated properly, update the TravelPlans
        setTravelPlans(updatedTravelPlan);
        setGeneratedSchedule(newSchedule);
        console.log("Existing saved travel plans:", travelPlans);
        console.log("New travel plan successfully added", updatedTravelPlan);
        successfulOutcome();

        return;
    };

    function handleFieldChange (e) {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    function handleDurationButtonClick (value) {
        setDurationDays(value);
        setFormData((prevFormData) => ({
            ...prevFormData,
            durationDays: value,
        }));
    };

    function handleCarButtonClick (value) {
        setHasCar(value);
        setFormData((prevFormData) => ({
            ...prevFormData,
            hasCar: value,
        }));
    };

    return (
        <>
            <Row xs={1} className="d-flex mx-auto">
                <Form
                    noValidate
                    validated={validated}
                    className="d-flex flex-column mx-auto mb-1"
                    style={{ maxWidth: '400px' }}
                    onSubmit={handleFormSubmit}
                >
                    <Form.Group controlId="location">
                        <Form.Label
                            aria-label="Destination"
                            className="fw-bold mt-3"
                            >Destination
                        </Form.Label>
                        <Form.Control
                            name="location"
                            type="text"
                            placeholder="ex. Vancouver, BC"
                            aria-label="Destination"
                            aria-describedby="Enter destination; ex. Vancouver, BC or Sydney, Australia"
                            pattern=".{5,50}"
                            onChange={handleFieldChange}
                            required
                            className="border border-2 border-dark rounded-3"
                        />
                        <Form.Control.Feedback type="invalid">Please input a destination (5 to 50 characters)</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="durationDays">
                        <Form.Label className="fw-bold mt-3">Duration (in days)</Form.Label>
                        <ButtonGroup className="d-flex border border-2 border-dark rounded-3" style={{backgroundColor: "white"}}>
                            {[...Array(4)].map((_, index) => (
                            <Button
                                key={index + 1}
                                variant={durationDays === (index + 1) ? "success" : "outline-success"}
                                aria-label={`Duration ${index + 1} Day(s)`}
                                aria-describedby={`Duration ${index + 1} Day(s)`}
                                onClick={() => handleDurationButtonClick(index + 1)}
                                className="d-flex d-flex justify-content-center fw-bold p-1"
                            >
                                {index + 1}
                            </Button>
                            ))}
                        </ButtonGroup>
                    </Form.Group>

                    <Form.Group controlId="arrivalTime">
                        <Form.Label className="fw-bold mt-3">Arrival Time</Form.Label>
                        <Form.Control
                            type="time"
                            name="arrivalTime"
                            value={formData.arrivalTime}
                            aria-label="Arrival Time"
                            aria-describedby="Enter arrival time of first day"
                            onChange={handleFieldChange}
                            required
                            className="border border-2 border-dark rounded-3"
                        />
                        <Form.Control.Feedback type="invalid">Please select an arrival time</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="departureTime">
                        <Form.Label className="fw-bold mt-3">Departure Time</Form.Label>
                        <Form.Control
                            type="time"
                            name="departureTime"
                            value={formData.departureTime}
                            aria-label="Departure Time"
                            aria-describedby="Enter departure time of final day"
                            onChange={handleFieldChange}
                            required
                            className="border border-2 border-dark rounded-3"
                        />
                        <Form.Control.Feedback type="invalid">Please select a departure time</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="hasCar">
                        <Form.Label className="fw-bold mt-3">Transportation Mode</Form.Label>
                        <ButtonGroup className="d-flex justify-content-center border border-2 border-dark rounded-3" style={{backgroundColor: "white"}}>
                            <Button
                                variant={hasCar === true ? "success" : "outline-success"}
                                aria-label="Has car"
                                aria-describedby="Select if you have a car"
                                onClick={() => handleCarButtonClick(true)}
                                className="w-50 fw-bold p-1"
                            >
                                Car
                            </Button>
                            <Button
                                variant={hasCar === false ? "success" : "outline-success"}
                                aria-label="Trnasit"
                                aria-describedby="Select if you are travelling by transit"
                                onClick={() => handleCarButtonClick(false)}
                                className="w-50 fw-bold p-1"
                            >
                                Transit
                            </Button>
                        </ButtonGroup>
                    </Form.Group>
                    
                    <div className="d-flex flex-column mt-5 mb-2 mx-auto">
                        <Button
                            type="submit"
                            aria-label="Generate"
                            aria-describedby="Generate a vacation plan"
                            variant="primary"
                            disabled={loading}
                            style={{ width: '200px' }}
                        >
                            {loading ? (
                                <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                    {" "}Please wait...
                                </>
                                ) : (
                                    "Generate"
                                    )}
                        </Button>
                    </div>
                </Form>
            </Row>

            {generatedSchedule && (
                <>
                    <Row className="d-flex flex-column">
                        <hr className="my-3"/>
                        <h3 className="text-center">Your Trip to {generatedPlanLocation}</h3>
                    </Row>
                    <Row className="d-flex mx-auto">
                        <TravelPlanCardGroup schedule={generatedSchedule} />
                    </Row>
                    <Row>
                        <Container className="d-flex flex-wrap justify-content-center gap-3">
                            <Button
                                aria-label="Back to Top"
                                aria-describedby="Directs user back to the top of the page"
                                style={{ width: "200px" }}
                                onClick={backToTop}
                            >
                                Back to Top
                            </Button>
                            <Button
                                aria-label="Back to Saved Plans"
                                aria-describedby="Directs user back to the Saved Plans page"
                                as={Link}
                                to={"/plan"}
                                style={{ width: "200px" }}
                            >
                                Back to Saved Plans
                            </Button>
                        </Container>
                    </Row>
                </>
            )}
        </>
    );
}
