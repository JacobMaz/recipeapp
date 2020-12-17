const express = require('express');
const router = express.Router();
const {Recipe} = require('../models');

router.get('/test', (req, res)=> res.send('recpie test!'));

router.post('/create', async (req, res)=>{
    try {
        const{recipeName, cuisine, prepTime, cookTime, directions} = req.body;
        let newRecipe = await Recipe.create({recipeName, cuisine, prepTime, cookTime, directions, userId: req.user.id});
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

router.get('/userrecipe', (req, res)=> {
    let userId = req.user.id
    Recipe.findAll({
        where: {userId: userId}
    })
    .then(recipe => res.status(200).json({
        recipe: recipe,
        message: 'All of my Recipes retrieved'
    }))
    .catch(err => res.status(500).json({error: err}))
})

module.exports = router;