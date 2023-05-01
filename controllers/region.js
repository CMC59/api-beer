// Import du modèle region
var Region = require("../models/region");

// Import de express-validator
const { param, body, validationResult } = require("express-validator");

// Déterminer les règles de validation de la requête
const regionValidationRules = () => {
    return [
        body("region")
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
exports.create = [bodyIdValidationRule(), regionValidationRules(), checkValidity, (req, res, next) => {

    // Création de la nouvelle instance de region à ajouter 
    var region = new Region({
        _id: req.body.id,
        region: req.body.region,
    });

    // Ajout de region dans la bdd 
    region.save(function (err) {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(201).json("Region created successfully !");
    });
}];

// Read
exports.getAll = (req, res, next) => {
    Region.find(function (err, result) {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(result);
    });
};

exports.getById = [paramIdValidationRule(), checkValidity, (req, res, next) => {
    Region.findById(req.params.id).exec(function (err, result) {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(result);
    });
}];

// Update
exports.update = [paramIdValidationRule(), regionValidationRules(), checkValidity, (req, res, next) => {

    // Création de la nouvelle instance de region à modifier 
    var region = new Region({
        _id: req.body.id,
        region: req.body.region,
    });

    Region.findByIdAndUpdate(req.params.id, region, function (err, result) {
        if (err) {
            return res.status(500).json(err);
        }
        if (!result) {
            res.status(404).json("Region with id " + req.params.id + " is not found !");
        }
        return res.status(201).json("Region updated successfully !");
    });
}];

// Delete
exports.delete = [paramIdValidationRule(), checkValidity, (req, res, next) => {
    Region.findByIdAndRemove(req.params.id).exec(function (err, result) {
        if (err) {
            return res.status(500).json(err);
        }
        if (!result) {
            res.status(404).json("Region with id " + req.params.id + " is not found !");
        }
        return res.status(200).json("Region deleted successfully !");
    });
}];