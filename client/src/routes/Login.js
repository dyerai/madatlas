import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { loginUser } from "../features/users/usersSlice";
import { useDispatch } from "react-redux";


export default function Login() {
  const [showErr, setShowErr] = useState(false);
  const dispatch = useDispatch();

  const handleSuccess = async (response) => {
    fetch("/api/login/", {
      method: "POST",
      body: JSON.stringify({ token: response.credential }),
      headers: {
        "Content-type": "application/json"
      },
    })
      .then((res) => {
        if (res.status === 511) throw new Error("Not a student");
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setShowErr(false);
        dispatch(loginUser({name:res.name, email:res.email}));
        localStorage.setItem('user', JSON.stringify({name: res.name, email: res.email}));
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
        if (e.message === "Not a student") setShowErr(true);
      });
  };

  const handleFailure = (error) => {
    console.log(error);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  const clientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <GoogleOAuthProvider clientId={clientID} onScriptLoadError={handleFailure}>
        {user !== null 
          ? <Button onClick={handleLogout}>Logout</Button> 
          : <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
        }
        
        {showErr ? (
          <Alert variant="danger">Please use your @wisc.edu email to sign in</Alert>
        ) : (
          <></>
        )}
    </GoogleOAuthProvider>
  );
}
