import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './discover.css'
import { Parallax } from 'react-parallax';
import { ToolTip } from '../../tooltip/ToolTip';
import slugify from 'react-slugify';
import { CocktailAlcoholType } from '../../../api/DrinksAPI';
import { ErrorPage } from '../../errorPageComponents/errorPage/ErrorPage';
import { LoadingPage } from '../../loadingComponents/LoadingPage';

export const Discover = () => {

    const discoverRef = useRef<HTMLDivElement | any>(null);
    const [discElementVisible, setDiscElementVisible] = useState<boolean>(false);
    const [mainAlcohols, setMainAlcohols] = useState<string[]>([])

    const { data: cocktailBase, isLoading, isError } = CocktailAlcoholType();

    useEffect(() => {
        const currentRef = discoverRef.current; // Store the ref value when the effect runs

        if (currentRef) {
            const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
                const entry = entries[0];
                setDiscElementVisible(entry.isIntersecting);
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
        const allAlcohol = async () => {

            if (cocktailBase) {
                let alcBase = await cocktailBase['results'].map((cb: any) => cb.name)
                setMainAlcohols(alcBase); // Set the resolved data
            } else {
                console.log("cocktailBase is not loaded or is empty")
            }

        };

        allAlcohol(); // Call the async function
    }, [cocktailBase]); // Empty dependency array to run only once on mount'


    if (isLoading) {
        return (<LoadingPage />);
    }

    if (isError) {
        return (<ErrorPage />);
    }


    return (
        <section id="discoverSection" className="discoverSection" aria-label="Discover your next cocktail">
            <Parallax
                blur={5}
                bgImageAlt={"background picture of a darkly lit bar shelf with alcohol bottles."}
                strength={500}>

                <div className="container">
                    <div className="discoverContainer">
                        <div className="discoverTitleContainer" ref={discoverRef} >
                            <h1 className={discElementVisible ? `discoverTitleContainerH1 show` : `discoverTitleContainerH1 hidden`} >Discover</h1>
                            <h2 className={discElementVisible ? `discoverTitleContainerH2 show` : `discoverTitleContainerH2 hidden`}>Your Next Cocktail</h2>
                        </div>
                        <div className="discLinksToDrinkContainer">
                            {mainAlcohols && mainAlcohols.sort((a, b) => a > b ? 1 : -1).map((ad) => (
                                <React.Fragment key={`/${slugify(ad)}`}>
                                    <div key={slugify(ad)} className={discElementVisible ? `discAlcLinkContainer show` : `discAlcLinkContainer hidden`}>
                                        <ToolTip text={ad}>
                                            <Link
                                                className="linktoRecipeThree"
                                                to={`/${slugify(ad)}`}
                                                aria-label={`Explore cocktails with ${ad}`}
                                            >{String(ad).length < 18 ? ad : String(ad).slice(0, 15) + "..."}
                                            </Link>
                                        </ToolTip>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </Parallax>
        </section>
    )
}
