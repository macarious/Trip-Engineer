import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";
import PlanGeneratorForm from "./PlanGeneratorForm";

export default function PlanGenerator() {
    return (
        <Container style={{ maxWidth: '1024px', marginBottom: "60px"}} className="d-flex flex-column mt-3">
            <Row>
                <h1 className="text-center">Create a New Plan</h1>
            </Row>
            <Row>
                <PlanGeneratorForm />
            </Row>
        </ Container>
    );
}