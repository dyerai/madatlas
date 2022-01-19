import React from "react";
import { Form, Button } from "react-bootstrap";
import ComplexSearchModal from "./ComplexSearchModal";

export default function CourseSearch({
  getCourses,
  getPage,
  getNumPages,
  page,
  getPayload,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    let payload = null;

    if (!isComplex) {
      console.log('in not complex');
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
    }
    else if (isComplex) {
      payload = {
        filters: {
          bio: e.target[0].checked,
          human: e.target[1].checked,
          lit: e.target[2].checked,
          natSci: e.target[3].checked,
          phySci: e.target[4].checked,
          socSci: e.target[5].checked,
          commA: e.target[10].checked,
          commB: e.target[11].checked,
          quantA: e.target[12].checked,
          quantB: e.target[13].checked,
          ethnic: e.target[14].checked,
        },
        combinator: {
          and: e.target[6].checked,
          or: e.target[7].checked,
          andNot: e.target[8].checked,
          orNot: e.target[9].checked,
        }
      };
    }
    getPayload(payload);
  };
  const handleButtonClick = (e) => {
    setComplex(false);
    handleSubmit(e);
  };

  const [show, setShow] = React.useState(false);
  const [isComplex, setComplex] = React.useState(false);
  const [formData, setFormData] = React.useState(null);
  
  const handleOpen = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleComplex = () => {
    setComplex(true);
  };

  return (
    <>
      <Form onSubmit={handleButtonClick}>
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
      <ComplexSearchModal
        show={show}
        close={handleClose}
        handleSubmit={handleSubmit}
        setComplex={handleComplex}
        complex={isComplex}
      />
    </>
  );
}
