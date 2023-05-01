// (Étape 1) Import du DRM mongoose et luxon
var mongoose = require("mongoose");
// const { DateTime } = require("luxon");

// // (Étape 2) Définition de la méthode qui permet de valider le format d'un email
// const validateEmail = function (email) {
//     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(email);
// };

// (Étape 2) Définition du schéma biere
// https://mongoosejs.com/docs/guide.html
// https://mongoosejs.com/docs/schematypes.html#schematype-options
const biereSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    name: { type: String, required: true },
    degree: { type: String, required: true, enum: ["1", "2", "3", "4", "5", "5,5", "6", "7", "8", "8,5", "9", "10", "11", "12"] },
    couleur: { type: String, required: true, enum: ["BLANCHE", "BLONDE", "DORÉE", "ROUSSE", "AMBRÉE-CLAIRE", "AMBRÉE", "AMBRÉE-FONCÉE", "BRUNE", "BRUNE-FONCÉE", "NOIRE"] },
    amertume: { type: String, required: true, enum: ["PILS", "LAGER", "PORTER", "PALE-ALE", "ENGLISH-BITTER", "IPA", "DOUBLE-IPA", "IMPERIAL-IPA", "BARLEYWINE", "STOUT", "IMPERIAL-STOUT"] },
    class: { type: Number, required: true, ref: "regions" },

});

// (Étape 3) Création d'une nouvelle propriété virtuelle "id" qui aura la valeur de la propriété "_id"
biereSchema.virtual("id").get(function () {
    return this._id;
});

// (Étape 3) Définition de l'object qui sera retourné lorsque la méthode toJSON est appelée
biereSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});

// (Étape 4) Export du modèle biere
// Les modèles sont responsables de la création et de la lecture des documents à partir de la base de données MongoDB.
module.exports = mongoose.model("bieres", biereSchema);


// {
//     "id": "1",
//     "name": "Lablonde",
//     "degree": "7",
//     "malt": "STOUT",
//     "class": "1"
//     }
//pour POSTMAN