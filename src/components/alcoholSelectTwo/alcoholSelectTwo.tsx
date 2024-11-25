import React, { useState, useEffect } from 'react';
import slugify from 'react-slugify';

import { Link } from 'react-router-dom';
import { ToolTip } from '../tooltip/ToolTip';
import './alcoholSelectTwo.css';
import { BackgroundPics } from '../../BackgroundPics';
import { CocktailAlcoholType, CocktailsByBaseDrinkApi } from '../../api/DrinksAPI';
import { ErrorPage } from '../errorPageComponents/errorPage/ErrorPage';
import { LoadingPage } from '../loadingComponents/LoadingPage';
import { Drink, AlcoholSelectProps } from '../../types';


export const AlcoholSelectTwo: React.FC<AlcoholSelectProps> = ({ alcohol }) => {

    const [alldrinks, setAllDrinks] = useState<Drink[]>([])
    const [displayName, setDisplayName] = useState<string>("")


    const { data: cocktailsByBase, isLoading, isError } = CocktailsByBaseDrinkApi(String(alcohol) || "");

    const { data: cocktailBase, isLoading: cocktailBaseLoading, isError: cocktailBaseIsError } = CocktailAlcoholType();


    const filterCocktailsByBase = async () => {
        if (cocktailsByBase) {
            let getAllCocktails = await cocktailsByBase.drinks.results
            setAllDrinks(getAllCocktails)
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



    return (
        <section className="allDrinksBackground" style={{ backgroundImage: BackgroundPics(slugify(displayName)) }}>
            <div className="container">
                <div className="allDrinksContainer">
                    <div className="baseAlcTitleContainerTwo">
                        <h1 id="baseAhotName">{displayName}</h1>
                        <h2>Drinks & Cocktails</h2>
                    </div>
                    <ul className="linksToDrinksContainer">
                        {alldrinks && alldrinks.sort((a, b) => a.drink_name > b.drink_name ? 1 : -1).map((ad, adIdx) => (
                            <React.Fragment key={adIdx}>
                                {(window.innerWidth > 600) ? (window.innerWidth > 1080) ? (
                                    <li>
                                        <ToolTip text={ad.drink_name}>
                                            <Link
                                                key={ad.id}
                                                className="linktoRecipeTwo"
                                                to={`/${slugify(alcohol)}/${slugify(ad.drink_name)}`}
                                                aria-label={`View the recipe for ${ad.drink_name}`}
                                            >
                                                {String(ad.drink_name).length < 16 ? String(ad.drink_name) : String(ad.drink_name).slice(0, 14) + "..."}
                                            </Link>
                                        </ToolTip>
                                    </li>
                                ) : (<li>
                                    <ToolTip text={ad.drink_name}>
                                        <Link
                                            key={ad.id}
                                            className="linktoRecipeTwo"
                                            to={`/${slugify(alcohol)}/${slugify(ad.drink_name)}`}
                                            aria-label={`View the recipe for ${ad.drink_name}`}
                                        >
                                            {String(ad.drink_name).length < 13 ? ad.drink_name : String(ad.drink_name).slice(0, 11) + "..."}
                                        </Link>
                                    </ToolTip>
                                </li>) : (
                                    <li>
                                        <ToolTip text={ad.drink_name}>
                                            <Link
                                                key={ad.id}
                                                className="linktoRecipeTwo"
                                                to={`/${slugify(alcohol)}/${slugify(ad.drink_name)}`}
                                                aria-label={`View the recipe for ${ad.drink_name}`}
                                            >
                                                {String(ad.drink_name).length < 11 ? ad.drink_name : String(ad.drink_name).slice(0, 11) + "..."}
                                            </Link>
                                        </ToolTip>
                                    </li>
                                )}
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}
