import React, { useState, useEffect } from 'react'
import slugify from 'react-slugify';
import './navigation.css'

import { Logo } from '../logo/Logo';
import { Search } from '../search/Search';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link'


export const Navigation = () => {

    const dropDownSelection = [
        'Bourbon', 'Brandy', 'Gin', 'Mezcal', 'Non-Alcoholic', 'Rum', 'Rum (Dark)', 'Rum (Gold)',
        'Rum (Light)', 'Rum (Spiced)', 'Scotch', 'Sparkling White Wine', 'Tequila', 'Vermouth',
        'Vodka', 'Whiskey'
    ]

    const showNavMenu = () => {
        let navBarMenu = document.querySelector('.navBarMenu');
        let visibility = navBarMenu?.getAttribute('data-visible');
        let navBarDropDown: string | any = document.querySelector('.navDropdown')

        if (visibility === "false" || visibility === null) {
            navBarMenu?.setAttribute('aria-expanded', 'true');
            navBarMenu?.setAttribute('data-visible', 'true');
            navBarDropDown?.classList.add('show');


            navBarDropDown?.firstChild.focus()

            // move focus to the first link in the dropdown
            const firstLink = navBarDropDown.querySelector('a');
            if (firstLink) firstLink.focus()

        } else {
            navBarMenu?.setAttribute('aria-expanded', 'false');
            navBarMenu?.setAttribute('data-visible', 'false');
            navBarDropDown?.classList.remove('show');
            // navBarDropDown?.firstChild.focus();
        }
    }

    // const handleEscapeKey = (event) => {
    //     if (event.key === 'Escape') {
    //         // Close the dropdown menu
    //         let navBarMenu = document.querySelector('.navBarMenu');
    //         let navBarDropdown = document.querySelector('.navDropdown');

    //         navBarMenu.setAttribute('aria-expanded', 'false');
    //         navBarMenu.setAttribute('data-visible', 'false');
    //         navBarDropdown.classList.remove('show');

    //         // Return focus to the button that opened the menu
    //         navBarMenu.focus();
    //     }
    // };

    // useEffect(() => {
    //     // Add event listener for keydown
    //     document.addEventListener('keydown', handleEscapeKey);

    //     // Cleanup event listener on unmount
    //     return () => {
    //         document.removeEventListener('keydown', handleEscapeKey);
    //     };
    // }, []);


    // const fetchAlcoholType = async () => {
    //     let filteredBase = []
    //     for (let d = 0; d < drinks?.length; d++) {
    //         let base = drinks?.map((ba) => ba.base_alcohol)
    //         for (let b = 0; b < base.length; b++) {
    //             let baseText = await base[b][0]
    //             if (!filteredBase.includes(baseText)) {
    //                 filteredBase.push(baseText)

    //             }
    //         }
    //         return filteredBase.sort()
    //     }
    // }


    return (
        <>
            {(window.innerWidth > 600) ? (window.innerWidth > 1080) ? (
                <nav className="navbar">
                    <div className="container">
                        <div className="navbarContainer">
                            <div id="logoId">
                                <Logo />
                            </div>
                            <form className="searchId">
                                <Search />
                            </form>
                            <button className="navBarMenu" id="navBarMenu" aria-controls="navBarMenu"
                                aria-expanded="false"
                                onClick={showNavMenu}
                            // onClick={() => { showNavMenu(); fetchAlcoholType() }}
                            >
                                <span className="bar kg-only"></span>
                                <span className="bar kg-only"></span>
                                <span className="bar kg-only"></span>
                                <span className="bar kg-only"></span>
                            </button>
                            <ul className="navDropdown">
                                <HashLink
                                    onClick={showNavMenu}
                                    to="/#dodSection"
                                    className="dodNav">Drink of the Day
                                </HashLink>
                                <hr className='navline' />
                                <HashLink
                                    onClick={showNavMenu}
                                    to="/#discoverSection"
                                    className="dodNav">Discover Cocktail By Alcohol
                                </HashLink>
                                <ul className="navDropdownByDrink" data-visible="false">
                                    {dropDownSelection.map((ba, idx) => {
                                        return (
                                            <Link
                                                key={slugify(idx)}
                                                className="navbarLinks"
                                                to={`/${slugify(ba)}`}
                                                onClick={showNavMenu}
                                            >{ba}
                                            </Link>
                                        )
                                    })}
                                </ul>
                                <hr className='navline' />
                                <HashLink onClick={showNavMenu}
                                    to="/#discoverShotsSection"
                                    className="dodNav">Discover Shots By Alcohol
                                </HashLink>
                                <hr className='navline' />
                                <HashLink onClick={showNavMenu}
                                    to="/#mocktailSection"
                                    className="dodNav">Mocktails
                                </HashLink>
                                <hr className='navline' />
                                <HashLink
                                    onClick={showNavMenu}
                                    to="/#mustKnowSection"
                                    className="dodNav">Bartender Must Know Drinks
                                </HashLink>
                                <hr className='navline' />
                                <Link
                                    onClick={showNavMenu}
                                    to="/build-drink"
                                    className="dodNav">Build A Drink
                                </Link>
                            </ul>
                        </div>
                    </div>
                </nav>
            ) : (
                <nav className="navbar">
                    <div className="container">
                        <div className="navbarContainer">
                            <div id="logoId">
                                <Logo />
                            </div>
                            <form className="searchId">
                                <Search />
                            </form>
                            <button className="navBarMenu" id="navBarMenu" aria-controls="navBarMenu"
                                aria-expanded="false"
                                onClick={showNavMenu}
                            // onClick={() => { showNavMenu(); fetchAlcoholType() }}
                            >
                                <span className="bar kg-only"></span>
                                <span className="bar kg-only"></span>
                                <span className="bar kg-only"></span>
                                <span className="bar kg-only"></span>
                            </button>
                            <ul className="navDropdown">
                                <HashLink
                                    onClick={showNavMenu}
                                    to="/#dodSection"
                                    className="dodNav">Drink of the Day
                                </HashLink>
                                <hr className='navline' />
                                <HashLink
                                    onClick={showNavMenu}
                                    to="/#discoverSection"
                                    className="dodNav">Discover Cocktail By Alcohol
                                </HashLink>
                                <ul className="navDropdownByDrink" data-visible="false">
                                    {dropDownSelection.map((ba, idx) => {
                                        return (
                                            <Link
                                                key={slugify(idx)}
                                                className="navbarLinks"
                                                to={`/${slugify(ba)}`}
                                                onClick={showNavMenu}
                                            >{ba}
                                            </Link>
                                        )
                                    })}
                                </ul>
                                <hr className='navline' />
                                <HashLink onClick={showNavMenu}
                                    to="/#discoverShotsSection"
                                    className="dodNav">Discover Shots By Alcohol
                                </HashLink>
                                <hr className='navline' />
                                <HashLink onClick={showNavMenu}
                                    to="/#mocktailSection"
                                    className="dodNav">Mocktails
                                </HashLink>
                                <hr className='navline' />
                                <HashLink
                                    onClick={showNavMenu}
                                    to="/#mustKnowSection"
                                    className="dodNav">Bartender Must Know Drinks
                                </HashLink>
                                <hr className='navline' />
                                <Link
                                    onClick={showNavMenu}
                                    to="/build-drink"
                                    className="dodNav">Build A Drink
                                </Link>

                            </ul>
                        </div>
                    </div>
                </nav>) : (
                <>
                    <nav className="navbar">
                        <div className="container">
                            <div className="navbarContainer">
                                <div id="logoId">
                                    <Logo />
                                </div>
                                <button className="navBarMenu" id="navBarMenu" aria-controls="navBarMenu"
                                    aria-expanded="false"
                                    onClick={showNavMenu}
                                // onClick={() => { showNavMenu(); fetchAlcoholType() }}
                                >
                                    <span className="bar kg-only"></span>
                                    <span className="bar kg-only"></span>
                                    <span className="bar kg-only"></span>
                                    <span className="bar kg-only"></span>
                                </button>
                                <ul className="navDropdown">
                                    <HashLink
                                        onClick={showNavMenu}
                                        to="/#dodSection"
                                        className="dodNav">Drink of the Day
                                    </HashLink>
                                    <hr className='navline' />
                                    <HashLink
                                        onClick={showNavMenu}
                                        to="/#discoverSection"
                                        className="dodNav">Discover Cocktail By Alcohol
                                    </HashLink>
                                    <ul className="navDropdownByDrink" data-visible="false">
                                        {dropDownSelection.map((ba, idx) => {
                                            return (
                                                <Link
                                                    key={slugify(idx)}
                                                    className="navbarLinks"
                                                    to={`/${slugify(ba)}`}
                                                    onClick={showNavMenu}
                                                >{ba}
                                                </Link>
                                            )
                                        })}
                                    </ul>
                                    <hr className='navline' />
                                    <HashLink onClick={showNavMenu}
                                        to="/#discoverShotsSection"
                                        className="dodNav">Discover Shots By Alcohol
                                    </HashLink>
                                    <hr className='navline' />
                                    <HashLink onClick={showNavMenu}
                                        to="/#mocktailSection"
                                        className="dodNav">Mocktails
                                    </HashLink>
                                    <hr className='navline' />
                                    <HashLink
                                        onClick={showNavMenu}
                                        to="/#mustKnowSection"
                                        className="dodNav">Bartender Must Know Drinks
                                    </HashLink>
                                    <hr className='navline' />
                                    <Link
                                        onClick={showNavMenu}
                                        to="/build-drink"
                                        className="dodNav">Build A Drink
                                    </Link>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <form className="mobileNavContainer">
                        <Search />
                    </form>
                </>
            )}
        </>
    )
}

