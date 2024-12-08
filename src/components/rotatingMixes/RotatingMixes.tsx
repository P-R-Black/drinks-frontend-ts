import React, { useEffect, useState } from 'react'
import './rotatingMixes.css';


const RotatingMixes = () => {
    const alcoholSelections = ["Gin", "Vodka", "Whiskey", "Bourbon", "Mezcal"]
    const ingredientSelections = ["Lemon Juice", "Cranberry Juice", "Soda Water", "Lychee Juice", "Rose Petal Water"]

    const [alcohol, setAlcohol] = useState<string>("Rum")
    const [ingredient, setIngredient] = useState<string>("Crème de Violette")

    const fishYatesShuffle = (arr: string[]) => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr
    }


    useEffect(() => {
        // randomly selects a base_alcohol and ingredient from API to populate h2
        const interval = setInterval(() => {
            const shuffledAlcohols = fishYatesShuffle(alcoholSelections);
            const shuffledIngredients = fishYatesShuffle(ingredientSelections);
            setAlcohol(shuffledAlcohols[0] || '');
            setIngredient(shuffledIngredients[0] || '');

        }, 5000);
        return () => clearInterval(interval);
    })


    return (
        <>
            <div className="buildADrinkTitle">
                <h1>Build A Drink</h1>
                <h2>What Can You Make With
                    <div className="innerMovingText">
                        <span className="innerMovingAlcText" aria-live="polite">{alcohol} </span>

                        &amp;
                        <span className="innerMovingIngText" aria-live="polite"> {ingredient}</span>

                    </div>
                </h2>
            </div>
        </>
    )
}

export default RotatingMixes