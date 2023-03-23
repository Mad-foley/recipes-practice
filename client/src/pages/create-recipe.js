import { useState } from "react";
import axios from 'axios';
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


export const CreateRecipe = () => {
    const userID = useGetUserID();
    const [cookies, ] = useCookies(["access_token"]);
    const [recipe, setRecipe] = useState( {
        name:"",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner: userID,
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setRecipe({...recipe, [name]: value});
        console.log(recipe)
    }

    const handleIngredientChange = (event, idx) => {
        const { value } = event.target;
        //copy list of ingredients
        const ingredients = [...recipe.ingredients];
        // change value by index
        ingredients[idx] = value;
        // change entire ingredients field to the new one
        // js shorthand ingredients: ingredients
        setRecipe({...recipe, ingredients});
        console.log(recipe)

    }
    const addIngredient = () => {
        // adds an empty string to array which allows us to map it in html below
        const ingredients = [...recipe.ingredients, ""]
        // set recipe to whatever it was before
        // but update the ingredients field
        setRecipe({ ...recipe, ingredients });
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/recipes", {...recipe}, {
                headers: { Authorization: cookies.access_token },
            })
            console.log(response)
            alert("recipe created")
            navigate("/")
        } catch(err) {
            console.error(err)
        }
    }

    return (
        <div className="create-recipe">
            <h2>Create Recipe</h2>
            <form onSubmit={onSubmit} >
                <label htmlFor="name"> Name </label>
                <input type="text" id="name" name="name" onChange={handleChange} />
                <label htmlFor="ingredients">Ingredients</label>
                {recipe.ingredients.map((ingredient, idx) => (
                    <input
                        key={idx}
                        type="text"
                        name="ingredients"
                        value={ingredient}
                        onChange={(event) =>  handleIngredientChange(event, idx)}
                    />
                ))}
                <button type="button" onClick={addIngredient}>Add Ingredient</button>
                <label htmlFor="instructions"> Instructions </label>
                <textarea id="instructions" name ="instructions" onChange={handleChange}></textarea>
                <label htmlFor="imageUrl"> Image URL </label>
                <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange} />
                <label htmlFor="cookingTime"> Cookingtime (minutes)</label>
                <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange} />
                <button type="submit">Create Recipe</button>
            </form>
        </div>
    );
};
