// set up express server by first importing items
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

// need .js because of our import notation
import { userRouter } from './routes/users.js';


const app = express();

// add middlewares
app.use(express.json());
app.use(cors());

// auth route
app.use("/auth", userRouter);

//allows for env variables
dotenv.config();
//mongodb connection
mongoose.connect(`mongodb+srv://mad-foley:${process.env.MONGO_PASSWORD}@recipes.ykm8xrm.mongodb.net/recipes?retryWrites=true&w=majority`)

// tells api to start, and selects port
app.listen(3001, () => console.log("SERVER STARTED!"));
