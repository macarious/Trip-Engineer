import { useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { useAuthToken } from "../AuthTokenContext";
import useTravelNotesByPlan from "../hooks/useTravelNotesByPlan";

export default function TravelNoteForm(props) {

    const { accessToken } = useAuthToken();
    const { planId, callback } = props;
    const [travelNotesByPlan, setTravelNotesByPlan] = useTravelNotesByPlan(planId);
    const [formData, setFormData] = useState("");
    const [validated, setValidated] = useState(false);

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

        setTravelNotesByPlan([...travelNotesByPlan, formData.title]);
        setFormData("");
        setValidated(false);
        form.reset();
        callback(planId, newNote);
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
                    noValidate
                    validated={validated}
                    className="d-flex flex-column mx-auto mb-1"
                    onSubmit={handleFormSubmit}
                >
                    <Form.Group className="mb-2" controlId="title">
                        <Form.Label
                            aria-label="Add Tag"
                            aria-describedby="Enter a tag to attach to a travel plan"
                            className="fw-bold mb-0 mx-2"
                        >
                            Add Tag:
                        </Form.Label>
                        <Form.Control
                            name="title"
                            type="text"
                            placeholder="ex. Summer-2024"
                            aria-label="Note"
                            aria-describedby="Enter a note; ex. Summer-2024"
                            pattern=".{1,31}"
                            onChange={handleFieldChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">(1 to 15 characters)</Form.Control.Feedback>
                    </Form.Group>
                    
                    <div className="d-flex flex-wrap justify-content-center gap-2">
                        <Button
                            variant="primary"
                            type="submit"
                            aria-label="Submit"
                            aria-describedby="Submit a note to attach to a travel plan"
                            style={{ width: '150px' }}
                        >
                            Add
                        </Button>
                        <Button
                            variant="outline-secondary"
                            aria-label="Cancel"
                            aria-describedby="Exit from the note form"
                            style={{ width: '150px' }}
                            onClick={handleCancelButtonClick}
                        >
                            Return
                        </Button>
                    </div>
                </Form>
            </Row>
        </>
    );
}
