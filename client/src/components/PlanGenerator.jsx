import { Container, Row } from "react-bootstrap";
import PlanGeneratorForm from "./PlanGeneratorForm";
import "../styles/planGenerator.css";

export default function PlanGenerator() {
    return (
        <Container className="plan-generator-content d-flex flex-column align-items-justify justify-content-center mb-4">
            <Row>
                <h1 className="text-center">Create a New Plan</h1>
            </Row>
            <Row>
                <PlanGeneratorForm />
            </Row>
        </ Container>
    );
}