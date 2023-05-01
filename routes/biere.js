// (Étape 1) Import de express
var express = require('express');

// (Étape 1) Définition du router
var router = express.Router();

// Import du Contrôleur biere
var biere_controller = require("../controllers/biere");

// (Étape 2) Ajout de la route qui permet d'ajouter une bière
router.post("/", biere_controller.create);

// (Étape 2) Ajout de la route qui permet d'afficher toutes les bières
router.get("/", biere_controller.getAll);

// (Étape 2) Ajout de la route qui permet d'afficher une seule bière grâce à son identifant
router.get("/:id", biere_controller.getById);

// (Étape 2) Ajout de la route qui permet de modifier une seule bière grâce à son identifant
router.put("/:id", biere_controller.update);

// (Étape 2) Ajout de la route qui permet de supprimer une seule bière grâce à son identifant
router.delete("/:id", biere_controller.delete);

// (Étape 1) Export du router
module.exports = router;