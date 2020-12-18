const express = require('express');
const router = express.Router();
const {Ingredient} = require('../models');
const validateSession = require('../middleware/validateSession');

// router.get('/testmain', (req, res)=>res.send('Main Ingredient Test!'))

router.post('/create', validateSession, async (req, res)=>{
    try {
        const{name, quantity, measurement, ingredientType, recipeId} = req.body;
        let newIngredient = await Ingredient.create({name, quantity, measurement, ingredientType, recipeId});
        res.status(200).json({
            ingredient: newIngredient,
            message: 'Ingredient Added!'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Failed to add Ingredient!'
        })
    }
})

router.get('/:recipeId', validateSession, async (req, res)=>{
    try {
        let recipeId = req.params.recipeId
        let Ingredients = await Ingredient.findAll({
            where: {recipeId: recipeId}
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
})

module.exports = router;