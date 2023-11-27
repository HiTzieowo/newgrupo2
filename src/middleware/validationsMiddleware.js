function validationMiddleware(req, res, next) {
    [
        body('nombre').notEmpty().withMessage('Tienes que escribir tu nombre'),
        body('apellido').notEmpty().withMessage('Tienes que escribir tu apellido'),
        body('correo').notEmpty().withMessage('Debes escribir tu correo').bail() //con bail(), pasamos a la siguiente validacion al cumplirse la primera
            .isEmail().withMessage('Debes escribir un correo válido'),
        body('contrasena').notEmpty().withMessage('Tienes que escribir una contraseña'),
        body('imgPerfil').custom((value, { req }) => {
            let file = req.file;
            let acceptedExtensions = ['.jpg', '.png'];
            if (!file) {
                throw new Error('Tienes que subir una imagen');
            } else {
                let fileExtensions = path.extname(file.originalname);
                if (!acceptedExtensions.includes(fileExtensions)) {
                    throw new Error(`Las extenciones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
                }
            }
            return true
        })
    ]

}

module.exports = validationMiddleware;