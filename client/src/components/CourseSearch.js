import React from "react";
import { Form, Button } from "react-bootstrap";
import ComplexSearchModal from "./ComplexSearchModal";

export default function CourseSearch({ setPayload }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    let payload = null;

    payload = {
      filters: {
        bio: e.target[0].checked,
        human: e.target[1].checked,
        lit: e.target[2].checked,
        natSci: e.target[3].checked,
        phySci: e.target[4].checked,
        socSci: e.target[5].checked,
        commA: e.target[6].checked,
        commB: e.target[7].checked,
        quantA: e.target[8].checked,
        quantB: e.target[9].checked,
        ethnic: e.target[10].checked,
      },
    };

    setPayload(payload);
  };

  const [show, setShow] = React.useState(false);

  const handleOpen = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Breadth</Form.Label>
          <Form.Check id="0" label="Biological Sciences" name="bio" />
          <Form.Check id="1" label="Humanities" name="human" />
          <Form.Check id="2" label="Literature" name="lit" />
          <Form.Check id="3" label="Natural Sciences" name="natSci" />
          <Form.Check id="4" label="Physical Sciences" name="phySci" />
          <Form.Check id="5" label="Social Sciences" name="socSci" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>General Education</Form.Label>
          <Form.Check id="i0" label="Communication A" name="commA" />
          <Form.Check id="i1" label="Communication B" name="commB" />
          <Form.Check id="i2" label="Quantitative Reasoning A" name="quantA" />
          <Form.Check id="i3" label="Quantitative Reasoning B" name="quantB" />
          <Form.Check id="i4" label="Ethnic Studies" name="ethnic" />
        </Form.Group>

        <Form.Group>
          <Button type="submit">Search</Button>
        </Form.Group>
        <Form.Group>
          <Button variant="link" onClick={handleOpen}>
            Complex Search
          </Button>
        </Form.Group>
      </Form>
      <ComplexSearchModal show={show} close={handleClose} setPayload={setPayload} />
    </>
  );
}
