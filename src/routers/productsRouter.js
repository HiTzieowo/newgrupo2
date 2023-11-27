// Requerimos express y guardamos la ejecución del método Router, que usaremos en el archivo.
const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/img/productos")
    },
    filename: function (req, file, cb) {
        cb(null, "product-" + Date.now() + path.extname(file.originalname))
    },
});

const upload = multer({ storage });

// Importamos el controlador de las rutas por defecto
const productsController = require("../controllers/productsController")


// Procesa el pedido get con ruta /
router.get('/producto/:id/', productsController.productoDetalle);

router.get("/crear/", productsController.crear);
router.post("/crear/", upload.single("image"), productsController.procesoCrear);

router.delete("/eliminar/:id", productsController.eliminar);

router.get("/editar/:id", productsController.editar); 
router.put("/editar/:id", upload.single("image"), productsController.procesoEditar)
// Exportamos la variable router ya con todas las rutas "guardadas", que se usará en app.js
module.exports = router;