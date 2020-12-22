const express = require('express');
const router = express.Router();
const { Ingredient } = require('../models');
const validateSession = require('../middleware/validateSession');

// router.get('/testmain', (req, res)=>res.send('Main Ingredient Test!'))

router.post('/create', validateSession, async (req, res) => {
    if (req.user.role === 'user' || req.user.role === 'admin') {
        try {
            const { name, quantity, measurement, ingredientType, recipeId } = req.body;
            let newIngredient = await Ingredient.create({ name, quantity, measurement, ingredientType, recipeId, userId: req.user.id });
            res.status(200).json({
                ingredient: newIngredient,
                message: 'Ingredient Added!'
            })
        } catch (error) {
            res.status(500).json({
                message: 'Failed to add Ingredient!'
            })
        }
    } else {
        res.status(500).json({
            error: 'You Do Not Have Permission'
        })
    }
})

router.get('/:recipeId', validateSession, async (req, res) => {
    if (req.user.role === 'user' || req.user.role === 'admin') {
        try {
            let recipeId = req.params.recipeId
            let Ingredients = await Ingredient.findAll({
                where: { recipeId: recipeId }
            })
            res.status(200).json({
                ingredients: Ingredients,
                message: 'Ingredients Retrived'
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
        let ingredient = await Ingredient.findOne({ where: { id: req.params.id } })
        if (ingredient.userId === req.user.id || req.user.role === 'admin') {
            let query = req.params.id
            await Ingredient.update(req.body, { where: { id: query } })
                .then((ingredientUpdated) => {
                    Ingredient.findOne({ where: { id: query } }).then((locatedUpdatedIngredient) => {
                        res.status(200).json({
                            editedIngredient: locatedUpdatedIngredient,
                            message: 'Ingredient Updated Sccessfully!',
                            ingredientChanged: ingredientUpdated
                        })
                    })
                })
        } else {
            res.status(500).json({
                error: 'You Do Not Have Permission!'
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
        let ingredient = await Ingredient.findOne({ where: { id: req.params.id } })
        if (ingredient.userId === req.user.id || req.user.role === 'admin') {
            await Ingredient.destroy({
                where: { id: req.params.id }
            })
            res.status(200).json({
                message: 'Ingredient Deleted!'
            })
        } else {
            res.status(500).json({
                error: 'You Do Not Have Permission'
            })
        }
    } catch (error) {
        res.status(500).json({
            error: 'Could Not Delete Ingredient'
        })
    }
})

module.exports = router;