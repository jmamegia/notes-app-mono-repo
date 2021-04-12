import React, { useState, useEffect } from "react";
import Note from "./components/Note";
import Notification from "./components/Notification";
import noteService from "./services/notes";
import LoginForm from "./components/LoginForm";
import NewNoteForm from "./components/NewNoteForm";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUser = JSON.parse(
      window.localStorage.getItem("loggedNoteAppUser")
    );
    if (loggedUser) {
      setUser(loggedUser);
      noteService.setToken(loggedUser.token);
    }
  }, []);

  const handleLogOut = () => {
    setUser(null);
    noteService.setToken(null);
    window.localStorage.removeItem("loggedNoteAppUser");
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <Notification message={errorMessage} />

      {user ? (
        <div>
          {user.userName}
          <button onClick={handleLogOut}>LogOut</button>
        </div>
      ) : (
        <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} />
      )}
      <div>
        <NewNoteForm notes={notes} setNotes={setNotes}></NewNoteForm>
        <h1>Notes</h1>
        <div>
          <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? "important" : "all"}
          </button>
        </div>
        <ul>
          {notesToShow.map((note, i) => (
            <Note
              key={i}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
