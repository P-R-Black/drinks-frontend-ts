import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './discover.css'
import { Parallax } from 'react-parallax';
import { ToolTip } from '../../tooltip/ToolTip';
import slugify from 'react-slugify';
import { CocktailAlcoholType } from '../../../api/DrinksAPI';

export const Discover = () => {

    const discoverRef = useRef<HTMLDivElement | any>(null);
    const [discElementVisible, setDiscElementVisible] = useState<boolean>(false);
    const [mainAlcohols, setMainAlcohols] = useState([])

    const { data: cocktailBase, isLoading, isError, error } = CocktailAlcoholType();


    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0]
            setDiscElementVisible(entry.isIntersecting)

        })
        observer.observe(discoverRef.current)
    })

    useEffect(() => {
        const allAlcohol = async () => {
            if (cocktailBase) {
                let alcBase = await cocktailBase.map((cb: any) => cb.name)
                setMainAlcohols(alcBase); // Set the resolved data
            }

        };

        allAlcohol(); // Call the async function
    }, [cocktailBase]); // Empty dependency array to run only once on mount'

    if (isLoading) {
        return (<div>Loading...</div>);
    }

    if (isError) {
        return (<div>Error: {error.message}</div>);
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
                            {mainAlcohols.map((ad) => (
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