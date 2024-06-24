//iniciar el servidor
const express = require("express");
const db = require("./db");

//Creamos el servidor
const app = express();

//Utilizamos Middlewares
app.use(express.text());
app.use(express.json());

//Creamos las rutas
//Pagina de Inicio
app.get("/", (req, res) => {
  res.send("Pagina de Inicio");
});

//Obtenemos todos los usuarios
app.get("/user", (req, res) => {
  res.json(db);
});

//Obtenemos usuario por id
app.get("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const getUser = db.find((user) => user.id === id);
  //console.log(getUser);
  res.json(getUser);
});

//Crear un usuario
app.post("/user", (req, res) => {
  const { id, User } = req.body;

  const newUser = db.push({ id: id, User: User });
  console.log(newUser);
  res.json({ message: "Usuario creado con éxito" });
});

//Editar el nombre del usuaro
app.put("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { User } = req.body;

  const getUser = db.find((user) => user.id === id);

  getUser.User = User;
  console.log(getUser);

  res.json({ message: "Usuario actualizado" });
});

//Eliminar Usuario
app.delete("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const getUser = db.find((user) => user.id === id);
  const userIndex = db.indexOf(getUser);
  const deletedUser = db.splice(userIndex, 1);

  res.json({ message: "Usuario eliminado", deletedUser });
});

//Corremos el servidor en el puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`servidor en puerto ${PORT}`));
