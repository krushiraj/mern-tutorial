import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "./index.css";
import ProfilePic from "../../assets/img/profile.png";

import Button from "../Button";

import UserContext from "../../contexts/user";

const PageContainer = ({ children, pageName = "" }) => {
  // This component is used to wrap all the pages in the app
  // It is used to add a common header and footer to all the pages
  // header should have the app name and a placeholder display name for current route in the left
  // on the right of the header, there should be a profile pic with username, beside that a logout button if logged in
  // else nothing
  // footer should have a link to the github repo, copyright and a short description of the app

  const [user, setUser] = useContext(UserContext);
  const handleLogout = (e) => {
    e.preventDefault();
    setUser(null);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="app-title">
          <Link style={{ color: "black" }} to="/">
            <h1>TODO++</h1>
          </Link>
        </div>
        <div className="app-page-name">
          <h2>{pageName}</h2>
        </div>
        <div className="user-info">
          {user && (
            <>
              <Link
                style={{ display: "flex", flexDirection: "row" }}
                to="/profile"
              >
                <div className="user-profile-pic">
                  <img src={ProfilePic} alt="user profile pic" />
                </div>
                <div className="user-name">{user.username}</div>
              </Link>
              <Button
                fill={false}
                style={{ border: "1px solid red", color: "red" }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="page-content">{children}</div>
      <div className="page-footer">
        <div className="footer-text">
          <p>
            A simple todo app to help you manage your tasks. Sign up, login and
            manage all your TODOs with TODO++. Built with React, Node, Express
            and MongoDB.
          </p>
          <p>&copy; 2023 Krushi Raj Tula</p>
        </div>
        <div className="footer-links">
          {/* open links in new tab */}
          <Link target="_blank" to="https://www.github.com/krushiraj/">
            Github
          </Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </div>
  );
};

export default PageContainer;
