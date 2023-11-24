import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Note.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

const Note = (props) => {
  const urlDelApi = "http://localhost/dashboard/apiDB.php/records";
  const [formData, setFormData] = useState({
    UserID: props.note.UserID || "",
    Title: props.note.Title || "",
    Content: props.note.Content || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditClick = () => {
    editNoteToDB();
  };

  const editNoteToDB = () => {
    axios
      .put(`${urlDelApi}/notes/${props.note.NoteID}`, formData)
      .then(function (response) {
        callAPINotes();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const callAPINotes = () => {
    axios
      .get(`${urlDelApi}/notes`)
      .then(function (response) {
        console.log(response);
        console.log(response.data.records);
        console.log(response.statusText);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="Note" data-testid="Note">
      <TextField
        id="outlined-basic"
        name="Title"
        defaultValue={formData.Title}
        onChange={handleChange}
        variant="standard"
      />
      <TextField
        id="outlined-basic"
        name="Content"
        defaultValue={formData.Content}
        onChange={handleChange}
        variant="standard"
      />
      <br />
      <Button color="secondary" variant="text" onClick={handleEditClick}>
        Editar nota
      </Button>
    </div>
  );
};

Note.propTypes = {
  note: PropTypes.shape({
    NoteID: PropTypes.number.isRequired,
    UserID: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Content: PropTypes.string.isRequired,
  }).isRequired,
};

export default Note;
