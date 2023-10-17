const fs = require('fs')

const User = {
    fileName: './database/users.json',

    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'))
    },

    findAll: function () {
        return this.getData();
    },

    findByPk: function (id) {
        let allUsers = this.findAll();
        let usersFound = allUsers.find(oneUser => oneUser.id === id)
        return usersFound;
    },

    create: function (userdata) {

    }
}

console.log(User.findByPk(2))