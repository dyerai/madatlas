/* eslint-env jquery */
import React from "react";
import { Button, Col, Row, Form, Modal } from "react-bootstrap";

export default function ComplexSearchModal({ show, close, setPayload }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    close();

    const payload = {
      filters: {
        bio: false,
        human: false,
        lit: false,
        natSci: false,
        phySci: false,
        socSci: false,
        commA: false,
        commB: false,
        quantA: false,
        quantB: false,
        ethnic: false,
      },
      combinator: {
        and: false,
        or: false,
        andNot: false,
      },
    };

    payload.filters[e.target[0].value] = true;
    payload.combinator[e.target[1].value === "and not" ? "andNot" : e.target[1].value] = true;
    payload.filters[e.target[2].value] = true;
    console.log(payload.combinator);
    setPayload(payload);
  };

  const hideSelectOption = () => {
    document.querySelectorAll('option').forEach((option) => option.removeAttribute('disabled'));
    document.querySelectorAll('select.reqSelector').forEach((select) => {
      let selected = select.selectedIndex;
      if (select.id === "select-1") {
        document.getElementById('select-2').options[selected].setAttribute('disabled', 'true');
      }
      else if (select.id === 'select-2') {
        document.getElementById('select-1').options[selected].setAttribute('disabled', 'true');
      }
    });
  };

  return (
    <Modal show={show} size="lg" centered onHide={close}>
      <Modal.Header>I'm looking for a course that is...</Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body as={Row}>
          <Col>
            <Form.Group>
              <Form.Select className="reqSelector" id="select-1" onChange={hideSelectOption}>
                <optgroup label="Breadth">
                  <option value="bio">Biological Sciences</option>
                  <option value="human" disabled>Humanities</option>
                  <option value="lit">Literature</option>
                  <option value="natSci">Natural Sciences</option>
                  <option value="phySci">Physical Sciences</option>
                  <option value="socSci">Social Sciences</option>
                </optgroup>
                <optgroup label="General Education">
                  <option value="commA">Communication A</option>
                  <option value="commB">Communication B</option>
                  <option value="quantA">Quantitative Reasoning A</option>
                  <option value="quantB">Quantitative Reasoning B</option>
                  <option value="ethnic">Ethnic Studies</option>
                </optgroup>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Select>
                <option>and</option>
                <option>or</option>
                <option>and not</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Select className="reqSelector" id="select-2" defaultValue="human" onChange={hideSelectOption}>
                <optgroup label="Breadth">
                  <option value="bio" disabled>Biological Sciences</option>
                  <option value="human">Humanities</option>
                  <option value="lit">Literature</option>
                  <option value="natSci">Natural Sciences</option>
                  <option value="phySci">Physical Sciences</option>
                  <option value="socSci">Social Sciences</option>
                </optgroup>
                <optgroup label="General Education">
                  <option value="commA">Communication A</option>
                  <option value="commB">Communication B</option>
                  <option value="quantA">Quantitative Reasoning A</option>
                  <option value="quantB">Quantitative Reasoning B</option>
                  <option value="ethnic">Ethnic Studies</option>
                </optgroup>
              </Form.Select>
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
