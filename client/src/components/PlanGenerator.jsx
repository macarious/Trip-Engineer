import { Container, Row } from "react-bootstrap";
import PlanGeneratorForm from "./PlanGeneratorForm";
import "../styles/planGenerator.css";

export default function PlanGenerator() {
    return (
        <Container className="plan-generator-content">
            <Row>
                <h1 className="text-center">Create a New Plan</h1>
            </Row>
            <Row>
                <PlanGeneratorForm />
            </Row>
        </ Container>
    );
}