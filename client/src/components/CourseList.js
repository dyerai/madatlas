import { Row, ListGroup, Container } from "react-bootstrap";

export default function CourseList({ courses }) {
  if (courses?.length > 0) {
    return (
      <ListGroup style={{ overflowY: "scroll", maxHeight: "85vh" }}>
        {courses?.map((course) => {
          return (
            <ListGroup.Item key={`course-${course.id}`}>
              <Row>
                <b>{course.abbrev}</b>
              </Row>
              <Row className="ms-1">{course.name}</Row>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  } else {
    return (
      <Container style={{ height: "85vh", position: "relative" }}>
        <h3
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          No Courses Found!
        </h3>
      </Container>
    );
  }
}
