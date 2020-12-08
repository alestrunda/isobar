import React, { useContext } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { UserContext } from "./context/UserContext";

function App() {
  const userContext = useContext(UserContext);

  return userContext.apiToken ? <Home /> : <Login />;
}

export default App;
