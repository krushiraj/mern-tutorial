import React, { useState, useContext } from "react";

import PageContainer from "../components/PageContainer";
import UserForm from "../components/UserForm";
import ErrorMessage from "../components/ErrorMessage";
import Button from "../components/Button";
import UserContext from "../contexts/user";

const ProfilePage = () => {
  const [user, setUser] = useContext(UserContext);
  const [username, setUsername] = useState(user?.username || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!password && username === user.username) {
      setError("Please enter a new password or a new username");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": user.token,
        },
        body: JSON.stringify({
          username: password && username === user.username ? "" : username,
          password,
          id: user.id,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      const updatedUser = { ...user, username: data.user.username };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setPassword("");
      alert("Profile updated successfully");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": user.token,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      localStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <PageContainer pageName="Profile">
      <div className="form-container">
        <h1>Update Profile</h1>
        <ErrorMessage errorMsg={error} />
        <UserForm
          onSubmit={handleSubmit}
          action="Update"
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "flex-start",
            width: "100%",
            marginTop: "1rem",
          }}
        >
          <Button
            onClick={handleDelete}
            style={{
              backgroundColor: "red",
              fontSize: "1.2rem",
              innerHeight: "1.5rem",
            }}
          >
            Delete User
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default ProfilePage;
