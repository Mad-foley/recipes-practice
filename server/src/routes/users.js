import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/Users.js';

const router = express.Router();
                        // request variable and response variable
router.post("/register", async(req, res) => {
    // sent in from frontend
    const { username, password } = req.body;

    //confirm username exists with db function findOne()
    //{username: username } shortened to {username} (fun JS tip)
    const user = await UserModel.findOne({ username });

    // check if we should register user or not
    if (user) {
        return res.json({message: "User already exists!"});
    }

    // hash password to send to database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser= new UserModel({ username, password: hashedPassword });
    //creates user
    await newUser.save()

    // send back the user we found
    res.json({message: "User successfully registered!"});
});

router.post("/login");

export { router as userRouter }
