import React, { useState } from "react";
import { useRoutes } from "react-router-dom";

import "./styles/index.css";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ProfilePage from "./pages/Profile";
import ListsPage from "./pages/Lists";
import TodosPage from "./pages/Todos";
import UserContext from "./contexts/user";

function Routes() {
  const routes = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignupPage /> },
    { path: "/profile", element: <ProfilePage /> },
    { path: "/lists", element: <ListsPage /> },
    { path: "/list/:id", element: <TodosPage /> },
  ]);
  return routes;
}

function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    try {
      const userFromStorage = JSON.parse(localStorage.getItem("user"));
      if (userFromStorage) {
        setUser(userFromStorage);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Routes />
    </UserContext.Provider>
  );
}

export default App;
