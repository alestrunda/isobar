import { useState } from "react";
import { API_URL } from "../settings";

const useLogin = (
  onSetToken: (token: string) => void
): [string, boolean, (password: string) => void] => {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const login = (password: string) => {
    fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.token) onSetToken(data.token);
        else setError(data.message);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  return [error, isLoading, login];
};

export default useLogin;
