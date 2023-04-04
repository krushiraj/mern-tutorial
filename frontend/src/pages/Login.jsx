import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import PageContainer from "../components/PageContainer";
import UserForm from "../components/UserForm";
import ErrorMessage from "../components/ErrorMessage";

import UserContext from "../contexts/user";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const [user, setUser] = useContext(UserContext);

  const history = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8000/user/signin", {
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
      history("/lists");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <PageContainer pageName="Login">
      <div className="form-container">
        <h1>Login to TODO++</h1>
        <ErrorMessage errorMsg={error} />
        {!user ? (
          <>
            <UserForm
              onSubmit={handleSubmit}
              action="Login"
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
            />

            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </>
        ) : (
          <p>You are already logged in</p>
        )}
      </div>
    </PageContainer>
  );
};

export default LoginPage;
