const express = require('express');
const router = express.Router();
const { Recipe } = require('../models');
const validateSession = require('../middleware/validateSession');

// router.get('/test', (req, res) => res.send('recpie test!'));

router.post('/create', validateSession, async (req, res) => {
    try {
        const { recipeName, cuisine, prepTime, cookTime, directions } = req.body;
        let newRecipe = await Recipe.create({ recipeName, cuisine, prepTime, cookTime, directions, userId: req.user.id });
        res.status(200).json({
            recipe: newRecipe,
            message: 'Recipe Added!'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Recipe Creation Failed!'
        })
    }
})

router.get('/userrecipes', validateSession, async (req, res) => {
    try {
        let userId = req.user.id
        let userRecipes = await Recipe.findAll({
            where: { userId: userId },
            include: 'user'
        })
        res.status(200).json({
            userRecipes: userRecipes,
            message: 'All of my Recipes retrieved'
        })
    } catch (error) {
        res.status(500).json({ error: err })
    }
})

router.get('/allrecipes', async (req, res) => {
    try {
        let allRecipes = await Recipe.findAll({
            include: 'user'
        })
        res.status(200).json({
            allRecipe: allRecipes,
            message: 'All Food Retrived'
        })
    } catch (error) {
        res.status(200).json({ error: err })
    }
})

router.get('/:recipeName', validateSession, async (req, res) => {
    try {
        let recipeName = req.params.recipeName
        let recipeByName = await Recipe.findAll({
            where: { recipeName: recipeName },
            include: 'user'
        })
        res.status(200).json({
            recipeByName: recipeByName,
            message: `${recipeName} recipes retrived`
        })
    } catch (error) {
        res.status(500).json({
            error: err,
            message: 'no recipes'
        })
    }
})

router.put('/:id', validateSession, async (req, res) => {
    try {
        const query = req.params.id;
        await Recipe.update(req.body, { where: { id: query } })
            .then((recipeUpdated) => {
                Recipe.findOne({ where: { id: query } }).then((locatedUpdatedRecipe) => {
                    res.status(200).json({
                        editedRecipe: locatedUpdatedRecipe,
                        message: 'Recipe Updated Successfully!',
                        recipeChanged: recipeUpdated
                    })
                })
            })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

router.delete('/:id', validateSession, async (req, res) => {
    try {
        await Recipe.destroy({
            where: { id: req.params.id }
        })
        res.status(200).json({
            message: 'Recipe Deleted!'
        })
    } catch (error) {
        res.status.prototype(500).json({
            error: error
        })
    }
})

module.exports = router;