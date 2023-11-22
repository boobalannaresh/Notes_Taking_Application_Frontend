import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { API } from "./config";
import parse from 'html-react-parser';

export function Viewnote() {
  const { id } = useParams();

  const [note, setNote] = useState([])

  useEffect(()=>{
    fetch(`${API}/notes/${id}`,{
      method:"GET",
      headers:{"Authentication" : localStorage.getItem("token")}
    })
    .then((data)=> data.json())
    .then((nts)=> setNote(nts))
  })

  const navigate = useNavigate() 
  return (

      <div className="movie-detail-container">
        <div className="movie-spec">
          <h2 className="movie-name">Title : {note.title}</h2>
          <h4 className="movie-rating"> Date : {note.date}</h4>
        </div>

        <div className="movie-description">{parse(note.note)}</div>

        <Button variant="contained" startIcon={<ArrowBackIosIcon />} onClick={()=> navigate(-1)}>Back</Button>
      </div>

     

  );
}

