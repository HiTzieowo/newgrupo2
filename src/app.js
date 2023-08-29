// Requerir los paquetes que vamos a utilizar
const express = require("express");
const path = require("path")
const app = express();





    // Importamos los distintos enrutadores
    const mainRouter = require("./routers/mainRouter.js")

    const productsController = require("./routers/productsRouter.js")

    const usuariosController = require("./routers/usuariosRouter.js")
   

    // Usando recursos estáticos.
    app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({extended: false})); // Para poder interpretar lo que llega desde el body
app.use(express.json());  // Para poder interpretar lo que llega desde el body

//      Template Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"))

// Usando los enrutadores importados
app.use("/", mainRouter);

app.use("/", productsController);

app.use("/", usuariosController);



// Ponemos a escuchar el servidor
app.listen(3060, () => {
    console.log("Servidor corriendo en http://localhost:3060")
});







