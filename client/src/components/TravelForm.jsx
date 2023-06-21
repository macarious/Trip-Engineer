import * as dotenv from 'dotenv';
import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import { Form, Button, ButtonGroup } from 'react-bootstrap';

dotenv.config();

export default function TravelForm() {

    const [durationDays, setDurationDays] = useState(1);
    const [hasCar, setHasCar] = useState(true);
    const [formData, setFormData] = useState(
        {
            destination: "",
            durationDays: durationDays,
            arrivalTime: "09:00",
            departureTime: "18:00",
            hasCar: hasCar,
    });
    const [validated, setValidated] = useState(false);

    function handleFormSubmit(e) {
        const form = e.target;
        e.preventDefault();
        if (form.checkValidity() === true) {
            setValidated(true);
            setFormData(
                {
                    destination: form.destination.value,
                    durationDays: durationDays,
                    arrivalTime: form.arrivalTime.value,
                    departureTime: form.departureTime.value,
                    hasCar: hasCar,
                }
            );
            fetch(process.env.REACT_APP_API_URL + "/plan", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("Form Submitted:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
            
            return <Navigate to="/plan/" />;
        };
    };

    function handleTimeChange (e) {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    function handleDurationButtonClick (value) {
        setDurationDays(value);
    };

    function handleCarButtonClick (value) {
        setHasCar(value);
    };

    return (
        <Form
            noValidate
            validated={validated}
            className="d-grid"
            onSubmit={handleFormSubmit}
        >
            <Form.Group controlId="destination">
                <Form.Label className="fw-bold mt-3">Destination</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="ex. Vancouver, BC"
                    aria-label="Destination"
                    aria-describedby="Enter destination; ex. Vancouver, BC"
                    pattern=".{5,50}"
                    required
                />
                <Form.Control.Feedback type="invalid">Please input a destination (5 to 50 characters)</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="durationDays">
                <Form.Label className="fw-bold mt-3">Duration (in days)</Form.Label>
                <ButtonGroup className="d-flex">
                    {[...Array(5)].map((_, index) => (
                    <Button
                        key={index + 1}
                        variant={durationDays === (index + 1) ? "success" : "outline-secondary"}
                        aria-label={`Duration ${index + 1} Day(s)`}
                        aria-describedby={`Duration ${index + 1} Day(s)`}
                        onClick={() => handleDurationButtonClick(index + 1)}
                        className="d-flex d-flex justify-content-center fw-bold"
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
                    onChange={handleTimeChange}
                    required
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
                    onChange={handleTimeChange}
                    required
                />
                <Form.Control.Feedback type="invalid">Please select a departure time</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="hasCar">
                <ButtonGroup className="d-flex d-flex justify-content-center mt-4">
                    <Button
                        variant={hasCar === true ? "success" : "outline-secondary"}
                        aria-label="Has car"
                        aria-describedby="Select if you have a car"
                        onClick={() => handleCarButtonClick(true)}
                        className="w-50 fw-bold"
                    >
                        Car
                    </Button>
                    <Button
                        variant={hasCar === false ? "success" : "outline-secondary"}
                        aria-label="No car"
                        aria-describedby="Select if you do not have a car"
                        onClick={() => handleCarButtonClick(false)}
                        className="w-50 fw-bold"
                    >
                        No Car
                    </Button>
                </ButtonGroup>
            </Form.Group>
            
            <div className="d-flex align-items-center justify-content-center my-4">
                <Button
                    type="submit"
                    aria-label="Generate"
                    aria-describedby="Generate a vacation plan"
                    variant="primary"
                    className="w-50"
                >
                    GENERATE
                </Button>
            </div>
        </Form>
    );
}
