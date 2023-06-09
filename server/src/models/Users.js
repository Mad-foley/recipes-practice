import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true , unique: true},
    password: { type: String, required:true },
    savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }]
});

// collection ("table") called users
//how we make calls to our specific selection
export const UserModel = mongoose.model("users", UserSchema);
