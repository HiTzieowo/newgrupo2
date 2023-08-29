// Requerimos path para poder enviar los archivos HTML
const fs= require("fs")
const path = require("path");

// Creamos el objeto literal con los métodos a exportar
const mainController = {

    // Manejo del pedido get con ruta
    index: (req, res) => {
        // comunicarse con el modelo, conseguir información
        res.render("inicio")
    },
    biblioteca: (req, res) => {
        // comunicarse con el modelo, conseguir información
        res.render("biblioteca")
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