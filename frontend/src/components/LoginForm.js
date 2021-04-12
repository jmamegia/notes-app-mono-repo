import React, { useState } from "react";
import session from "../services/session";
import noteService from "../services/notes";
import Toggler from "../components/Toggler";

const LoginForm = ({ setErrorMessage, setUser }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const credentials = await session.login(userName, password);
      setUser(credentials);
      noteService.setToken(credentials.token);
      window.localStorage.setItem(
        "loggedNoteAppUser",
        JSON.stringify(credentials)
      );
    } catch (e) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  return (
    <Toggler>
      <div>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={userName}
            name="username"
            placeholder="username"
            onChange={({ target }) => setUserName(target.value)}
          />
          <input
            type="password"
            value={password}
            name="password"
            placeholder="password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <button>Send</button>
        </form>
      </div>
    </Toggler>
  );
};

export default LoginForm;
