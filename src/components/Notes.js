import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from './AddNote';
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  const {notes, getNotes, editNote} = context;
  const navigate = useNavigate()
  const [note, setNote] = useState({id: "" ,etitle: "", edescription: "", etag: "Ram"})
  useEffect(()=> {
    if(localStorage.getItem("token")){
      getNotes()
    } else {
      navigate("/login")
    }
     // eslint-disable-next-line
  }, [])
  const ref = useRef(null)
  const refClose = useRef(null)
  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({id: currentNote._id ,etitle: currentNote.title, edescription: currentNote.description})
    
  }

  const handleClick = (e)=>{
    editNote(note.id, note.etitle, note.edescription)
    refClose.current.click()
    props.showAlert("Updated Successfully", "success");
    
  }
  const onchange = (e)=>{
   setNote({...note, [e.target.name]: e.target.value})
  }
  return (
    <>
     <AddNote showAlert={props.showAlert}/>
    <button type="button"  ref={ref}  className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade"id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
          <div className="mb-3 my-3">
            <label htmlFor="etitle" className="form-label">
             Edit Title
            </label>
            <input
              type="text"
              className="form-control"
              id="etitle"
              name="etitle"
              aria-describedby="emailHelp"
              onChange={onchange}
              value={note.etitle}
            />
           
          </div>
          <div className="mb-3">
            <label htmlFor="edescription" className="form-label">
             Edit Description
            </label>
            <input
              type="etext"
              className="form-control"
              id="edescription"
              name="edescription"
              onChange={onchange}
              value={note.edescription}
            />
          </div>
          
          </form>
      </div>
      <div className="modal-footer">
      <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<3 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>
     
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container">
        {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>;
        })}
      </div>
    </>
  );
};

export default Notes;
