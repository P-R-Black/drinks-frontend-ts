import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './shotSelect.css';
import slugify from 'react-slugify';
import { BackgroundPics } from '../../BackgroundPics';
import { ShotsAlcoholType, ShotsByBaseDrinkApi } from '../../api/DrinksAPI';
import { AlcoholSelectProps, Drink } from '../../types';




export const ShotSelect: React.FC<AlcoholSelectProps> = ({ alcohol }) => {

    const [filteredShot, setFilteredShot] = useState<Drink[]>([])
    const [displayName, setDisplayName] = useState<string>("")


    const { data: shotsByBase, isLoading: shotsByBaseIsLoading, isError: shotsByBaseIsError, error: shotsByBaseError } = ShotsByBaseDrinkApi(String(alcohol) || "");
    const { data: shotBase, isLoading: shotBaseLoading, isError: shotBaseIsError, error: shotBaseError } = ShotsAlcoholType();


    const filterShotsByBase = async () => {
        if (shotsByBase) {
            let getAllCocktails = await shotsByBase.drinks.results
            setFilteredShot(getAllCocktails)
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



    // const scrollers = document.querySelectorAll('.shotListContainer')
    // if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    //     addAnimation();
    // }


    // function addAnimation() {
    //     scrollers.forEach(scroller => {
    //         let test = scroller.getAttribute("data-animated")

    //         if (test !== 'true') {
    //             scroller.setAttribute("data-animated", true)
    //             const scrollerInner = scroller.querySelector('.shotListUl');
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
        <section className="shotSelectBackground" style={{ backgroundImage: BackgroundPics(slugify(alcohol)) }}>
            <div className="container">
                <div className="baseShotAlcoholContainer">
                    <div className="baseShotAlcTitleContainer">
                        <h1 id="baseShotAlcoholName">{displayName}</h1>
                        <h2>Shots</h2>
                    </div>
                    <div className="shotListContainer">
                        <ul className="shotListUl" style={{ animationDuration: `${(filteredShot.length * 100) / 20}s` }}>
                            {filteredShot && filteredShot.sort((a, b) => a.drink_name > b.drink_name ? 1 : -1).map((fd, idx) => {
                                return (
                                    <React.Fragment key={idx}>
                                        <li className="shotListLi">{fd.drink_name}
                                            <Link to={`/${slugify(alcohol)}/${slugify(fd.drink_name)}`} className="ShotlinktoRecipe">Recipe</Link>
                                        </li>
                                    </React.Fragment>
                                )
                            })}
                            {filteredShot && filteredShot.sort((a, b) => a.drink_name > b.drink_name ? 1 : -1).map((fd, idx) => {
                                return (
                                    <React.Fragment key={idx}>
                                        <li className="shotListLi">{fd.drink_name}

                                            <Link to={`/${slugify(alcohol)}/${slugify(fd.drink_name)}`} className="ShotlinktoRecipe">Recipe</Link>
                                        </li>
                                    </React.Fragment>
                                )
                            })}

                        </ul>
                        <div className="moreShotLinkContainer">
                            <Link to={`/${slugify(displayName)}/all_shots`} className="linktoRecipeLarge">All {displayName} Shots</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>


    )
}

