const express = require('express');
const router = express.Router();
const { Recipe } = require('../models');
const validateSession = require('../middleware/validateSession');
// const ac = require('../roles')

// router.get('/test', (req, res) => res.send('recpie test!'));

router.post('/create', validateSession, async (req, res) => {
    // const permission = ac.can(req.user.role).createOwn('recipe');
    // if (permission.granted){
    if (req.user.role === 'user' || req.user.role === 'admin') {
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
    } else {
        res.status(500).json({
            error: 'You Do Not Have Permission'
        })
    }

})

router.get('/userrecipes', validateSession, async (req, res) => {
    try {
        let userId = req.user.id
        let userRecipes = await Recipe.findAll({
            where: { userId: userId },
            include: ['user', 'ingredients']
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
    if (req.user.role === 'user' || req.user.role === "admin") {
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
    } else {
        res.status(500).json({
            error: 'You Do Not Have Permission'
        })
    }

})

router.put('/:id', validateSession, async (req, res) => {
    try {
        let recipe = await Recipe.findOne({where: {id: req.params.id}})
        console.log('userId: ', recipe.userId)
        if (recipe.userId === req.user.id || req.user.role === 'admin') {
            let query = req.params.id
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
        } else {
            res.status(500).json({
                error: 'You Do Not Have Permission'
            })
        }
    } catch (error) {
        res.status(500).json({
            error: 'Update did not work!'
        })
    }
})

router.delete('/:id', validateSession, async (req, res) => {
    try {
        let recipe = await Recipe.findOne({where: {id: req.params.id}})
        if (recipe.userId === req.user.id || req.user.role === 'admin') {
            await Recipe.destroy({
                where: { id: req.params.id }
            })
            res.status(200).json({
                message: 'Recipe Deleted!'
            })
        } else {
            res.status(500).json({
                error: 'You Do Not Have Permission'
            })
        }
    } catch (error) {
        res.status(500).json({
            error: 'Could Not Delete Recipe'
        })
    }
})

module.exports = router;