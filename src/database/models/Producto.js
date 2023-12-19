module.exports = (sequelize, dataTypes) => {

    let alias = "Productos";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.FLOAT
        },
        discount: {
            type: dataTypes.INTEGER
        },
        history: {
            type: dataTypes.TEXT
        },
        description: {
            type: dataTypes.TEXT
        },
        cover: {
            type: dataTypes.STRING
        }
    };

    let config= {
        tableName: "producto",
        timestamps: false
    };
    
    const Producto = sequelize.define(alias, cols, config);
    return Producto;
} 