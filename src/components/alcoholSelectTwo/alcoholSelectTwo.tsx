import React, { useState, useEffect } from 'react';
import slugify from 'react-slugify';

import { Link } from 'react-router-dom';
import { ToolTip } from '../tooltip/ToolTip';
import './alcoholSelectTwo.css';
import { BackgroundPics } from '../../BackgroundPics';
import { CocktailAlcoholType, CocktailsByBaseDrinkApi } from '../../api/DrinksAPI';

interface AlcoholSelectProps {
    alcohol: string | undefined;
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

export const AlcoholSelectTwo: React.FC<AlcoholSelectProps> = ({ alcohol }) => {

    const [alldrinks, setAllDrinks] = useState<Drink[]>([])
    const [displayName, setDisplayName] = useState<string>("")


    const { data: cocktailsByBase, isLoading, isError, error } = CocktailsByBaseDrinkApi(String(alcohol) || "");

    const { data: cocktailBase, isLoading: cocktailBaseLoading, isError: cocktailBaseIsError, error: cocktailBaseError } = CocktailAlcoholType();


    const filterCocktailsByBase = async () => {
        if (cocktailsByBase) {
            let getAllCocktails = await cocktailsByBase.drinks
            setAllDrinks(getAllCocktails)
        }

    }

    const getDisplayName = (alcohol: string | undefined) => {
        const foundItem = cocktailBase.find((item: { slug: string; }) => item.slug === alcohol);
        setDisplayName(foundItem ? foundItem.name : null)
    };


    useEffect(() => {
        filterCocktailsByBase()
        getDisplayName(alcohol)
    })

    if (isLoading) {
        return (<div>Loading...</div>);
    }

    if (isError) {
        return (<div>Error: {error.message}</div>);
    }

    if (cocktailBaseLoading) {
        return (<div>Loading...</div>);
    }

    if (cocktailBaseIsError) {
        return (<div>Error: {cocktailBaseError.message}</div>);
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
                        {alldrinks.map((ad, adIdx) => (
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