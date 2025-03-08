import { Router } from 'express';
import { Sport } from '../models/sportModel.js'; // Ensure the sport model is imported from sportModel.js
import { User } from '../models/userModel.js'; // Ensure the User model is imported from userModel.js

const router = Router();

// Get all the sports names in Sports collection in the mongoDB CHP database
router.get('/showSports', async (req, res) => {
    try {
        const sports = await Sport.find({}, { _id: 0, sport_name: 1 }); // Find all sports and return only the sport_name field
        if (!sports || sports.length === 0) {
            return res.status(404).send({ error: 'Sports not found' });
        }
        res.status(200).send(sports);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/showUsers', async (req, res) => {
    try {
        const users = await User.find({}, {_id: 0, tokens: 0, __v: 0, password: 0}); // Find all sports and return only the sport_name field
        if (!users || users.length === 0) {
            return res.status(404).send({ error: 'Users not found' });
        }
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/getUser', async (req, res) => {
    try {
        const { userEamil } = req.query;
        
        if (!userEamil) {
            return res.status(400).send({ error: 'userEmail query parameter is required' });
        }
        
        const user = await User.findById(userEamil);
        
        if (!userEamil) {
            return res.status(404).send({ error: 'User not found' });
        }

        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


export default router;