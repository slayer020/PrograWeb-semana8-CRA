import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./home.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import axios from "axios";
import User from "../User/User";
import Note from "../Note/Note";

const Home = () => {
  const [data, setData] = useState("Ejemplo React, estados y llamados a API");
  const [users, setUsers] = useState();
  const [notes, setNotes] = useState([]);
  const urlDelApi = "http://localhost/dashboard/apiDB.php/records";
  const mockUser = {
    usuario: "admin",
    password: "admin",
  };
  const mockUsers = [
    {
      UserID: 1,
      Username: "user1",
      Password: "password1",
      Email: "user1@example.com",
      CreatedAt: "2023-10-10 15:56:41",
    },
    {
      UserID: 2,
      Username: "user2",
      Password: "password2",
      Email: "user2@example.com",
      CreatedAt: "2023-10-10 15:56:41",
    },
  ];
  const mockNotes = [
    {
      NoteID: 1,
      UserID: 1,
      Title: "ToDo 1",
      Content: "This is the content of ToDo 1 for user 1.",
      CreatedAt: "2023-10-10 15:56:41",
    },
    {
      NoteID: 2,
      UserID: 1,
      Title: "ToDo 2",
      Content: "This is the content of ToDo 2 for user 1.",
      CreatedAt: "2023-10-10 15:56:41",
    },
    {
      NoteID: 3,
      UserID: 2,
      Title: "Task 1",
      Content: "This is the content of Task 1 for user 2.",
      CreatedAt: "2023-10-10 15:56:41",
    },
  ];

  const [formValues, setFormValues] = useState({
    usuario: "",
    password: "",
  });

  const onClickBtn = () => {
    console.log("click", formValues);
    if (
      mockUser.usuario === formValues.usuario &&
      mockUser.password === formValues.password
    ) {
      console.log("Usuario correcto");
    } else {
      console.log("Usuario incorrecto");
    }
  };

  const onChancheInput = (event) => {
    const { name, value } = event.target;
    console.log(event);
    console.log(name);
    console.log(value);
    setFormValues({ ...formValues, [name]: value });
  };

  const callAPINotes = () => {
    axios
      .get(`${urlDelApi}/Notes`)
      .then(function (response) {
        console.log(response);
        console.log(response.data.records);
        console.log(response.statusText);
        setNotes(response.data.records);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const callAPMockNotes = () => {
    setNotes(mockNotes);
  };

  const clearNotes = () => {
    setNotes([]);
  };

  const callAPIAuthenticate = () => {
    axios
      .get(
        `${urlDelApi}/Users?filter=Username,eq,${formValues.usuario}&filter=Password,eq,${formValues.password}`
      )
      .then(function (response) {
        console.log("data", response.data.records);
        setUsers(response.data.records);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [formData, setFormData] = useState({
    UserID: "",
    Title: "",
    Content: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const insertNoteToDB2 = () => {
    axios
      .post(`${urlDelApi}/notes`, formData)
      .then(function (response) {
        callAPINotes();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    insertNoteToDB2();
  };

  const insertNoteToDB = () => {
    axios
      .post(`${urlDelApi}/notes`, {
        UserID: 2,
        Title: "Task 1",
        Content: "This is the content of Task 1 for user 2.",
        CreatedAt: "2023-10-10 15:56:41",
      })
      .then(function (response) {
        callAPINotes();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={styles.Home}>
      <h1>{data}</h1>
      <Grid
        container
        spacing={2}
        style={{
          inset: 0,
          margin: "auto",
          textAlign: "center",
          maxWidth: "80%",
        }}
      >
        <Grid item xs={12}>
          <h1>Autenticación básica</h1>
          <TextField
            id="outlined-basic"
            name="usuario"
            label="Outlined"
            onChange={onChancheInput}
            variant="standard"
          />
          <TextField
            id="outlined-basic"
            name="password"
            type="password"
            onChange={onChancheInput}
            label="Outlined"
            variant="standard"
          />
          <br />
          <br />
          <Button onClick={callAPIAuthenticate} variant="contained">
            Autenticar
          </Button>
        </Grid>
        <Grid item xs={6}>
          <h2>Llamar API y base de datos</h2>
          <p>Este botón hace un llamado a la base de datos previamente configurada</p>
          <Grid item xs={3} style={{}}>
            <form onSubmit={handleSubmit}>
              <Button type="submit" variant="contained" sx={{ mx: 2 }}>
                Insertar nota API
              </Button>
              <label>
                UserID:
                <input
                  type="text"
                  name="UserID"
                  value={formData.UserID}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Título:
                <input
                  type="text"
                  name="Title"
                  value={formData.Title}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Contenido:
                <textarea
                  name="Content"
                  value={formData.Content}
                  onChange={handleChange}
                />
              </label>
              <br />
            </form>
          </Grid>
          <Button onClick={callAPINotes} variant="contained" sx={{ mx: 2 }}>
            Llamar API
            <br></br>
            <br></br>
          </Button>
          <Button onClick={clearNotes} color="secondary" variant="text">
            Limpiar
          </Button>
        </Grid>
        <Grid item xs={6} style={{}}>
          <h2>Llamar Local y base de datos</h2>
          <p>Este botón hace un llamado al arreglo MockNotes definido previamente</p>
          <Button onClick={callAPMockNotes} variant="contained" sx={{ mx: 2 }}>
            Llamar Local
          </Button>
          <Button onClick={insertNoteToDB} variant="contained" sx={{ mx: 2 }}>
            Insertar nota
          </Button>
          <Button onClick={clearNotes} color="secondary" variant="text">
            Limpiar
          </Button>
        </Grid>
        <Grid item xs={12}>
          <p>
            Como pueden ver, mientras la estructura de datos sea igual, se pueden simular o hacer un "Mock" de los datos
            que se obtienen de una base
          </p>
        </Grid>
      </Grid>
      <Card id="card-home" className={styles["card-home"]}>
        {console.log("por aca ando")}
        <Grid container spacing={2}>
          {notes.map((nota, index) => (
            <Grid item xs={4} key={index}>
              <Note titulo="titulo" note={nota} />
            </Grid>
          ))}
        </Grid>
      </Card>
    </div>
  );
};

Home.propTypes = {};
Home.defaultProps = {};

export default Home;