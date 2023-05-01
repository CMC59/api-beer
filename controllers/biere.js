// Import du modèle biere
var Biere = require("../models/biere");

// Import de express-validator
const { param, body, validationResult } = require("express-validator");

// Déterminer les règles de validation de la requête
const biereValidationRules = () => {
    return [
        body("name")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Name must be specified.")
            .withMessage("First name has non-alphanumeric characters."),

        body("degree")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Class must be specified."),

        body("couleur")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Class must be specified."),

        body("amertume")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Class must be specified."),

        body("class")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Class must be specified."),

    ]
}

const paramIdValidationRule = () => {
    return [
        param("id")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Id must be specified.")
            .isNumeric()
            .withMessage("Id must be a number.")
    ]
};

const bodyIdValidationRule = () => {
    return [
        body("id")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Id must be specified.")
            .isNumeric()
            .withMessage("Id must be a number.")
    ]
};

// Méthode de vérification de la conformité de la requête  
const checkValidity = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(400).json({
        errors: extractedErrors,
    })
}

// Create
exports.create = [bodyIdValidationRule(), biereValidationRules(), checkValidity, (req, res, next) => {

    // Création de la nouvelle instance de biere à ajouter 
    var biere = new Biere({
        _id: req.body.id,
        name: req.body.name,
        degree: req.body.degree,
        couleur: req.body.couleur,
        amertume: req.body.amertume,
        class: req.body.class,
    });

    // Ajout de biere dans la bdd 
    biere.save(function (err) {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(201).json("Biere created successfully !");
    });
}];

// Read
exports.getAll = (req, res, next) => {
    Biere.find()
        .populate("class")
    Biere.find(function (err, result) {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(result);
    });
};

exports.getById = [
    param("id")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Id must be specified.")
        .isNumeric()
        .withMessage("Id must be a number."),

    (req, res, next) => {
        //Extract the validation erros from a request
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            Biere.findById(req.params.id)
                .populate("class")
                .exec(function (err, result) {
                    if (err) {
                        return res.status(500).json(err);
                    }
                    return res.status(200).json(result);
                });
        }
    },
];

// Update
exports.update = [paramIdValidationRule(), biereValidationRules(), checkValidity, (req, res, next) => {

    // Création de la nouvelle instance de biere à modifier 
    var biere = new Biere({
        _id: req.body.id,
        name: req.body.name,
        degree: req.body.degree,
        couleur: req.body.couleur,
        amertume: req.body.amertume,
        class: req.body.class,
    });

    Biere.findByIdAndUpdate(req.params.id, biere, function (err, result) {
        if (err) {
            return res.status(500).json(err);
        }
        if (!result) {
            res.status(404).json("Biere with id " + req.params.id + " is not found !");
        }
        return res.status(201).json("Biere updated successfully !");
    });
}];

// Delete
exports.delete = [paramIdValidationRule(), checkValidity, (req, res, next) => {
    Biere.findByIdAndRemove(req.params.id).exec(function (err, result) {
        if (err) {
            return res.status(500).json(err);
        }
        if (!result) {
            res.status(404).json("Biere with id " + req.params.id + " is not found !");
        }
        return res.status(200).json("Biere deleted successfully !");
    });
}];