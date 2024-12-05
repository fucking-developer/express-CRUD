const express = require("express");
const path = require("path");

const app = express();

// Servir todos los archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, "public")));

// Ruta para servir la página principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

// Iniciar el servidor
app.listen(5000, () => {
  console.log("Listening on port 5000");
});
