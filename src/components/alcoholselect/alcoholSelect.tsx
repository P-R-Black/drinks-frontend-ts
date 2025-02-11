import React, { useState, useEffect } from 'react';
import slugify from 'react-slugify';
import { Link } from 'react-router-dom';
import './alcoholselect.css';

import { BackgroundPics } from '../../BackgroundPics';
import { CocktailAlcoholType, CocktailsByBaseDrinkApi } from '../../api/DrinksAPI';
import { ErrorPage } from '../errorPageComponents/errorPage/ErrorPage';
import { LoadingPage } from '../loadingComponents/LoadingPage';
import { Drink, AlcoholSelectProps } from '../../types';



export const AlcoholSelect: React.FC<AlcoholSelectProps> = ({ alcohol }) => {

    const [filteredDrink, setFilteredDrink] = useState<Drink[]>([])
    const [displayName, setDisplayName] = useState<string>("")

    const { data: cocktailsByBase, isLoading, isError } = CocktailsByBaseDrinkApi(String(alcohol) || "");

    const { data: cocktailBase, isLoading: cocktailBaseLoading, isError: cocktailBaseIsError } = CocktailAlcoholType();

    const filterCocktailsByBase = async () => {
        if (cocktailsByBase) {
            let getAllCocktails = await cocktailsByBase.drinks.results
            setFilteredDrink(getAllCocktails)
        }

    }

    const getDisplayName = (alcohol: string | undefined) => {
        if (cocktailBase) {
            const dataResults = cocktailBase
            const foundItem = dataResults.results.find((item: { slug: string; }) => item.slug === alcohol)
            setDisplayName(foundItem ? foundItem.name : null)
        }
    };

    useEffect(() => {
        filterCocktailsByBase()
        getDisplayName(alcohol)
    })

    if (isLoading) {
        return (<LoadingPage />);
    }

    if (isError) {
        return (<ErrorPage />);
    }

    if (cocktailBaseLoading) {
        return (<LoadingPage />);
    }

    if (cocktailBaseIsError) {
        return (<ErrorPage />);
    }


    // const scrollers = document.querySelectorAll('.drinkListContainer')
    // if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    //     addAnimation();
    // }

    // function addAnimation() {
    //     scrollers.forEach(scroller => {
    //         let scrolls = scroller.getAttribute("data-animated")

    //         if (scrolls !== 'true') {
    //             scroller.setAttribute("data-animated", "true")
    //             const scrollerInner = scroller.querySelector('.drinkListUl');
    //             const scrollerContent = Array.from(scrollerInner.children);
    //             scrollerContent.forEach((item) => {
    //                 const duplicateItem = item.cloneNode(true);
    //                 duplicateItem.setAttribute("aria-hidden", true);
    //                 scrollerInner.appendChild(duplicateItem)
    //             })
    //         }
    //     });
    // }


    return (
        <section className="ginBackground" style={{ backgroundImage: BackgroundPics(slugify(alcohol)) }}>
            <div className="container">
                <div className="baseAlcoholContainer">
                    <div className="baseAlcTitleContainer">
                        <h1 id="baseAlcoholName">{displayName}</h1>
                        <h2>Drinks & Cocktails</h2>
                    </div>
                    <div className="drinkListContainer" role="region" aria-labelledby="baseAlcoholName">
                        <ul className="drinkListUl" style={{ animationDuration: `${(filteredDrink.length * 100) / 20}s` }}>
                            {filteredDrink && filteredDrink.sort((a, b) => a.drink_name > b.drink_name ? 1 : -1).map((fd, fdIdx) => {
                                return (
                                    <li className="drinkListLi" key={fdIdx} >{fd.drink_name}
                                        <Link
                                            to={`/${slugify(alcohol)}/${slugify(fd.drink_name)}`}
                                            className="linktoRecipe" aria-label={`View recipe for ${fd.drink_name}`}
                                        >Recipe
                                        </Link>
                                    </li>

                                )
                            })}
                            {filteredDrink && filteredDrink.sort((a, b) => a.drink_name > b.drink_name ? 1 : -1).map((fd, fdIdx) => {
                                return (
                                    <li className="drinkListLi" key={fdIdx} >{fd.drink_name}
                                        <Link
                                            to={`/${slugify(alcohol)}/${slugify(fd.drink_name)}`}
                                            className="linktoRecipe"
                                            aria-label={`Recipe for ${fd}`}
                                        >
                                            Recipe
                                        </Link>
                                    </li>

                                )

                            })}

                        </ul>
                        <div className="moreDrinkLinkContainer">
                            <Link to={`/${slugify(alcohol)}/drinks`} className="linktoRecipeLarge" aria-label={`All ${displayName} Drinks`}>All {displayName} Drinks</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}
