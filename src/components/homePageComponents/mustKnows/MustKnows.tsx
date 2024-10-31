import React, { useEffect, useState } from 'react'
import './mustKnows.css'
import slugify from 'react-slugify'
import { Link } from 'react-router-dom'

import { MustKnowDrinkApi } from '../../../api/DrinksAPI'
import { LoadingPage } from '../../loadingComponents/LoadingPage'
import { ErrorPage } from '../../errorPageComponents/errorPage/ErrorPage'
import { Drink } from '../../../types'


export const MustKnows = () => {
    const [mustKnows, setMustKnows] = useState<Drink[]>([])

    const { data: mustKnowCocktails, isLoading, isError } = MustKnowDrinkApi();

    const filterCocktailsByBase = async () => {
        if (mustKnowCocktails) {
            let getAllMustKnowCocktails = await mustKnowCocktails.drinks
            setMustKnows(getAllMustKnowCocktails)
        }

    }

    useEffect(() => {
        filterCocktailsByBase()
    })

    if (isLoading) {
        return (<LoadingPage />);
    }

    if (isError) {
        return (<ErrorPage />);
    }


    return (
        <section id="mustKnowSection" className="mustKnowSection" aria-label="Must know drinks for bartenders">
            <div className="container">
                <div className="mustKnowContainer">
                    <div className="mustKnowTitleContainer">
                        <h1 className='mustKnowTitleContainerH1'>{mustKnows?.length}</h1>
                        <h2 className='mustKnowTitleContainerH2'>Must Know Drinks For Bartenders</h2>
                    </div>
                    <div className="drinkGlassContainer">
                        {mustKnows && mustKnows.sort((a, b) => a.drink_name > b.drink_name ? 1 : -1).map((mk) => {
                            return (
                                <div key={mk.id} className="drinkGlass">
                                    <Link
                                        to={`/${slugify(mk.base_alcohol)}/${slugify(mk.drink_name)}`}
                                        aria-label={`Learn more about ${mk.drink_name}`}
                                    >
                                        <h2>{mk.drink_name}</h2>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}


