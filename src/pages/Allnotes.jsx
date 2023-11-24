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

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';


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
       <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', margin:'7px auto' ,alignItems: 'center', width: 600 }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Google Maps"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <DirectionsIcon />
      </IconButton>
    </Paper>

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

