// Requerimos path para poder enviar los archivos HTML
const fs= require("fs")
const path = require("path");
/* const { READUNCOMMITTED } = require("sequelize/types/table-hints"); */

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

// Creamos el objeto literal con los métodos a exportar
const productsController = {

    index: (req, res) => {
		// Do the magic
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		res.render("biblioteca", {products: products});
	},

    // Manejo del pedido get con ruta
    productoDetalle: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        const product = products.find(product => {
            return product.id == req.params.id
        });
        res.render("producto", {product})
    },

    crear: (req, res) => {
        // comunicarse con el modelo, conseguir información
        res.render("crear")
    },
    procesoCrear: (req,res) => {
        const data = req.body;
        //leer archivo
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        //crear objeto literal
        const newProduct = {
            //ver el id del ultimo elemento del array y sumar 1
            id: products[products.length - 1].id + 1,
            name: data.name,
            price: parseInt(data.price),
            discount: parseInt(data.discount),
            category: data.category,
            history: data.history,
            description: data.description,
            image: req.file ? req.file.filename : "logo-tienda.png"
        }
        //agregar al archivo json
        products.push(newProduct);

        //reescribir el archivo json
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
        res.redirect("/biblioteca");
    },

    eliminar: (req,res) => {
        //leer archivo
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        //borrar
        const filtrarProducto = products.filter(product => {
            return product.id != req.params.id;
        });

        //reescribir archivo
        fs.writeFileSync(productsFilePath, JSON.stringify(filtrarProducto, null, " "));

        //redirigir
        res.redirect("/biblioteca");
    },

    editar: (req, res) => {
        // comunicarse con el modelo, conseguir información
         const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        const product = products.find(product => {
            return product.id == req.params.id
        });
        
        res.render("editar", {productToEdit : product});
    },

    procesoEditar: (req, res) => {
        const data = req.body;
        //leer archivo
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        //buscar id original
        const oldProduct = products.find(product => {
            return product.id == req.params.id
        });

        //crear objeto literal
        const editedProduct = {
            id: oldProduct.id,
            name: data.name,
            price: parseInt(data.price),
            discount: parseInt(data.discount),
            category: data.category,
            history: data.history,
            description: data.description,
            image: req.file ? req.file.filename : oldProduct.image
        }

        //ver el indice
        const index = products.findIndex(product => {
            return product.id == req.params.id
        })

        //modificar el archivo json donde corresponda
        products[index] = editedProduct;

        //reescribir el archivo json
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
        
        res.redirect("/biblioteca");
    }
}


// Exportamos el objeto literal con los distintos métodos, que se usará en el enrutador por defecto
module.exports = productsController;