// (Étape 1) Import de express
var express = require('express');

// (Étape 1) Définition du router
var router = express.Router();

// Import du Contrôleur region
var region_controller = require("../controllers/region");

// (Étape 2) Ajout de la route qui permet d'ajouter une region
router.post("/", region_controller.create);

// (Étape 2) Ajout de la route qui permet d'afficher toutes les régions
router.get("/", region_controller.getAll);

// (Étape 2) Ajout de la route qui permet d'afficher une seule region grâce à son identifant
router.get("/:id", region_controller.getById);

// (Étape 2) Ajout de la route qui permet de modifier une seule region grâce à son identifant
router.put("/:id", region_controller.update);

// (Étape 2) Ajout de la route qui permet de supprimer une seule region grâce à son identifant
router.delete("/:id", region_controller.delete);

// (Étape 1) Export du router
module.exports = router;