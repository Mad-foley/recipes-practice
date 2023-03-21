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
    //creates user in database
    await newUser.save()

    // send back the user we found
    res.json({message: "User successfully registered!"});
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
        return res.json({message: "User Doesn't Exist!"})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return res.json({message: "Username or Password is Incorrect!"});
    }
    // mysecret is usually a secret signature but for simplicity we are just leaving it here
    const token = jwt.sign({ id: user._id }, "mysecret");
    res.json({token, userID: user._id});
});

export { router as userRouter }
