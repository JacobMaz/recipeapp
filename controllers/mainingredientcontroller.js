const express = require('express');
const router = express.Router();
const {MainIngredient} = require('../models');
const validateSession = require('../middleware/validateSession');

// router.get('/testmain', (req, res)=>res.send('Main Ingredient Test!'))

router.post('/create', validateSession, async (req, res)=>{
    try {
        const{name, quantity, measurement, recipeId} = req.body;
        let newMainIngredient = await MainIngredient.create({name, quantity, measurement, recipeId});
        res.status(200).json({
            mainIngredient: newMainIngredient,
            message: 'Main Ingredient Added!'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Failed to add Main Ingredient!'
        })
    }
})

router.get('/:recipeId', validateSession, async (req, res)=>{
    try {
        let recipeId = req.params.recipeId
        let mainIngredients = await MainIngredient.findAll({
            where: {recipeId: recipeId}
        })
        res.status(200).json({
            mainIngredients: mainIngredients,
            message: 'Main Ingredients Retrived'
        })
    } catch (error) {
        res.status(500).json({
            error: err,
            message: 'no recipes'
        })
    }
})

module.exports = router;