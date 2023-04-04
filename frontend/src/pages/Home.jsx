import React, { useContext } from "react";
import { Link } from "react-router-dom";

import UserContext from "../contexts/user";

import PageContainer from "../components/PageContainer";

const HomePage = () => {
  const [user] = useContext(UserContext);
  return (
    <PageContainer pageName="Home">
      <h2>A simple and effective way to manage your tasks</h2>
      <p>
        Welcome to TODO++, your ultimate todo app! With TODO++, you can keep
        track of all your tasks and get things doneCount more efficiently. Whether
        you're managing a personal project or working on a team, TODO++ is here
        to help.
      </p>

      <p>
        With our simple and intuitive interface, you can easily create and
        manage multiple todo lists, each with its own set of tasks. You can set
        due dates and reminders, mark tasks as complete, and even prioritize
        tasks based on their importance.
      </p>

      <p>
        Plus, with our user-friendly signup and login process, you can get
        started in no time. So what are you waiting for? Sign up today and start
        getting things doneCount with TODO++!
      </p>
      {!user ? (
        <div className="button-container">
          <Link to="/login" className="button-fill">
            Log In
          </Link>
          <Link to="/signup" className="button-fill">
            Sign Up
          </Link>
        </div>
      ) : (
        <Link to="/lists" className="button-fill">
          Go to Lists
        </Link>
      )}
    </PageContainer>
  );
};

export default HomePage;
