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

// function App() {
//   const [user, setUser] = useState(null);

//   if (!user) {
//     try {
//       const userFromStorage = JSON.parse(localStorage.getItem("user"));
//       if (userFromStorage) {
//         setUser(userFromStorage);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   return (
//     <UserContext.Provider value={[user, setUser]}>
//       <Routes />
//     </UserContext.Provider>
//   );
// }

const App = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundColor: "greenyellow",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          textAlign: "center",
          backgroundColor: "cyan",
          height: "33vh",
        }}
      >
        <p style={{ margin: 'auto' }} >1</p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          textAlign: "center",
          backgroundColor: "magenta",
          height: "33vh",
        }}
      >
        <p style={{ margin: 'auto' }}>2</p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          textAlign: "center",
          backgroundColor: "#feea23",
          height: "33vh",
        }}
      >
        <p style={{ margin: 'auto' }}>3</p>
      </div>
    </div>
  );
};

export default App;
