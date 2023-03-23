import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    // need [] so mongodb know's you can have an array of ingredients
    ingredients: [{ type: String, required:true }],
    instructions: { type: String, required: true },
    imageUrl: { type: String, required: true },
    cookingTime: { type: Number, required: true},
    // like foreign key id
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }
});

// collection has same name as db - not best practice
export const RecipeModel = mongoose.model("recipes", RecipeSchema);
