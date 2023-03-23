import { useEffect, useState } from "react";
import axios from 'axios';
import { useGetUserID } from "../hooks/useGetUserID";


export const Home = () => {
    const[recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const userID = useGetUserID();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get("http://localhost:3001/recipes");
                setRecipes(response.data);
            } catch (err) {
                console.error(err)
            }
        }

        const fetchSavedRecipes = async () => {
            try{                                            // ending it as param
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
                console.log(response.data)
            } catch(err) {
                console.error(err);
            }
        }
        fetchRecipe();
        fetchSavedRecipes();

    }, []);

    const saveRecipe = async (recipeID) => {
        try {
            const response = await axios.put("http://localhost:3001/recipes", {recipeID, userID});
            console.log(response);
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="container">
            <h1>Recipes</h1>
            <ul>
                {recipes.map(recipe => {
                    return(
                        <li key={recipe._id}>
                            <div>
                                <h2>{recipe.name}</h2>
                                <button onClick={() => saveRecipe(recipe._id)} > Save </button>
                            </div>
                            <div className="instructions">
                                <p>{recipe.instructions }</p>
                            </div>
                            <img src={recipe.imageUrl} alt={recipe.name}/>
                            <div className="ingredients">
                                <ul>
                                    {recipe.ingredients.map( (ingredient, idx)=> {
                                        return <li key={idx}>{ingredient}</li>
                                    })}
                                </ul>
                            </div>
                            <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
};
