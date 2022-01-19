import { useLocation } from "react-router-dom";

export default function ClassPage(props) {
    const location = useLocation();
    const { abbrev, name, description } = location.state;
    return (
        <div>
            <h3>{abbrev} - {name}</h3>
            <p>{description}</p>
        </div>
    );
}