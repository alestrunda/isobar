import React, { useContext, useState } from "react";
import useLogin from "../hooks/useLogin";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const userContext = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [error, isLoading, triggerLogin] = useLogin(userContext.setApiToken);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value.trim());
  };

  const handleSubmit = () => {
    triggerLogin(password);
  };

  return (
    <div className="page">
      <div className="container">
        <div className="form-group spinner-container">
          <input
            id="password"
            type="password"
            className="form-control"
            placeholder="API password"
            onChange={handleChange}
            value={password}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button
          className="btn btn-primary"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Login;
