import React from 'react'
import './aboutUs.css'
import { Link } from 'react-router-dom'


export const AboutUs = () => {
    return (
        <section className="aboutSection" aria-labelledby='about-title'>
            <div className="container">
                <div className="aboutContainer">
                    <div className="aboutTitleContainer">
                        <h1 id="about-title">About Us</h1>
                        <h2>What is Keep's Guide</h2>
                    </div>
                    <div className="aboutParagraphContainer">
                        <p>
                            Keep's Guide is a recipe guide for working bartenders, aspiring bartenders, and home mixologists
                            who need the recipe without a backstory. Whether you're looking for a refresher on how to make
                            an old favorite or trying to find a new favorite drink, Keep's Guide will give you the
                            drink's recipe and instructions, and little else.
                        </p>
                        <p>
                            At Keep's Guide, the drink is the star of the show, no blog posts or stories about the drink's
                            origin, by the way, did you know that the Gimlet was promoted as a cure for scurvy? That's
                            probably not the first thing you want to read when you're looking up a
                            Gimlet recipe, but that's how many sites dedicated to drink recipes are structured, with paragraphs
                            about the drink, and the drink's flavor profile, as well as the drink's place in world history,
                            and burried at the bottom of the page, is where you'll find the drink's ingredients.
                        </p>
                        <p>
                            Keep's Guide aims to keep it simple, and give barkeeps and drink enthusiasts the guide needed
                            to craft delicious cocktails and shots.
                        </p>
                    </div>

                </div>
                <div className="aboutContainerTwo">
                    <div className="aboutTitleContainer">
                        <h2>Some Things to Keep in Mind</h2>
                    </div>
                    <div className="aboutDataContainer">
                        <h3>flavor profile of the cocktail</h3>
                        <p>
                            Provides a flavor profile for the drink or shot. I've updated the profiles for the drinks I
                            know. For others, I used the all knowing, always correct, information super highway to get
                            the flavor profiles. For those drinks that I haven't tasted or couldn't find a simple flavor
                            profile for, I left as "N/A".
                        </p>
                    </div>
                    <div className="aboutDataContainer">
                        <h3>base alcohol of the cocktail</h3>
                        <p>
                            I categorized cocktails and shots by the dominant alcohol found in the drink. In certain cases
                            there are cocktails and shots that have multiple alcoholic ingredients that require the same
                            measurement, in these cases I flipped a coin. Yes, I could have listed these cocktails or shots
                            under two multiple categories, but I didn't. If you encounter a cocktail you know to be a
                            "vodka" based cocktail under the "gin" cocktails, don't have a fit, it's likely that equal parts
                            vodka and gin are required and I randomly picked one. Thank you for your understanding.
                        </p>
                    </div>
                    <div className="aboutDataContainer">
                        <h3>ingredients required to make the cocktail</h3>
                        <p>
                            Warning: If you're a cocktail enthusiast, who takes issue with a recipe not being exactly how
                            you know it be, chill out. These recipes are a guide for creating a decent drink, they are
                            not the de facto instructions on concocting cocktails. So, if you're someone that adds crispy bacon
                            to your Bloody Mary or you're someone that holds the grenadine on your Tequila Sunrise,
                            great, do you!
                        </p>
                        <p style={{ marginTop: "1rem" }}>If you see something that's just wrong on our part,
                            <Link
                                to={"/contact-us"}
                                style={{ color: "red" }}> contact me
                            </Link> and let us know. Thanks!</p>
                    </div>
                    <div className="aboutDataContainer">
                        <h3>garnish suggested for cocktail</h3>
                        <p>
                            Warning: To the cocktail aficionados, these are only recommondations. If the recipes states
                            garnish with a lime wedge and you prefer to do a lemon slice, do you!
                        </p>
                    </div>
                    <div className="aboutDataContainer">
                        <h3>serving glass suggested for cocktail</h3>
                        <p>
                            A Martini shouldn't be served in an old-fashioned glass and an Old Fashion shouldn't be served
                            in a hurricane glass, but red Solo cups are acceptable for all cocktails and shots!
                        </p>
                    </div>
                    <div className="aboutDataContainer">
                        <h3>mixing directions suggested for cocktail</h3>
                        <p>
                            Some drinks need to be mixed with ice in order to be chilled and diluted, while other drinks
                            require a good shake in order for the drink to be chilled a lot and  diluted a little, I've
                            tried to write the mixing instructions with this in mind.
                        </p>
                        <p style={{ marginTop: "1rem" }}>If you see mixing instructions that are wrong or missing information,
                            <Link
                                to={"/contact-us"}
                                style={{ color: "red" }}> contact me
                            </Link> and let us know. Thanks!</p>
                    </div>
                    <div className="aboutDataContainer">
                        <h3>must know cocktails</h3>
                        <p>
                            Must know drinks are cocktails or shots that I think aspiring bartenders, party hosts
                            and home mixologists should know. Adding this was inspired by me - the patron - having to
                            tell a bartender how to make a gin & tonic.
                        </p>
                    </div>
                </div>
            </div>
        </section>

    )
}
