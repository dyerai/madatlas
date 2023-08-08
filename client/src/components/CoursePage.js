import { useState } from "react";
import { Button, Col, Row, FormSelect, Table } from "react-bootstrap";
import RatingModal from "./RatingModal";

export default function CoursePage({ course }) {
  const [show, setShow] = useState(false);

  const closeModal = () => setShow(false);
  const openModal = () => setShow(true);
  console.log(course);

  if (course != null) {
    return (
      <>
        <div>
          <Row className="course_header" style={{ background: "#eee" }}>
            <Row>
              <Col sm={11} className="course_title">
                <h3>{course.name}</h3>
              </Col>
              <Col sm={1}>
                <Button size="sm" className="ms-3 mt-1" onClick={openModal}>
                  Rate
                </Button>
              </Col>
            </Row>
            <Row>
              <Col xs="auto">
                <b>{course.abbrev}</b>
              </Col>
              <Col>
                <b style={{ fontSize: 0.9 + "em" }}>
                  {course.credits}
                  {course.credits === "1" ? " credit" : " credits"}
                </b>
              </Col>
            </Row>
          </Row>
          <br />
          <Row className="course_body">
            <Row className="description">
              <Row>
                <h5>Description</h5>
              </Row>
              <Row className="ms-1">
                <p>{course.description}</p>
              </Row>
            </Row>
            <br />
            <Row className="evaluations">
              <Row>
                <h5>Evaluations</h5>
              </Row>
              <Row className="ms-1">
              <Row>
                <FormSelect>
                  {course.instructors.map((instructor) => {
                    return <option value={instructor.id}>{instructor.name}</option>;
                  })}
                </FormSelect>
              </Row>
              <Table bordered striped hover width={"30%"}>
                <tbody>
                  <tr>
                    {/* How would course load even be rated?
                        0 = Heavy, 5 = light?*/}
                    <td>Course Load</td>
                    <td>0.00</td>
                  </tr>
                  <tr>
                    <td>Course Difficulty</td>
                    <td>0.00</td>
                  </tr>
                  <tr>
                    <td>Personal Enjoyment</td>
                    <td>0.00</td>
                  </tr>
                </tbody>
              </Table>
              </Row>
              {/* <Row>
              <ul>
                <li>Course Load</li>
                <li>Course Difficulty</li>
                <li>Personal Enjoyment</li>
              </ul>
            </Row> */}
            </Row>
          </Row>
          <br />
        </div>
        <RatingModal course={course} show={show} close={closeModal} />
      </>
    );
  } else {
    return <></>;
  }
}
