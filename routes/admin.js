const express = require("express");
const pokemonDb = require("../modules/pokemon-db.js");
const router = express.Router();

router.get("/admin", function (req, res) {
    res.locals.pokemon = pokemonDb.getAllPokemon();



    res.render("admin");


});

//task3

const makeAnarray = require("../modules/make-array");
const multer = require("../modules/multer-uploader");
const fs = require("fs");

router.get("/newPokemon", function (req, res) {

    res.render("new-pokemon-form")
});

router.post("/newPokemon", multer.single("imageFile"), function (req, res) {

    const summitedId = req.body.id;
    const summitedName = req.body.name;
    const selectedType = makeAnarray(req.body.types);
    const summitedDescription = req.body.description;


    //move uploaded image to public/images/pokemon and remame it to its original name.
    const uploadFileInfor = req.file;
    const oldFileName = uploadFileInfor.path;
    const newFileName = `./public/images/pokemon/${uploadFileInfor.originalname}`;
    fs.renameSync(oldFileName, newFileName);


    //adding new Pokemon
    const newPokemon = {
        id: parseInt(summitedId),
        name: summitedName,
        types: selectedType,
        imageUrl: uploadFileInfor.originalname,
        description: summitedDescription
    };
    pokemonDb.addPokemon(newPokemon);



    res.redirect("admin");

});



module.exports = router;