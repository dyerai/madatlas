/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import CourseSearch from "./components/CourseSearch";
import "bootstrap/dist/css/bootstrap.min.css";
import CourseList from "./components/CourseList";

function App() {
  const [page, setPage] = React.useState(1);
  const [numPages, setNumPages] = React.useState(0);
  const [courses, setCourses] = React.useState(null);
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
    },
  };
  const [payload, setPayload] = React.useState(defaultPayload);

  const getPayload = (payloadData) => {
    setPayload(payloadData);
  };

  React.useEffect(() => {
    fetch("/api/getNumCourses")
      .then((res) => res.json())
      .then((result) => setNumPages(Math.ceil(result["COUNT(*)"] / 50)));
  }, []);

  React.useEffect(() => {
    setPage(1);
    isNewQuery ? setIsNewQuery(false) : setIsNewQuery(true);
  }, [payload]);

  // TODO: fix pagination lagging
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
    <div style={{ overflow: "hidden" }}>
      <Row>
        <Col className="ms-3">
          <CourseSearch setPayload={getPayload} />
        </Col>
        <Col>
          <Row>
            <CourseList courses={courses} page={page} numPages={numPages} />
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
  );
}

export default App;
