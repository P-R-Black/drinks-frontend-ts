import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';

import './mocktails.css'
import { Parallax, Background } from 'react-parallax';
import mocktailImage from '../../../assets/pexels-mocktails.jpg'
import slugify from 'react-slugify';
import { CocktailsByBaseDrinkApi } from '../../../api/DrinksAPI';
import { ErrorPage } from '../../errorPageComponents/errorPage/ErrorPage';
import { LoadingPage } from '../../loadingComponents/LoadingPage';


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


export const Mocktails = () => {

    const mocktailTitleRef = useRef<HTMLDivElement | null>(null);
    const toolTipCardRef = useRef<HTMLDivElement | null>(null);

    const [mocktailElementVisible, setMocktailElementVisible] = useState<boolean>(false);
    const [toolTipCardVisible, seTToolTipCardtVisible] = useState<boolean>(false);
    const [mocktails, setMocktails] = useState<Drink[]>([]);


    const { data: cocktailsByBase, isLoading, isError } = CocktailsByBaseDrinkApi(String("non-alcoholic") || "");


    const filterCocktailsByBase = async () => {
        if (cocktailsByBase) {
            let getAllCocktails = await cocktailsByBase.drinks
            setMocktails(getAllCocktails)
        }

    }


    useEffect(() => {
        const currentRef = mocktailTitleRef.current; // Store the ref value when the effect runs

        if (currentRef) {
            const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
                const entry = entries[0];
                setMocktailElementVisible(entry.isIntersecting);
                seTToolTipCardtVisible(entry.isIntersecting)
            });

            // Observe the element
            observer.observe(currentRef);

            // Clean up observer on component unmount
            return () => {
                if (currentRef) {
                    observer.unobserve(currentRef); // Use the stored ref value for cleanup
                }
            };
        }
    });


    useEffect(() => {
        filterCocktailsByBase()
    })

    if (isLoading) {
        return (<LoadingPage />);
    }

    if (isError) {
        return (<ErrorPage />);
    }


    // normal screen => medium screen => small screen
    return (
        <section id="mocktailSection" className="moctailSection" aria-label="Non-Alcoholic Drink Options">
            <Parallax>
                <Background>
                    {(window.innerWidth > 600) ? (window.innerWidth > 1080) ? (<img
                        src={mocktailImage} className='parallaxDiscoverImage' style={{
                            position: "absolute",
                            height: "auto", width: "100vw", backfaceVisibility: "hidden",
                            transform: 'translate3d(-50%, -49.5868px, 0px)', left: "50%", transformStyle: 'preserve-3d',
                            backgroundSize: "cover"
                        }} alt=""
                    />) : (<img
                        src={mocktailImage} className='parallaxDiscoverImage' style={{
                            position: "absolute",
                            height: "auto", width: "auto", backfaceVisibility: "hidden",
                            transform: 'translate3d(-50%, -49.5868px, 0px)', left: "50%", transformStyle: 'preserve-3d',
                            backgroundSize: "cover"
                        }} alt=""
                    />) : (<img
                        src={mocktailImage} className='parallaxDiscoverImage' style={{
                            position: "absolute",
                            height: "auto", width: "auto", backfaceVisibility: "hidden",
                            transform: 'translate3d(-50%, -49.5868px, 0px)', left: "50%", transformStyle: 'preserve-3d',
                            backgroundSize: "cover"
                        }} alt=""
                    />)}

                </Background>
                <div className="container">
                    <div className="mocktailContainer">
                        <div className="mocktailTitleContainer" ref={mocktailTitleRef}>
                            <>
                                <h1 className={mocktailElementVisible ? `mocktailTitleH1 show` : `mocktailTitleH1 hidden`} aria-live="polite">Mocktails</h1>
                                <h2 className={mocktailElementVisible ? `mocktailTitleH2 show` : `mocktailTitleH2 hidden`} aria-live="polite">No Alcohol, No Problem</h2>
                            </>
                        </div>
                        <div className="MockLinksToDrinksContainerCard">
                            {mocktails.map((mt) => (
                                <div
                                    ref={toolTipCardRef}
                                    className={toolTipCardVisible ? `toolTipCards show` : `toolTipCards hidden`}
                                    key={mt.id}
                                    aria-live="polite"
                                >

                                    <Link className="linktoRecipeThreeCard"
                                        to={`/${slugify(mt.base_alcohol)}/${slugify(mt.drink_name)}`}
                                        aria-label={`View the recipe for ${mt.drink_name}`}
                                    >
                                        {mt.drink_name}
                                    </Link>
                                    <ol className="mockIngredientContainer">
                                        {mt.ingredients.map((min, minIndex) => (
                                            <li key={minIndex} className="mockIngredients">
                                                {min.replace(min.split(" ")[0], "").replace(min.split(" ")[1], "")
                                                    .trim()}</li>
                                        ))}
                                    </ol>

                                    <Link
                                        className="linktoRecipe"
                                        to={`/${slugify(mt.base_alcohol)}/${slugify(mt.drink_name)}`}
                                        aria-label={`Get the full recipe for ${mt.drink_name}`}
                                    >
                                        Recipe
                                    </Link>

                                </div >
                            ))}
                            <Link className={toolTipCardVisible ? `mocktailMore show` : `mocktailMore hidden`}
                                to={"/non-alcoholic"}
                                aria-label="See more non-alcoholic drinks"
                            >
                                More
                            </Link>

                        </div>
                    </div>
                </div>
            </Parallax>
        </section>
    )
}
