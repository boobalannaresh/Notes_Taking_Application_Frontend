// import { Counter } from "./Counter";
import React, {useState} from "react";
import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';


export function Note({ title, date, note, _id, deleteButton, editButton }) {

    const roleId = localStorage.getItem("roleId")
  
    const ROLE_ID = {
    Admin:"0",
    NORAML_USER: "1"
  }
  
    const [show, setShow] = useState(true)
  
  
    const navigate = useNavigate()
  
//   // Your HTML string
// var htmlString = note;

// // The string you want to remove
// var stringToRemove = 'string';

// // Create a regular expression with the string to remove
// var regex = new RegExp(stringToRemove, 'g');

// // Replace the string with an empty string
// var modifiedHtmlString = htmlString.replace(regex, '');

    return (
      <Card className="profile-container">
        <h3 className="profile-pic">{title}</h3>
  
        <CardContent >
        <div className="profile-spec">
          <h5 className="profile-title">Date: {date} </h5>
          <IconButton aria-label="Toggle Description" onClick={()=> setShow(!show)} color="primary">
          {  show ? <ExpandLessIcon fontSize="large"/> : < ExpandMoreIcon fontSize="large" /> }
          </IconButton> 
  
          <IconButton aria-label="Info" 
          onClick={()=> navigate(`/portal/view/${_id}`) }>
          <InfoIcon fontSize="medium" />
          </IconButton>
  
        </div>
  
        {/* This is Conditional Rendering */}
        <div className="show-note">
        { show ? note : null }
        </div>
        
        </CardContent>
  
        <CardActions>    
        {editButton}   {deleteButton}
        </CardActions>
  
      </Card>
    );
  }