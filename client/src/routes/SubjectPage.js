import React from "react";
import { ListGroup } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

export default function SubjectPage() {
  const location = useLocation();
  const { abbrev, name, id } = location.state;
  const [classes, setClasses] = React.useState(null);

  React.useEffect(() => {
    fetch(`/api/getClasses/${id}`)
      .then((res) => res.json())
      .then((result) => setClasses(result));
  });

  return (
    <div>
      <h3>
        {abbrev} - {name}
      </h3>
      <ulp>
        {classes?.map((c, key) => {
          return (
            <li>
            <Link
              to={"/class"}
              state={{
                abbrev: c.abbrev,
                name: c.name,
                description: c.description,
              }}
            >
              {c.abbrev + " - " + c.name}
            </Link>
            </li>
          );
        })}
      </ulp>
    </div>
  );
}
