import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToolTip } from '../tooltip/ToolTip';
import { BackgroundPics } from '../../BackgroundPics';
import slugify from 'react-slugify';
import './shotSelectTwo.css';
import { ShotsAlcoholType, ShotsByBaseDrinkApi } from '../../api/DrinksAPI';
import { AlcoholSelectProps, Drink } from '../../types';




export const ShotsSelectTwo: React.FC<AlcoholSelectProps> = ({ alcohol }) => {
    const [allShots, setallShots] = useState<Drink[]>([])
    const [displayName, setDisplayName] = useState<string>("")

    const { data: shotsByBase, isLoading: shotsByBaseIsLoading, isError: shotsByBaseIsError, error: shotsByBaseError } = ShotsByBaseDrinkApi(String(alcohol) || "");
    const { data: shotBase, isLoading: shotBaseLoading, isError: shotBaseIsError, error: shotBaseError } = ShotsAlcoholType();

    const filterShotsByBase = async () => {
        if (shotsByBase) {
            let getAllCocktails = await shotsByBase.drinks.results;
            setallShots(getAllCocktails)
        }
    }


    const getDisplayName = (alcohol: string | undefined) => {
        if (shotBase) {
            const dataResults = shotBase
            const foundItem = dataResults.results.find((item: { slug: string; }) => item.slug === alcohol)
            setDisplayName(foundItem ? foundItem.name : null)
        }
    };

    useEffect(() => {
        filterShotsByBase()
        getDisplayName(alcohol)
    })

    if (shotBaseLoading) {
        return (<div>Loading...</div>);
    }

    if (shotBaseIsError) {
        return (<div>Error: {shotBaseError.message}</div>);
    }

    if (shotsByBaseIsLoading) {
        return (<div>Loading...</div>);
    }

    if (shotsByBaseIsError) {
        return (<div>Error: {shotsByBaseError.message}</div>);
    }


    // removes display name from array
    // let newDisplayName;

    // for (let i of displayName) {
    //     newDisplayName = i
    //     break
    // }



    // useEffect(() => {
    //     setallDrinks(preSetDrinks => {
    //         const sortedList = allShots.filter((sl) => slugify(sl.base_alcohol[0]) === alcohol)
    //             .map(fd => fd.drink_name).sort();
    //         return sortedList
    //     })

    // }, [displayName, allShots, alcohol])


    return (
        <section className="allShotsBackground" style={{ backgroundImage: BackgroundPics(slugify(alcohol)) }}>
            <div className="container">
                <div className="allShotsContainer">
                    <div className="baseShotTitleContainerTwo">
                        <h1 id="baseShotName">{displayName}</h1>
                        <h2>Shots</h2>
                    </div>
                    <div className="linksToShotContainer">
                        {allShots && allShots.sort((a, b) => a.drink_name > b.drink_name ? 1 : -1).map((ad, adIdx) => (
                            <React.Fragment key={adIdx}>
                                {(window.innerWidth > 600) ? (window.innerWidth > 1080) ? (
                                    <>
                                        <ToolTip text={ad.drink_name}>
                                            <Link
                                                key={ad.id}
                                                className="linktoShotRecipeTwo"
                                                to={`/${slugify(alcohol)}/${slugify(ad.drink_name)}`}>
                                                {String(ad.drink_name).length < 18 && window.innerWidth > 1024 ? ad.drink_name : String(ad.drink_name).slice(0, 11) + "..."}
                                            </Link>
                                        </ToolTip>
                                    </>
                                ) : (<>
                                    <ToolTip text={ad.drink_name}>
                                        <Link
                                            key={ad.id}
                                            className="linktoShotRecipeTwo"
                                            to={`/${slugify(alcohol)}/${slugify(ad.drink_name)}`}>
                                            {String(ad.drink_name).length < 13 && window.innerWidth > 601 ? ad.drink_name : String(ad.drink_name).slice(0, 11) + "..."}
                                        </Link>
                                    </ToolTip>
                                </>) : (
                                    <>
                                        <ToolTip text={ad.drink_name}>
                                            <Link
                                                key={ad.id}
                                                className="linktoShotRecipeTwo"
                                                to={`/${slugify(alcohol)}/${slugify(ad.drink_name)}`}>
                                                {String(ad.drink_name).length < 11 && window.innerWidth < 601 ? ad.drink_name : String(ad.drink_name).slice(0, 11) + "..."}
                                            </Link>
                                        </ToolTip>
                                    </>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
