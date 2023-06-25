import React, { useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { useAuthToken } from "../AuthTokenContext";
import useTravelNotes from "../hooks/useTravelNotes";

export default function TravelNoteForm(props) {

    const { accessToken } = useAuthToken();
    const { planId, callback } = props;

    const [travelNotes, setTravelNotes] = useTravelNotes(planId);
    const [formData, setFormData] = useState("");
    const [validated, setValidated] = useState(false);

    // This function is called when note form is submitted successfully
    function successfulOutcome() {
        setTravelNotes([...travelNotes, formData.title]);
        setFormData("");
        setValidated(false);
        callback(planId);
    };

    function handleCancelButtonClick() {
        setFormData("");
        setValidated(false);
        callback(planId);
    };

    async function handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target;

        // Show the user that the form is being validated
        setValidated(true);

        // Check if the form is valid
        if (!form.checkValidity()) {
            e.stopPropagation();
            return;
        };
        console.log("Form is valid. Now submitting:", formData);

        // Send the form data to the API endpoint to create a new travel note
        const newNote = await fetch(process.env.REACT_APP_API_URL + "/note/" + planId, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
            })
            .then((response) => response.json())
            .catch((error) => {
                console.error("Error:", error);
        });

        if (!newNote) {
            return;
        };

        form.reset();
        successfulOutcome();
    };

    function handleFieldChange (e) {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <>
            <Row xs={1} className="d-flex mx-auto">
                <Form
                    noValidated
                    validated={validated}
                    className="d-flex flex-column mx-auto mb-1"
                    onSubmit={handleFormSubmit}
                >
                    <Form.Group className="mb-2" controlId="title">
                        <Form.Label
                            aria-label="Note"
                            className="fw-bold mt-3"
                        >
                            Add Note:
                        </Form.Label>
                        <Form.Control
                            name="title"
                            type="text"
                            as="textarea"
                            rows={2}
                            placeholder="ex. Summer Holiday 2024"
                            aria-label="Note"
                            aria-describedby="Enter a note; ex. Summer Holiday 2024"
                            pattern=".{1,63}"
                            onChange={handleFieldChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">(1 to 63 characters)</Form.Control.Feedback>
                    </Form.Group>
                    
                    <div className="d-flex flex-row flex-wrap mb-1 mx-auto" xs={1}>
                        <Button
                            type="submit"
                            aria-label="Submit"
                            aria-describedby="Submit a note to attach to a travel plan"
                            style={{ width: '200px' }}
                        >
                            Submit
                        </Button>
                        <Button
                            aria-label="Cancel"
                            aria-describedby="Exit from the note form"
                            style={{ width: '200px' }}
                            onClick={handleCancelButtonClick}
                        >
                            Cancel
                        </Button>
                    </div>
                </Form>
            </Row>
        </>
    );
}
