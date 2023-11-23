import React, { useState, useEffect } from "react";
// import { User } from "./User";
// import TextField from "@mui/material/TextField";
// import Button from '@mui/material/Button';
import { Note } from "./Note";
// import { AddMovie } from "./AddMovie";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import { API } from "./config";

export function Allnotes() {
  const [notes, setNotes] = useState([]);
  console.log(notes)

  const getNotes = () => {
    fetch(`${API}/notes/own/${localStorage.getItem("email")}`, {
      method: "GET",
       headers: { "Authentication": localStorage.getItem("token") }
    })
      .then((data) => data.json())
      .then((nts) => setNotes(nts));
  };

  useEffect(() => getNotes(), []); //// => This is happening Auto Refresh

  const deleteNote = (id) => {

    try{
      let ask= window.confirm("Are you deleteing this file ? 👋🤔");
      if(ask){
        fetch(`${API}/notes/${id}`, {
          method: "DELETE",
          headers: { "Authentication": localStorage.getItem("token") }
        })
        .then((data) => getNotes());
        console.log("Deleting Movie", id);
      }
  }catch (error){
     console.log(error)
  }

    
  };


  const navigate = useNavigate()
  return (
    <div>
      <div className="movie-list">
        {notes.map((store) => (
          <div key={store._id}>

            <Note
              _id={store._id}
              title={store.title}
              date={store.date}
              note={store.note}
              
              deleteButton={
                <IconButton
                sx={{marginLeft:"auto"}}
                  aria-label="delete"
                  color="error"
                  onClick={() => deleteNote(store._id)}
                >
                  <DeleteIcon  />
                </IconButton>
              }

              editButton={
                <IconButton
                sx={{marginLeft:"auto"}}
                  aria-label="edit"
                  color="secondary" 
                  onClick={()=> navigate(`/portal/edit/${store._id}`)}
                >
                  <EditIcon />
                </IconButton>
              }
            />
            
          </div>
        ))}
      </div>
    </div>
  );
}

