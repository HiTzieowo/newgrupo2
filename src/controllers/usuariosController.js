// Requerimos path para poder enviar los archivos HTML
const fs = require("fs")
const path = require("path");
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../database/models/User');
const { use } = require("../routers/usuariosRouter");

// Creamos el objeto literal con los métodos a exportar
const usuariosController = {

    // Manejo del pedido get con ruta

    registro: (req, res) => {
        // comunicarse con el modelo, conseguir información
        res.render("register")
    },

    registroCompleto: (req, res) => {
        const resultValidation = validationResult(req); //validacion de registro

        if (resultValidation.errors.length > 0) {
            return res.render("register", {
                errors: resultValidation.mapped(),
                oldData: req.body
            }
            );
        }

        let userInDB = User.findByField('correo', req.body.correo); //buscar si el correo ya esta registrado

        if (userInDB) {     //validacion y mensaje de error de correo
            return res.render('register', {
                errors: {
                    correo: {
                        msg: 'Este correo ya está registrado'
                    }
                },
                oldData: req.body
            })
        }

        let crearUsuario = {        //si esta todo bien se sigue con el register
            ...req.body,
            contrasena: bcryptjs.hashSync(req.body.contrasena, 10), //para encriptar la contraseña
            imgPerfil: req.file.filename
        }

        User.create(crearUsuario)       //registro completado y renderizacion
        return res.render("iniciarSesion")

    },

    inicioDeSesion: (req, res) => {
        // comunicarse con el modelo, conseguir información
        res.render("iniciarSesion")
    },

    procesoSesion: (req, res) => {
        let userToLog = User.findByField('correo', req.body.correo); //buscar al user por su correo

        if (userToLog) {
            let contrasenaOk = bcryptjs.compareSync(req.body.contrasena, userToLog.contrasena); //validacion de contraseña
            if (contrasenaOk) {
                delete userToLog.contrasena;
                req.session.userLogged = userToLog;

               if(req.body.recordar){       //para guardar en cookie el user si tilda la casilla "recuerdame" en el login
                    res.cookie('userEmail', req.body.correo, { maxAge: (1000 * 60) * 3})
               }
                return res.redirect('/');
            }
            return res.render('iniciarSesion', {
                errors: {
                    correo: {
                        msg: 'Credenciales inválidas'
                    }
                }
            });
        }
    },

    users: (req, res) => {
        /* console.log(req.cookies.userEmail); */  //para ver si llega bien la cookie
        res.render("user", {
            user: req.session.userLogged
        });
    },

    logOut: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        res.redirect('/')
    }

}

// Exportamos el objeto literal con los distintos métodos, que se usará en el enrutador por defecto
module.exports = usuariosController;