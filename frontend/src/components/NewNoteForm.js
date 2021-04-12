import React, { useState, useRef } from "react";
import noteService from "../services/notes";
import Toggler from "./Toggler";

const NewNoteForm = ({ setNotes, notes }) => {
  const [newNote, setNewNote] = useState("");
  const togglerRef = useRef();
  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    };
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
      togglerRef.current.toggleVisibility();
    });
  };
  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  return (
    <Toggler ref={togglerRef}>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </Toggler>
  );
};

export default NewNoteForm;
