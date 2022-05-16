import { Container, Row } from "react-bootstrap"

export default function CoursePage({ course }) {
    if (course != null) {
        return (
            <div>
                <Row style={{background: "#eee"}}>
                    <h3>{course.abbrev} - {course.name}</h3>
                </Row>
                
                <h3>{course.credits.join('-')} {course.credits[0] === 1 && course.credits.length === 1 ? "credit" : "credits"}</h3>
                <p>{course.description}</p>
            </div>
        );
    }
    else {
        return (<></>);
    }
}