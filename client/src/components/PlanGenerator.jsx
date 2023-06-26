import { Container, Row } from "react-bootstrap";
import PlanGeneratorForm from "./PlanGeneratorForm";

export default function PlanGenerator() {
    return (
        <Container style={{ marginTop: '5vh'}} className="mb-4">
            <Row>
                <h1 className="text-center">Create a New Plan</h1>
            </Row>
            <Row>
                <PlanGeneratorForm />
            </Row>
        </ Container>
    );
}