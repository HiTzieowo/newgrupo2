const fs = require('fs');
const { json } = require('sequelize');

const User = {
    fileName: './src/data/users.json',      //apuntar al archivo donde estan los usuarios

    getData: function() {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'))      //leer el archivo json
    },

    generateId: function() {
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
            if(lastUser) {
                return lastUser.id + 1;   //genera id al usuario
            } 
            return 1;           //en caso de no tener ningun usuario en el json
    },

    findAll: function() {       //busca a todos los usuarios
        return this.getData();
    },

    findByPk: function(id) {                //encontrar al usuario por ID
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id);
        return userFound;
    },

    findByField: function(field, text) {        //encontrar al usuario por correo
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
    },

    create: function(userData) {            //crear al nuevo usuario
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '))
        return newUser;
    },

    delete: function(id) {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '))
        return true;
    }
}

module.exports = User;