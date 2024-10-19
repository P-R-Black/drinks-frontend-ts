import React, { useState, useEffect } from 'react'
// import { BiShareAlt } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai'
import { AiOutlineMinus } from 'react-icons/ai'
import { Share } from '../share/Share'

import './drinkRecipe.css'

import imgRecipeBG from '../../assets/pexels-kelly.jpg';
import slugify from 'react-slugify';
import { CocktailAlcoholType, CocktailsByBaseDrinkApi, ShotsByBaseDrinkApi } from '../../api/DrinksAPI';


interface DrinkRecipeProp {
    drinkName: string | undefined;
    alcohol: string | undefined
}

interface Drink {
    id: number;
    drink_name: string;
    slug: string;
    base_alcohol: string[];
    drink_type: string;
    garnish: string[];
    ingredients: string[];
    serving_glass: string;
    mixing_direction: string;
    profile: string;
    must_know_drink: boolean;

}

export const DrinkRecipe: React.FC<DrinkRecipeProp> = ({ drinkName, alcohol }) => {
    console.log('drinkName', drinkName, 'alcohol', alcohol)

    const [recipe, setRecipe] = useState<Drink[]>([])
    const [toMl, setToMl] = useState<string[][]>([])
    let [unitCount, setUnitCount] = useState(1)
    let [unitMeasure, setUnitMeasure] = useState("oz")


    const { data: cocktailsByBase, isLoading, isError, error } = CocktailsByBaseDrinkApi(String(alcohol) || "");
    const { data: shotsByBase, isLoading: shotsByBaseIsLoading, isError: shotsByBaseIsError, error: shotsByBaseError } = ShotsByBaseDrinkApi(String(alcohol) || "");



    useEffect(() => {
        const getDrinkRecipe = () => {
            if (cocktailsByBase) {
                console.log('cocktailsByBase', cocktailsByBase)
                cocktailsByBase.drinks.forEach((rec: Drink) => {
                    if (
                        rec.drink_name.toLowerCase() === drinkName ||
                        slugify(rec.drink_name) === drinkName
                    ) {
                        setRecipe([rec]);
                    }
                });
            }


        };

        const getShotRecipe = () => {

            if (shotsByBase) {
                shotsByBase.drinks.forEach((rec: Drink) => {
                    if (
                        rec.drink_name.toLowerCase() === drinkName ||
                        slugify(rec.drink_name) === drinkName
                    ) {
                        setRecipe([rec]);
                    }
                });
            }

        };
        if (cocktailsByBase && drinkName) {
            getDrinkRecipe()
        }

        if (shotsByBase && drinkName) {
            getShotRecipe()
        }



    }, [cocktailsByBase, drinkName, shotsByBase, alcohol]); // Dependency array


    let picChoice = `radial-gradient(#2e2c7c68, #4a5ecb5f), url(${imgRecipeBG})`;

    let shareUrl = window.location.href;



    // removes zero before decimals
    const formatUnits = (unit: any) => {
        let formattedUnit: any = Number(unit.split(" ")[0]) * unitCount;
        let temp = formattedUnit.toString();
        let limitDecimalPlace = Number(temp).toFixed(2);
        formattedUnit = String(limitDecimalPlace).replace(/^0+/, "").replace(".00", "");
        return formattedUnit;
    }

    // // Convert Ingredient Ounces to Milliliters 
    const convertUnitMeasurements = () => {

        let ingredients = recipe.map((ing: Drink) => ing['ingredients'])
        console.log('ingredients', ingredients)
        ingredients.forEach((ings) => {
            let testing = ings.map((is) => is.split(" "))
            for (let i = 0; i < testing.length; i++) {
                let ingredientUnits = testing[i][0]
                let ingredientMeasurement = testing[i][1]

                if (ingredientMeasurement === "oz") {
                    let newUnit = parseFloat(ingredientUnits) * Math.ceil(29.5735)
                    let newMeasurement = ingredientMeasurement.replace('oz', 'ml')
                    testing[i][0] = newUnit.toString()
                    testing[i][1] = newMeasurement.toString()
                    setToMl(testing)
                }
            }
        })
    };



    const splitIngredients = (text: any[]) => {
        let newText = text.slice(2).join(" ")
        return newText
    }


    return (
        <section className="recipeBackground" style={{ backgroundImage: picChoice }}>
            <div className="container">
                {recipe.map((dr) => {
                    return (
                        <article className="recipeContainer" key={dr.id}>
                            <header className="titleAndLikes">
                                <h2 id="recipeTitle" className="recipeTitle" aria-label={`${dr.drink_name}`}>{dr.drink_name}</h2>
                                <div className="likesAndShare" style={{ color: "white" }}>
                                    <Share
                                        recipeInPlay={dr.drink_name}
                                        ingredientInPlay={dr.ingredients}
                                        garnishInPlay={dr.garnish}
                                        directionsInPlay={dr.mixing_direction}
                                        glassInPlay={dr.serving_glass}
                                        shareUrl={shareUrl}
                                    />
                                </div>
                            </header>
                            <div className="ingredientInstructionContainer">
                                <div className="allIngredientsContainer">
                                    <h3 className="ingredientTitle" aria-label="Drink ingredients">Ingredients</h3>

                                    {unitMeasure === "ml" ? (
                                        <>
                                            <ul>
                                                {toMl.map((ml, mlIndex) => (
                                                    <li className="ingredients" key={mlIndex}>
                                                        <span className="ingredientUnit">{formatUnits(ml[0])} </span>
                                                        <span className="ingredientMeasurement">{`${ml[1]} `} </span>
                                                        <span className="ingredentIngredient">
                                                            {splitIngredients(ml)}
                                                        </span>

                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    ) : (
                                        <ul>
                                            {dr.ingredients.map((im, imIndex) => {
                                                return (
                                                    <li className="ingredients" key={imIndex}>
                                                        <span className="ingredientUnit">{formatUnits(im)} </span>
                                                        <span className="ingredientMeasurement">{`${im.split(" ")[1]} `}</span>
                                                        <span className="ingredentIngredient">
                                                            {
                                                                im.replace(im.split(" ")[0], "").replace(im.split(" ")[1], "")
                                                                    .trim()}
                                                        </span>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    )}

                                    <div className="measureContainer">
                                        <div className="incrementUnit  unitMeasure">
                                            <div className={`${unitMeasure === "oz" ? "measureButtonContainer oz" : "measureButtonContainer ml"}`}>
                                                <button
                                                    onClick={() => setUnitMeasure("oz")}
                                                    className="ozButton"
                                                    type="submit"
                                                    aria-label="Use ounces as measurement"
                                                // tabIndex="0"


                                                >
                                                    oz
                                                </button>
                                                <button
                                                    onClick={() => { setUnitMeasure("ml"); convertUnitMeasurements() }}
                                                    className="mlButton"
                                                    type="submit"
                                                    aria-label="Use milliliters as measurement">
                                                    ml
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="garnishAndGlassContainer">
                                    <div className="garnishContainer">
                                        <h3 className="garnishTitle" aria-label="Drink garnish">Garnish</h3>
                                        {dr.garnish.map((mg, mgIndex) => {
                                            return (
                                                <h4 key={mgIndex} className="garnish">{mg !== "0 None" ? mg : ""}</h4>
                                            )
                                        })}

                                    </div>
                                    <div className="glassContainer">
                                        <h3 className="glassTitle" aria-label="Drink serving glass">Serving Glass</h3>
                                        <h4 className="glass">{dr.serving_glass}</h4>
                                    </div>
                                    <div className="servingAmountContainer">
                                        <h3 className="servingSize" aria-label="Drink serving size">Serving</h3>
                                        <div className="incrementUnit">
                                            <h4 className="servings">{unitCount} </h4>
                                            <div className="buttonContainer">
                                                <button
                                                    onClick={() => setUnitCount(unitCount + 1)}
                                                    className="plusButton"
                                                    type="submit"
                                                    aria-label="Increase serving size">

                                                    <AiOutlinePlus />
                                                </button>
                                                <button
                                                    onClick={() => setUnitCount(unitCount > 1 ? unitCount -= 1 : 1)}
                                                    className="minusButton"
                                                    type="submit"
                                                    aria-label="Decrease serving size">

                                                    <AiOutlineMinus />
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="recipeInstructionContainer">
                                    <div className="instructionContainer">
                                        <h3 className="instructionTitle" aria-label="Drink instructions">Instructions</h3>
                                        <h4 className="instructions" style={{ color: "white" }}>
                                            {dr.mixing_direction}
                                        </h4>

                                    </div>
                                </div>
                            </div>
                        </article>
                    )
                })}
            </div>
        </section>
    )
}