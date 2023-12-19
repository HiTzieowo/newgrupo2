// Requerimos express y guardamos la ejecución del método Router, que usaremos en el archivo.
const express = require("express");
const router = express.Router(); // Router con R mayuscula
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/img/imagenes-usuarios")
    },
    filename: function (req, file, cb) {
        cb(null, "user-" + Date.now() + path.extname(file.originalname))
    },
});

const upload = multer( { storage } );

// Importamos el controlador de las rutas por defecto
const usuariosController = require("../controllers/usuariosController.js");
const guestMiddleware = require("../middleware/guestMiddleware.js")
const authMiddleware = require("../middleware/authMiddleware.js")

// En vez de app.get, utilizamos router.get. Esto va "guardando" en router las distintas rutas, que luego exportamos

//validaciones
const validations = require('../middleware/validationsMiddleware.js')


// Procesa el pedido get con ruta /

router.get("/register", guestMiddleware, usuariosController.registro);
router.post("/register",  upload.single('imgPerfil'), validations,usuariosController.registroCompleto);

router.get("/inicioDeSesion",  guestMiddleware, usuariosController.inicioDeSesion);
router.post("/inicioDeSesion", usuariosController.procesoSesion);

router.get("/user", authMiddleware, usuariosController.users);
router.get("/logOut", usuariosController.logOut)


// Exportamos la variable router ya con todas las rutas "guardadas", que se usará en app.js
module.exports = router;