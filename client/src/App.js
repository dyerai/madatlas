/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Button, Col, Row, Container } from "react-bootstrap";
import CourseSearch from "./components/CourseSearch";
import "bootstrap/dist/css/bootstrap.min.css";
import CourseList from "./components/CourseList";
import CoursePage from "./components/CoursePage";
import MadatlasNavbar from "./components/MadatlasNavbar";

function App() {
  const [page, setPage] = React.useState(1);
  const [numPages, setNumPages] = React.useState(0);
  const [courses, setCourses] = React.useState(null);
  const [subjects, setSubjects] = React.useState(null);
  const [currentCourse, setCurrentCourse] = React.useState(null);
  const [isNewQuery, setIsNewQuery] = React.useState(false);

  const defaultPayload = {
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
      subject: "0",
    },
  };
  const [payload, setPayload] = React.useState(defaultPayload);

  const getPayload = (payloadData) => {
    setPayload(payloadData);
  };

  const getCourse = (courseData) => {
    setCurrentCourse(courseData);
  };

  React.useEffect(() => {
    fetch("/api/getNumCourses")
      .then((res) => res.json())
      .then((result) => setNumPages(Math.ceil(result["COUNT(*)"] / 50)));
  }, []);

  React.useEffect(() => {
    fetch("/api/getSubjects")
      .then((res) => res.json())
      .then((result) => setSubjects(result));
  }, []);

  React.useEffect(() => {
    setPage(1);
    isNewQuery ? setIsNewQuery(false) : setIsNewQuery(true);
  }, [payload]);

  React.useEffect(() => {
    fetch(`/api/search/${(page - 1) * 50}-${page * 50}`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setCourses(result);
        document.getElementById('course-list').scrollTo(0,0)

        let numResults = 0;
        numResults = result.pop().results;
        setNumPages(Math.ceil(numResults / 50));
      });
  }, [page, isNewQuery]);

  function handleNextClick() {
    if (page !== numPages) setPage(page + 1);
  }

  function handlePrevClick() {
    if (page > 1) setPage(page - 1);
  }

  return (
    <Container fluid style={{overflow: "hidden"}} className="px-0">
      <MadatlasNavbar />
      <div style={{background: "#f7f7f7"}}>
        <Row>
          <Col>
            <CourseSearch setPayload={getPayload} subjects={subjects} />
          </Col>
          <Col style={{background: "#fdfdfd"}}>
            <CoursePage course={currentCourse} />
          </Col>
          <Col>
            <Row>
              <CourseList courses={courses} setCourse={getCourse} />
            </Row>
            <Row>
              <p>
                Page {numPages === 0 ? numPages : page} of {numPages}
              </p>
              <Button as={Col} onClick={handlePrevClick}>
                Previous Page
              </Button>
              <Button as={Col} onClick={handleNextClick}>
                Next Page
              </Button>
            </Row>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default App;
