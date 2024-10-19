import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './discoverShots.css'
import { Parallax } from 'react-parallax';
import { ToolTip } from '../../tooltip/ToolTip';
import slugify from 'react-slugify';
import { ShotsAlcoholType } from '../../../api/DrinksAPI';



export const DiscoverShots = () => {

    const discoverShotRef = useRef<HTMLDivElement | null>(null);
    const [discElementVisible, setDiscElementVisible] = useState<boolean>(false);
    const [shotByBase, setShotByBase] = useState([]);

    const { data: shotBase, isLoading: shotBaseIsLoading, isError: shotBaseIsError, error: shotBaseError } = ShotsAlcoholType();

    useEffect(() => {
        const currentRef = discoverShotRef.current; // Store the ref value when the effect runs

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
            if (shotBase) {
                let alcBase = await shotBase.map((cb: any) => cb.name)
                setShotByBase(alcBase); // Set the resolved data
            }

        };

        allAlcohol(); // Call the async function
    }, [shotBase]); // Empty dependency array to run only once on mount'

    if (shotBaseIsLoading) {
        return (<div>Loading...</div>);
    }

    if (shotBaseIsError) {
        return (<div>Error: {shotBaseError.message}</div>);
    }



    return (
        <section className="discoverShotsSection" id="discoverShotsSection" aria-label="Discoveer your next shot">
            <Parallax
                blur={5}
                strength={500}
                bgImageAlt={"background image of a shot glass with a lime next to the glass."}
            >
                <div className="container">
                    <div className="discoverShotsContainer">
                        <div className="discoverShotsTitleContainer" ref={discoverShotRef}>
                            <h1 className={discElementVisible ? `discoverShotsTitleContainerH1 show` : `discoverShotsTitleContainerH1 hidden`} >Shots</h1>
                        </div>
                        <div className={discElementVisible ? `discShotsLinksToDrinkContainer show` : `discShotsLinksToDrinkContainer hidden`}>

                            {shotByBase.map((ad, adIdx) => (
                                <React.Fragment key={adIdx} >
                                    <div className={discElementVisible ? `shotsAlcLinkContainer show` : `shotsAlcLinkContainer hidden`}>
                                        <ToolTip text={ad}>
                                            <Link
                                                className="linktoRecipeFour"
                                                to={`/${slugify(ad)}/shot`}
                                                aria-label={`Explore shots with ${ad}`}
                                            >
                                                {String(ad).length < 18 ? ad : String(ad).slice(0, 15) + "..."}
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