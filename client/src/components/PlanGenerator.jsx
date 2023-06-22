import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";
import TravelForm from "./TravelForm";

export default function PlanGenerator() {
    return (
        <Container style={{ maxWidth: '1024px' }} className="d-flex flex-column my-3">
            <div>
                <Row>
                    <h1 className="text-center">Plan Generator</h1>
                </Row>
                <Row>
                    <TravelForm />
                </Row>
            </div>
        </ Container>
    );
}
  