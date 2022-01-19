import { Button, Col, Row, Form, Modal } from "react-bootstrap";

export default function ComplexSearchModal({ show, close, handleSubmit, setComplex }) {
  const handleClick = (e) => {
    console.log('in handle');
    close();
    setComplex(true);
    handleSubmit(e);
  };

  return (
    <Modal show={show} size="lg" centered onHide={close}>
      <Modal.Header>Hello</Modal.Header>
      <Form onSubmit={handleClick}>
        <Modal.Body as={Row}>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Breadth</Form.Label>
              <Form.Check id="c0" label="Biological Sciences" name="bio" />
              <Form.Check id="c1" label="Humanities" name="human" />
              <Form.Check id="c2" label="Literature" name="lit" />
              <Form.Check id="c3" label="Natural Sciences" name="natSci" />
              <Form.Check id="c4" label="Physical Sciences" name="phySci" />
              <Form.Check id="c5" label="Social Sciences" name="socSci" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mt-5 ms-5">
              <Form.Check
                id="crand"
                type="radio"
                label="and"
                name="radioGroup"
                defaultChecked
              />
              <Form.Check id="cror" type="radio" label="or" name="radioGroup" />
              <Form.Check
                id="crandnot"
                type="radio"
                label="and not"
                name="radioGroup"
              />
              <Form.Check
                id="crornot"
                type="radio"
                label="or not"
                name="radioGroup"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>General Education</Form.Label>
              <Form.Check id="ci0" label="Communication A" name="commA" />
              <Form.Check id="ci1" label="Communication B" name="commB" />
              <Form.Check
                id="ci2"
                label="Quantitative Reasoning A"
                name="quantA"
              />
              <Form.Check
                id="ci3"
                label="Quantitative Reasoning B"
                name="quantB"
              />
              <Form.Check id="ci4" label="Ethnic Studies" name="ethnic" />
            </Form.Group>
          </Col>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
