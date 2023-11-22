import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";


function AddNote() {
  const context = useContext(noteContext);
  const {addNote} = context;

  const [note, setNotes] = useState({title: "", description: "", tag: "Ram"})

  const handleClick = (e)=>{
    e.preventDefault();
      addNote(note.title, note.description, note.tag);
      setNotes({title: "", description: "", tag: "Ram"})
  }
  const onchange = (e)=>{
   setNotes({...note, [e.target.name]: e.target.value})
  }
  return (
    <div>
        <h1>Add a Note</h1>
        <form>
          <div className="mb-3 my-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onchange}
              minLength={3}
              required
              value={note.title}
              />
           
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onchange}
              minLength={5}
              required
              value={note.description}
            />
          </div>
          
          <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>
    </div>

  )
}

export default AddNote