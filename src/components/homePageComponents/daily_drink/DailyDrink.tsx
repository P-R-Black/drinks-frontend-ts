import React, { useState, useEffect, useRef, useCallback } from 'react'
// import { Calendar } from '../calendar/Calendar'
import './dailyDrink.css'

import { Link } from 'react-router-dom'
import slugify from 'react-slugify'

import { Parallax } from 'react-parallax';
import dodImage from '../../../assets/pexels-ron-lach.jpg'
import debounce from 'lodash.debounce';
import { useOutletContext } from 'react-router-dom';


export const DailyDrink = () => {

    // const { lastDrinkOfTheDay } = useOutletContext()

    const titleRefTwo = useRef<HTMLDivElement | any>(null);
    const [dodElementVisible, setDodElementVisible] = useState<boolean>(false);

    // let today = `${months[Number(mm) - 1]} ${dd.replace(/^0+/, "")}, ${year}`

    // const debouncedHandleDateClick = useCallback(debounce(handleDateClick, 300), [handleDateClick]);


    useEffect(() => {
        const dodObserver = new IntersectionObserver((entries) => {
            const dodEntry = entries[0]
            setDodElementVisible(dodEntry.isIntersecting)

        })
        dodObserver.observe(titleRefTwo.current)

    }, [])



    return (
        <section id="dodSection" className="dodSection">
            <Parallax
                blur={{ min: -15, max: 15 }}
                bgImage={dodImage}
                bgImageAlt={"background picture of a hand boring a drink."}
                strength={500}>

                <div className="container dodOuterContainer">
                    <div ref={titleRefTwo}>
                        <h1
                            className={dodElementVisible ? `drinkOfDayTitle show` : `drinkOfDayTitle hidden`}
                        >
                            Drink of the Day
                        </h1>
                    </div>
                    {/*  <div className="dodContainer">
                        <div className={dodElementVisible ? `dodLeftSide show` : `dodLeftSide hidden`}>
                            <h2 className="todaysDrink" aria-live='polite'>
                                {!dateLookup || dateLookup === today ? "Today's Drink" : dateLookup}
                            </h2>
                            {currentDrink[0]?.length === 0 ? (
                                <h2 key="loading" role="status" aria-live="polite">Today's Drink is Loading...</h2>) : (
                                <>
                                    {currentDrink[0]?.map((cd) => (
                                        <React.Fragment key={cd.id}>
                                            <div className="dailyDrink">{!dateLookup ? lastDrinkOfTheDay['name'] : cd.drink_name}</div>

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
                                currentDrink={currentDrink}
                                lastDrinkOfTheDay={lastDrinkOfTheDay}
                                pastDrinksOfTheDay={pastDrinksOfTheDay}
                            />
                        </div>
                    </div>*/}
                </div>
            </Parallax>
        </section>
    )
}
