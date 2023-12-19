const db = require("../database/models");

const productsController = {
    'productoDetalle': (req, res) => {
        let id = req.params.id      //guardamos el id por parametro
        db.Productos.findByPk(id)   //usamos el id por parametro para usar en la base de datos
        .then((product) => {
            res.render("producto", {product: product})
        })
    },

    'crear': (req, res) => {
        res.render("crear")
    },

    'procesoCrear': (req, res) => {
        db.Productos.create({       //usamos el metodo create de sequelize para crear un nuevo producto
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            history: req.body.history,
            description: req.body.description,
            cover: req.file.filename
        })
        .then(() => {
            res.redirect("/");
        })
    },

    'editar': (req, res) => {
        id = req.params.id;
        db.Productos.findByPk(id)
        .then((product) => {
            res.render("editar", {productToEdit: product}); //enviamos los datos como espera el archivo ejs con los datos que tenemos en la bd
        })
    },

    'procesoEditar': (req, res) => {
        db.Productos.update({       //usamos el metodo update de sequelize para editar o actualizar los datos
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            history: req.body.history,
            description: req.body.description,
            cover: req.file.filename
        }, {    
            where: {id: req.params.id} //importante agregar el where para editar el producto correcto, si no se agrega se va a actualizar todos los productos de la base de datos
        })

        .then(() => {
            res.redirect("/");
        })
    },

    'eliminar': (req, res) => {
        let productId= req.params.id;
        db.Productos.destroy({
            where: {id: productId}
        })
        .then(() => {
            res.redirect("/")
        })
    }
}

module.exports = productsController