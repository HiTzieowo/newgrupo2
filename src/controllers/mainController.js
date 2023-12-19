// Requerimos path para poder enviar los archivos HTML
const fs= require("fs")
const path = require("path");

/* const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
 */

const db = require('../database/models')
// Creamos el objeto literal con los métodos a exportar
const mainController = {

    // Manejo del pedido get con ruta
    index: (req, res) => {
        db.Productos.findAll()
        .then((products) => {
            res.render("inicio", {products: products})
        })
    },
    biblioteca: (req, res) => {
        db.Productos.findAll()
        .then((products) => {
            res.render("biblioteca", {products: products})
        })
    },
    listaDeDeseos: (req, res) => {
        // comunicarse con el modelo, conseguir información
        res.render("listaDeDeseos")
    },
    carrito: (req, res) => {
        // comunicarse con el modelo, conseguir información
        res.render("carrito")
    },  
}

// Exportamos el objeto literal con los distintos métodos, que se usará en el enrutador por defecto
module.exports = mainController;