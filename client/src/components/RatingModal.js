import { Modal, Row, Col, Button } from "react-bootstrap";
import Rating from "react-rating";
import Login from "../routes/Login";

export default function RatingModal({ course, show, close }) {
    let ratingValues = {
        courseLoad: null,
        difficulty: null,
        enjoyment: null
    };

    const user = JSON.parse(localStorage.getItem('user'));

    const handleSubmit = () => {
        console.log({ ...ratingValues, user: user });
        let payload = { course: course, rating: ratingValues, user: user }
        fetch(`/api/rateCourse`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {"Content-Type": "application/json"}
        }).then(() => {alert(`Sucessfully rated ${course.abbrev}`); close();})
    }

    if (user == null) {
        // TODO: center login button in modal
        return (
            <Modal show={show} onHide={close} size='sm'>
                <Modal.Header className="justify-content-center p-2"><h6>Please sign in to rate</h6></Modal.Header>
                <Modal.Body><Login /></Modal.Body>
            </Modal>
        )
    }
    return (
        <Modal show={show} onHide={close} size='sm'>
            <Modal.Header className="justify-content-center p-2"><h6>Rate {course.abbrev}</h6></Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>Course Load:</Col>
                    <Col><Rating fractions={2} emptySymbol="fa-regular fa-star fa" fullSymbol="fa-solid fa-star" onChange={(value) => ratingValues['courseLoad'] = value}/></Col>
                </Row>
                <Row>
                    <Col>Difficulty: </Col>
                    <Col><Rating fractions={2} emptySymbol="fa-regular fa-star fa" fullSymbol="fa-solid fa-star" onChange={(value) => ratingValues['difficulty'] = value}/></Col>
                </Row>
                <Row>
                    <Col>Enjoyment: </Col>
                    <Col><Rating fractions={2} emptySymbol="fa-regular fa-star fa" fullSymbol="fa-solid fa-star" onChange={(value) => ratingValues['enjoyment'] = value}/></Col>
                </Row>
            </Modal.Body>
            <Modal.Footer className="p-1">
                <Button size="sm" onClick={handleSubmit}>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}