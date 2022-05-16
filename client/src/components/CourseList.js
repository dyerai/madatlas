import { Row, ListGroup, Container } from "react-bootstrap";

export default function CourseList({ courses, setCourse }) {
  if (courses?.length > 0) {
    return (
      <ListGroup style={{ overflowY: "scroll", maxHeight: "80vh"}} id="course-list">
        {courses
          .filter((course) => course.id !== undefined)
          .map((course) => {
            return (
              <ListGroup.Item key={`course-${course.id}`} style={{cursor: "pointer"}} onClick={() => setCourse(course)}>
                <Row>
                  <b>{course.abbrev}</b>
                </Row>
                <Row style={{marginLeft: 0.5 + 'em'}}>{course.name}</Row>
              </ListGroup.Item>
            );
        })}
      </ListGroup>
    );
  } else {
    return (
      <Container style={{ height: "75vh", position: "relative" }}>
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
