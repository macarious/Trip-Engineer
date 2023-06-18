import React, { useState } from 'react';
import { Form, Button, ButtonGroup, InputGroup } from 'react-bootstrap';

export default function TravelForm() {

    const [formData, setFormData] = useState();
    const [hasCar, setHasCar] = useState(true);
    const [validdated, setValidated] = useState(false);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormData(
            {
                destination: e.currentTarget.destination.value,
                durationDays: e.currentTarget.durationDays.value,
                arrivalTime: e.currentTarget.arrivalTime.value,
                departureTime: e.currentTarget.departureTime.value,
                hasCar: hasCar,
            }
        );
        console.log("Form submitted!");
        console.log(formData);
    };

    const handleCarButtonClick = (value) => {
        setHasCar(value);
    };

    return (
        <Form className="d-grid gap-1" onSubmit={handleFormSubmit}>
            <Form.Group controlId="destination">
                <Form.Label>Destination</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="ex. Vancouver, BC"
                    aria-label="Destination"
                    aria-describedby="Enter destination; ex. Vancouver, BC"
                />
            </Form.Group>

            <Form.Group controlId="durationDays">
                <Form.Label>Duration</Form.Label>
                <InputGroup>
                    <Form.Control
                        type="number"
                        placeholder="(up to 7)"
                        aria-label="Duration"
                        aria-describedby="Enter duration of trip; max 7"
                        min={1}
                        max={7}
                    />
                    <InputGroup.Text>day(s)</InputGroup.Text>
                </InputGroup>
            </Form.Group>

            <Form.Group controlId="arrivalTime">
                <Form.Label>Arrival Time</Form.Label>
                <Form.Control
                    type="time"
                    aria-label="Arrival Time"
                    aria-describedby="Enter arrival time of first day"
                />
            </Form.Group>

            <Form.Group controlId="departureTime">
                <Form.Label>Departure Time</Form.Label>
                <Form.Control
                    type="time"
                    aria-label="Departure Time"
                    aria-describedby="Enter departure time of final day"
                />
            </Form.Group>

            <Form.Group controlId="hasCar">
                <ButtonGroup className="d-flex justify-content-center mt-3">
                    <Button
                        variant={hasCar === true ? "info" : "outline-info"}
                        aria-label="Has car"
                        aria-describedby="Has a car"
                        onClick={() => handleCarButtonClick(true)}
                        className="w-50"
                    >
                        Car
                    </Button>
                    <Button
                        variant={hasCar === false ? "info" : "outline-info"}
                        aria-label="No car"
                        aria-describedby="Does not have a car"
                        onClick={() => handleCarButtonClick(false)}
                        className="w-50"
                    >
                        No Car
                    </Button>
                </ButtonGroup>
            </Form.Group>

            <Button
                type="submit"
                aria-label="Generate"
                aria-describedby="Generate a vacation plan"
                variant="primary"
                className="mt-3"
            >
                GENERATE
            </Button>
        </Form>
    );
}
