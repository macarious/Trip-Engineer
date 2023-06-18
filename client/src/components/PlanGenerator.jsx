import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";
import TravelForm from "./TravelForm";

export default function PlanGenerator() {
    return (
        <Container style={{ marginTop: '5%' }} className="d-flex flex-column align-items-center justify-content-center">
            <div className="d-grid gap-2">
                <Row className="mx-auto">
                    <h3>Plan Generator</h3>
                </Row>
                <Row>
                    <TravelForm></TravelForm>
                </Row>
            </div>
        </ Container>
    );
}
  