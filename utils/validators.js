const {body} = require('express-validator')

exports.registerValidators = [
    body('firstName', "La longueur du prénom doit être comprise entre 2 et 30 caractères. Sont acceptées les lettres de a à z")
    .isAlpha('fr-FR')
    .isLength({min: 2, max: 30})
    .trim(),

    body('lastName', "La longueur du nom doit être comprise entre 2 et 30 caractères. Sont acceptées les lettres de a à z")
    .isAlpha('fr-FR')
    .isLength({min: 2, max: 30})
    .trim(),

    body('email', "L'adresse email n'est pas correcte")
    .isEmail()
    .normalizeEmail(),

    body('password', "Le mot de passe doit être alphanumérique, sa longueur doit être comprise entre 6 et 15 caractères")
    .isLength({min: 6, max: 15})
    .isAlphanumeric()
    .trim(),

    body('passwordConfirm').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Les mots de passe doivent identiques')
        }
        return true
    })
]

exports.loginValidators = [
    body('email', "L'adresse email n'est pas correcte")
    .isEmail()
    .normalizeEmail(),

    body('password', "Le mot de passe doit être alphanumérique, sa longueur doit être comprise entre 6 et 15 caractères")
    .isLength({min: 6, max: 15})
    .isAlphanumeric()
    .trim(),
]