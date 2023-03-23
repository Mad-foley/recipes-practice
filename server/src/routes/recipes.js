import { RecipeModel } from "../models/Recipes.js";
import express from 'express';
import mongoose from 'mongoose';
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        // find all
        const response = await RecipeModel.find({});
        res.json(response)
    } catch (err) {
        res.json(err)
    }
});

router.post("/", async(req, res) => {
    const recipe = new RecipeModel(req.body);
    try {
        // find all
        const response = await recipe.save();
        res.json(response)
    } catch (err) {
        res.json(err)
    }
});

router.put("/", async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID)
        const user = await UserModel.findById(req.body.userID);
        user.savedRecipes.push(recipe);
        await user.save();
        res.json({ savedRecipes: user.savedRecipes });
    } catch (err) {
        res.json(err)
    }
});
                        // how we get params
router.get("/savedRecipes/ids/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        const savedRecipes = await RecipeModel.find({
            // where it is in user's saved recipe -> similar to python 'in'
            // mongoose logic
            _id: {$in: user.savedRecipes },
        });
        res.json({ savedRecipes });
    } catch (err) {
        res.json(err);
    }
});

export {router as recipesRouter};
