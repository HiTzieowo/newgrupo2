// Requerimos express y guardamos la ejecución del método Router, que usaremos en el archivo.
const express = require("express");
const router = express.Router();
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/products")
    },
    filename: function (req, file, cb) {
        cb(null, "product-" + Date.now() + path.extname(file.originalname))
        //        product-542563573.jpg
    },
});

const upload = multer({storage: storage});

// Importamos el controlador de las rutas por defecto
const productsController = require("../controllers/productsController")

// En vez de app.get, utilizamos router.get. Esto va "guardando" en router las distintas rutas, que luego exportamos

// Procesa el pedido get con ruta /
router.get('/producto/:id/', productsController.productoDetalle);

router.get("/cargaDeProducto", productsController.productocarga);

router.get("/edicionDeProducto", productsController.productoedicion); 

// Exportamos la variable router ya con todas las rutas "guardadas", que se usará en app.js
module.exports = router;