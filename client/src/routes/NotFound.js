import MadatlasNavbar from "../components/MadatlasNavbar";
import { Container } from "react-bootstrap";

export default function NotFound() {
    return (
        <Container fluid style={{overflow: "hidden"}} className="px-0">
            <MadatlasNavbar />
            <h3 className="d-flex justify-content-center mt-3">Page Not Found</h3>
        </Container>
    );
}