import React, { useState, useEffect, useMemo } from 'react'
import { ToolTipTwo } from '../tooltip/ToolTip';
import { Link } from 'react-router-dom';
import slugify from 'react-slugify';
import buldDrinkBGPic from '../../../src/assets/pexels-overhead.jpg'
import './builddrink.css';
import { LoadingPage } from '../loadingComponents/LoadingPage';
import { ErrorPage } from '../errorPageComponents/errorPage/ErrorPage';
import { ResultItem } from '../../types';
import { DrinksAPI } from '../../api/DrinksAPI';
import RotatingMixes from '../rotatingMixes/RotatingMixes';
let picBuldDrinkBGPic = `radial-gradient(#2e2c7c68, #4a5ecb5f), url(${buldDrinkBGPic})`;



export const BuildDrink = () => {

    const [selectedBaseAlcohols, setSelectedBaseAlcohols] = useState([""]);
    const [selectedIngredients, setSelectedIngredients] = useState([""]);

    const [allAlcohols, setAllAlcohols] = useState<string[]>([]);
    const [allIngredients, setAllIngredients] = useState<string[]>([]);
    const [allUniqueIngredients, setAllUniqueIngredients] = useState<string[]>([])


    const { initialData, fullData, isLoading: AllDrinksApiIsLoading, isError: AllDrinksApiIsError } = DrinksAPI();


    // clean ingredient names: turns "2.00 oz Orange Juice" to "Orange Juice"
    const extractMainIngredients = (ingredientsList: any[]) => {
        return ingredientsList.map(ingredient => {
            // Regular expression to remove the quantity and measurement units
            return ingredient.replace(/^[\d.]+\s*(oz|quarters|quarter|drops|drop|slices|slice|dashes|dash|cups|cup|tbsp|tsp|can|Can|fresh|whole|spoon|barspoon|bottle|wedges|wedge|cl|dl|parts|part|quart|pint|gallon|liter|litre|handful|piece|pieces|sprigs|sprig|spritz|stick|sticks|packet|packets|head|heads|clove|cloves|stalks|stalk|chunk|chunks|bulb|bulbs|splash|splashes|dash|dashes|bunch|bunches|leaf|leaves|segments|segment|rings|ring|cubes|cube|ear|ears|fillet|fillets|rasher|rashers|sprig|sprigs|strip|strips|spear|spears|bag|bags|bar|bars|block|blocks|drizzle|drizzles|knob|knobs|scoop|scoops|sheets|sheet|tins|tin|tubes|tube|pinches|pinch|splashes|splash|halves|half|-|)\s*/, "").trim();
        });
    };


    const extractUniqueItems = (data: any[], key: string) => {
        const allItems = data.flatMap((item) => item[key] || []);
        return [...new Set(allItems.map((item) => item.trim()))];
    };

    // const updateUniqueIngredients = () => {
    //     if (allIngredients) {
    //         const mainIngredients = extractMainIngredients(allIngredients);
    //         const uniqueIngredients = [...new Set(mainIngredients)]
    //         setAllUniqueIngredients(uniqueIngredients)
    //     }

    // }

    const updateUniqueIngredients = useMemo(() => {
        if (allIngredients) {
            return [...new Set(extractMainIngredients(allIngredients))]
        }
        return []
    }, [allIngredients])



    useEffect(() => {


        const dataUpdate = async () => {
            if (initialData && !fullData) {
                setAllAlcohols(extractUniqueItems(initialData, 'base_alcohol'));
                setAllIngredients(extractUniqueItems(initialData, 'ingredients'));
            } else if (fullData) {
                setAllAlcohols(extractUniqueItems(fullData, 'base_alcohol'));
                setAllIngredients(extractUniqueItems(fullData, 'ingredients'));
            }
        }

        dataUpdate()
    }, [initialData, fullData]);

    useEffect(() => {
        if (updateUniqueIngredients) {
            setAllUniqueIngredients(updateUniqueIngredients);
        }

    }, [updateUniqueIngredients])



    if (!initialData) {
        return (<LoadingPage />);
    }

    if (AllDrinksApiIsError) {
        return (<ErrorPage />);
    }

    const CallToPantry = () => {
        return (
            <div className="callToPantry">
                <h2>{"Checking the Pantry for Ingredients"}</h2>
                <div className="ingredientsLoading">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        )
    }



    // Filter's Drinks based on Alcohol and Ingredients Selected
    const filterDrinks = (drinks: any[], selectedBaseAlcohols: any[], selectedIngredients: any[]) => {
        if (!fullData && initialData) {
            return initialData.filter((drink: { base_alcohol: string | any[]; ingredients: string[]; }) => {
                // Check if any of the selected base alcohols are in the drink's base alcohol list
                const hasSelectedBaseAlcohol = selectedBaseAlcohols.some(base => drink.base_alcohol.includes(base));

                // Check if any of the selected ingredients are in the drink's ingredient list
                const hasSelectedIngredient = selectedIngredients.some(ingredient =>
                    drink.ingredients.some((drinkIngredient: string) => drinkIngredient.toLowerCase().includes(ingredient.toLowerCase()))
                );

                // Return true if the drink has both a selected base alcohol and a selected ingredient

                return hasSelectedBaseAlcohol && hasSelectedIngredient;


            }).map((drink: { drink_name: any; }) => drink.drink_name);
        } else if (fullData) {

            return fullData.filter((drink: { base_alcohol: string | any[]; ingredients: string[]; }) => {
                // Check if any of the selected base alcohols are in the drink's base alcohol list
                const hasSelectedBaseAlcohol = selectedBaseAlcohols.some(base => drink.base_alcohol.includes(base));

                // Check if any of the selected ingredients are in the drink's ingredient list
                const hasSelectedIngredient = selectedIngredients.some(ingredient =>
                    drink.ingredients.some((drinkIngredient: string) => drinkIngredient.toLowerCase().includes(ingredient.toLowerCase()))
                );

                // Return true if the drink has both a selected base alcohol and a selected ingredient

                return hasSelectedBaseAlcohol && hasSelectedIngredient;


            }).map((drink: { drink_name: any; }) => drink.drink_name);
        }

    };



    // Gets Alcohol Selected and adds to list
    const handleCheckboxChange = (bal: string) => {
        setSelectedBaseAlcohols((prevSelected) => {
            const updatedSelection = prevSelected.filter((item) => item !== "");
            if (updatedSelection.includes(bal)) {
                // If already selected, remove it
                const newSelection = updatedSelection.filter((item) => item !== bal);
                return newSelection.length === 0 ? [""] : newSelection;
            } else {
                // If not selected, add it
                return [...updatedSelection, bal];
            }
        });
    };


    // Gets Ingredients Selected and adds to list
    const handleIngredientboxChange = (bal: string) => {
        setSelectedIngredients((prevSelected) => {
            const updatedSelection = prevSelected.filter((item) => item !== "");
            if (updatedSelection.includes(bal)) {
                // If already selected, remove it
                const newSelection = updatedSelection.filter((item) => item !== bal);
                return newSelection.length === 0 ? [""] : newSelection;
            } else {
                // If not selected, add it
                return [...updatedSelection, bal];
            }
        });
    };


    // calls filterDrinks function
    let filteredDrinkNames: any;
    if (!fullData && initialData) {
        filteredDrinkNames = filterDrinks(initialData, selectedBaseAlcohols, selectedIngredients);
    } else if (fullData) {
        filteredDrinkNames = filterDrinks(fullData, selectedBaseAlcohols, selectedIngredients);
    }




    // adds drink names based on alcohol and ingredients selected. If "gin" and "orange juice" selected
    // this list "filteredDrinksList" should return all drinks that contain "gin" and "orange juice"

    let filteredDrinksList: ResultItem[] = []
    filteredDrinkNames.forEach((fdn: any) => {
        if (initialData && !fullData) {
            for (let d = 0; d < initialData.length; d++) {
                if (fdn === initialData[d].drink_name) {
                    filteredDrinksList.push(initialData[d])
                }
            }
        } else if (fullData) {
            for (let d = 0; d < fullData.length; d++) {
                if (fdn === fullData[d].drink_name) {
                    filteredDrinksList.push(fullData[d])
                }
            }
        }
    });

    return (
        <section className="buildDrinkSection" id="buildDrinkSection" style={{ backgroundImage: picBuldDrinkBGPic }}>
            <div className="container">
                <RotatingMixes />

                <fieldset id="allContainer">
                    <div className="selectionContainer">
                        <div className="alcSelectionContainer">
                            <div className="chooseAlcTitle">
                                <h3>Select an Alcohol</h3>
                            </div>

                            <div className="alcSelection">
                                {allAlcohols && allAlcohols.sort((a, b) => a > b ? 1 : -1).map((bal, balIdx) => (
                                    <label htmlFor={bal} key={balIdx}>
                                        <input
                                            className="checkBoxField"
                                            type="checkbox"
                                            id={bal}
                                            onChange={() => handleCheckboxChange(bal)}
                                            aria-label={`Select ${bal}`} />
                                        {bal}
                                    </label>
                                ))}
                            </div>

                        </div>
                        <div className="ingSelectionContainer">
                            <div className="chooseIngTitle">
                                <h3>Select an Ingredient</h3>
                            </div>
                            <div className="alcSelection">
                                {allUniqueIngredients.length === 0 ? <CallToPantry /> :
                                    <>
                                        {allUniqueIngredients && allUniqueIngredients.sort((a, b) => a > b ? 1 : -1).map((bal, idx) => (
                                            <label htmlFor={bal} key={idx}>
                                                <input
                                                    className="checkBoxField"
                                                    type="checkbox"
                                                    id={bal}
                                                    onChange={() => handleIngredientboxChange(bal)}
                                                    aria-label={`Select ${bal}`} />
                                                {bal}
                                            </label>
                                        ))}
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="resultsContainer" aria-live="polite">
                        <div className="resultsTitle">
                            <h3>Results</h3>
                        </div>
                        <div className={`${filteredDrinksList.length >= 1 ? "resultSection" : ""}`}>
                            {filteredDrinksList && filteredDrinksList.sort((a, b) => a.drink_name > b.drink_name ? 1 : -1).map((fd) => {
                                return (
                                    <ToolTipTwo
                                        key={fd.id}
                                        text={fd.ingredients.map((min: string, minIndex: React.Key | null | undefined) => (
                                            <li key={`${fd.id}-${minIndex}`}>{min.replace(min.split(" ")[0], "").replace(min.split(" ")[1], "").trim()}</li>
                                        ))}>
                                        <li>
                                            <Link
                                                key={fd.id}
                                                className="drinkNameResults"
                                                to={`/${slugify(fd.base_alcohol)}/${slugify(fd.drink_name)}`}
                                                aria-label={`View the recipes for ${fd.drink_name}`}
                                            >   {fd.drink_name}
                                            </Link>
                                        </li>

                                    </ToolTipTwo>
                                )
                            })}
                        </div>
                    </div>
                </fieldset>
            </div >
        </section >
    )
}