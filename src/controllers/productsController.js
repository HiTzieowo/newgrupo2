// Requerimos path para poder enviar los archivos HTML
const fs= require("fs")
const path = require("path");

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
    productocarga: (req, res) => {
        // comunicarse con el modelo, conseguir información
        res.render("cargaDeProducto")
    },
    productoedicion: (req, res) => {
        // comunicarse con el modelo, conseguir información
        res.render("edicionDeProducto")
    },

}
processCreate: (req, res) => {
    // Do the magic
    const data = req.body;

    // Leer el archivo JSON y dejarlo en una variable (array)
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

    // Crear un nuevo objeto literal con los datos ingresados por el usuario
    const newProduct = {
        // Tomar el último elemento del array, ver su ID, y sumarle 1
        id: products[products.length - 1].id + 1,
        name: data.name,
        price: parseInt(data.price),
        discount: parseInt(data.discount),
        category: data.category,
        description: data.description,
        image: req.file ? req.file.filename : "default-image.png"
    }
 
		// Agregar ese objeto al array
		products.push(newProduct);

		// Volver a escribir sobre el archivo JSON
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "))

		// Devolverle alguna vista al usuario
		res.redirect("/products");
	},

// Exportamos el objeto literal con los distintos métodos, que se usará en el enrutador por defecto
module.exports = productsController;