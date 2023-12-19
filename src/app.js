// Requerir los paquetes que vamos a utilizar
const express = require("express");
const path = require("path")
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');
const bcrypt = require('bcryptjs')

// Importamos los distintos enrutadores
const mainRouter = require("./routers/mainRouter.js")
const productsController = require("./routers/productsRouter.js")
const usuariosController = require("./routers/usuariosRouter.js");

//middlewares
const userLoggedMiddleware = require("./middleware/userLoggedMiddleware.js");


// Usando recursos estáticos.
app.use(express.static(path.join(__dirname, "../public"))); //carpeta estatica
app.use(express.urlencoded({ extended: false })); // Para poder interpretar lo que llega desde el body
app.use(express.json());  // Para poder interpretar lo que llega desde el body
app.use(methodOverride('_method'));
app.use(session({ 
    secret: "funcionando en secreto xd",
    resave: false,
    saveUninitialized: false,
}));
app.use(cookies());
app.use(userLoggedMiddleware); //va despues de app.use(session) porque sino dara falso siempre al no tener user

//      Template Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"))

// Usando los enrutadores importados
app.use("/", mainRouter);

app.use("/", productsController);

app.use("/", usuariosController);



// Ponemos a escuchar el servidor
app.listen(3061, () => {
    console.log("Servidor corriendo en http://localhost:3061")
});

