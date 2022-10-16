// Importing required modules
const express = require("express");
const pokemonDb = require("../modules/pokemon-db.js");

// Setup an express Router
const router = express.Router();

// TODO Add your route handlers here
router.get("/services/pokemon", function (req, res) {


    const id = req.query.id;
    const IdNumber = parseInt(id);

    const getPokemonById = pokemonDb.getPokemonById(IdNumber);

    res.json(getPokemonById);


});
router.get("/services/pokemon/types", function (req, res) {
    const typeData = pokemonDb.getTypeData();
    res.json(typeData);

});
router.get("/services/pokemon/random", function (req, res) {
    const numPokemon = pokemonDb.getNumPokemon();
    const randomNumber = Math.floor((Math.random() * numPokemon) + 1);
    const pokemonByArrayIndex = pokemonDb.getPokemonByArrayIndex(randomNumber);
    res.json(pokemonByArrayIndex);


});


// Export the router so we can access it from other JS files using require()
module.exports = router;