const router = require('express').Router()
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UniqueConstraintError } = require('sequelize/lib/errors');

router.get('/test', (req, res) => res.send('ttttteeeeessssttt!'));

router.post('/register', async (req, res) => {
    try {
        let { firstName, lastName, userName, email, password, role } = req.body;
        const newUser = await User.create({
            firstName,
            lastName,
            userName,
            email,
            password: bcrypt.hashSync(password, 13),
            role: role || 'user'
        })
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
        res.status(201).json({
            message: 'User Registered!',
            user: newUser,
            token: token
        })
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            res.status(409).json({
                error: 'Email or Username already in use.'
            })
        } else {
            res.status(500.).json({
                error: 'Failed to register user'
            })
        }
    }
})

router.post('/login', async (req, res) => {
    let {userName, password} = req.body;
    try{
        let loginUser = await User.findOne({
            where: {userName}
        })
        if (loginUser && await bcrypt. compare(password, loginUser.password)){
            const token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
            res.status(200).json({
                message: 'Login Succeeded',
                user: loginUser,
                token: token
            })
        } else {
            res.status(401).json({
                message: 'Login: Failed: Userinformation Incorrect'
            })
        }
    } catch (error){
        res.status(500).json({error: 'Error Loggin In'})
    }
})

module.exports = router;