import React, { useState, useEffect, useRef } from 'react'
import { Calendar } from '../calendar/Calendar'
import './dailyDrink.css'

import { Link } from 'react-router-dom'
import slugify from 'react-slugify'

import { Parallax } from 'react-parallax';
import dodImage from '../../../assets/pexels-ron-lach.jpg'



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

interface DailyDrinkProps {
    date: Date;
    year: number;
    month: number;
    dd: string;
    mm: string;
    todaysDrinkOfTheDay: any;
    currentDrink: Drink[];
    dateLookup: string | undefined;
    months: string[];
    handleDateClick: (date: string) => void;
    pastDrinksOfTheDay: any;
}

export const DailyDrink: React.FC<DailyDrinkProps> = (
    { date, year, month, dd, mm, todaysDrinkOfTheDay, currentDrink, handleDateClick,
        dateLookup, months, pastDrinksOfTheDay }
) => {
    const titleRefTwo = useRef<HTMLDivElement | any>(null);
    const [dodElementVisible, setDodElementVisible] = useState<boolean>(false);
    let today = `${months[Number(mm) - 1]} ${dd.replace(/^0+/, "")}, ${year}`

    // const debouncedHandleDateClick = useCallback(debounce(handleDateClick, 200), [handleDateClick]);

    useEffect(() => {
        const currentRef = titleRefTwo.current; // Store the ref value when the effect runs

        if (currentRef) {
            const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
                const entry = entries[0];
                setDodElementVisible(entry.isIntersecting);
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



    return (
        <section id="dodSection" className="dodSection">
            <Parallax
                blur={{ min: -15, max: 15 }}
                bgImage={dodImage}
                bgImageAlt={"background picture of a hand boring a drink."}
                strength={500}>

                <div className="container dodOuterContainer">
                    <div ref={titleRefTwo}>
                        <h1 className={dodElementVisible ? `drinkOfDayTitle show` : `drinkOfDayTitle hidden`}>
                            Drink of the Day
                        </h1>
                    </div>
                    <div className="dodContainer">
                        <div className={dodElementVisible ? `dodLeftSide show` : `dodLeftSide hidden`}>
                            <h2 className="todaysDrink" aria-live='polite'>
                                {!dateLookup || dateLookup === today ? "Today's Drink" : dateLookup}
                            </h2>

                            {currentDrink.length === 0 ? (
                                <h2 key="loading" role="status" aria-live="polite">Today's Drink is Loading...</h2>) : (
                                <>
                                    {currentDrink?.map((cd: any, cdIdx) => (
                                        <React.Fragment key={cdIdx}>
                                            <div className="dailyDrink">{!dateLookup ? todaysDrinkOfTheDay : (cd).drink_name}</div>

                                            <Link className="recipeButton" to={`/${slugify(cd.base_alcohol)}/${slugify(cd.drink_name)}`}>
                                                <button aria-label={`View the recipe for ${cd.drink_name}`}>Recipe</button>
                                            </Link>
                                        </React.Fragment>
                                    ))}


                                </>
                            )}

                        </div>

                        <div className={dodElementVisible ? `dodRightSide show` : `dodRightSide hidden`}>
                            <h2 className="boxTitle">Past Drink of the Day</h2>
                            <Calendar
                                date={date}
                                year={year}
                                month={month}
                                handleDateClick={handleDateClick}
                                todaysDrinkOfTheDay={todaysDrinkOfTheDay}
                                pastDrinksOfTheDay={pastDrinksOfTheDay} />
                        </div>
                    </div>
                </div>
            </Parallax>
        </section>
    )
}
