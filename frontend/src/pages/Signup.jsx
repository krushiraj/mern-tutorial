import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import PageContainer from "../components/PageContainer";
import ErrorMessage from "../components/ErrorMessage";
import UserForm from "../components/UserForm";

import UserContext from "../contexts/user";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const context = useContext(UserContext);
  const [user, setUser] = context;
  const history = useNavigate();

  const handleSignup = async () => {
    if (!username || !password || !repeatPassword) {
      setErrorMsg("All fields are required");
    } else if (password !== repeatPassword) {
      setErrorMsg("Passwords do not match");
    } else {
      try {
        const response = await fetch("http://localhost:8000/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);

        // navigator
        history("/lists");
      } catch (error) {
        setErrorMsg(error.message);
      }
    }
  };

  return (
    <PageContainer pageName="Sign Up">
      <div className="form-container">
        <h1>Signup</h1>
        {user ? (
          <p>Logged in as {user.username}</p>
        ) : (
          <>
            <ErrorMessage errorMsg={errorMsg} />
            <UserForm
              onSubmit={handleSignup}
              action="Sign Up"
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              repeatPassword={repeatPassword}
              setRepeatPassword={setRepeatPassword}
            />
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </>
        )}
      </div>
    </PageContainer>
  );
};

export default SignupPage;
