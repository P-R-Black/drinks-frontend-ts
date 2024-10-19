import { Parallax } from 'react-parallax';
import React from 'react'
import midSectionImage from '../../assets/pexels-furkanvari-side.jpg'
import './midsection.css'



export const MidSection = () => (
    <section id="midSection">
        <Parallax
            className="midSection"
            blur={3}
            bgImage={midSectionImage}
            bgImageAlt={midSectionImage}
            strength={800}>
            <h1 className="drinkOfDayTitle">{"Please Drink Responsibly"}</h1>
        </Parallax>
    </section>

);

export const MidSectionTwo = () => (
    <section id="midSectionTwo">
        <Parallax
            className="midSectionTwo"
            blur={3}
            bgImage={midSectionImage}
            bgImageAlt={midSectionImage}
            strength={800}>
            <div className="container">
                <h3 className="midsectionQuote">
                    {'"Shake the shaker as hard as you can: don\'t just rock it: you are trying to wake it up, not send it to sleep!" - Harry Craddock '}
                </h3>
            </div>
        </Parallax>
    </section>

);