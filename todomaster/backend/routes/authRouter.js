const express = require('express');
const authRouter = express.Router();
const User = require('../models/user');

//singup api
authRouter.post('/signup', async (req, res) => {
    try {
        
         if (req.body.password !== req.body.confirmPassword) {
              return res.status(400).json({ message: 'Password and Confirm Password must match' });
         }
        
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }


        const user = await User.create({
            email: req.body.email,
            password: req.body.password,
        });

        res.status(200).json({ user });

    } catch (error) {
        res.status(500).json({ error });
    }});


//login api
authRouter.post('/login', async (req, res) => {

    try {
        const existingUser= await User.findOne({ email: req.body.email });
        if (!existingUser) {
            return res.status(400).json({ message: 'User with this email does not exists' });
        }
        if (existingUser.password !== req.body.password) {
            return res.status(400).json({ message: 'Password is incorrect' });
        }
        res.status(200).json({ user: existingUser });
    } catch (error) {
        res.status(500).json({ error });
    }
}
);

module.exports = authRouter;