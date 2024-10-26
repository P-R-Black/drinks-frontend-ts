import React, { useState } from 'react'
import './footer.css'

import { Logo } from '../logo/Logo'
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { HashLink } from 'react-router-hash-link'
import { NavLink, Link } from 'react-router-dom';
import { PrivacyChoice } from '../../privacyPolicy/PrivacyChoice';

export const Footer = () => {
    const [buttonPopUp, setButtonPopUp] = useState(false);
    var date = new Date()
    var year = date.getFullYear();

    return (
        <>
            <section id="footerSection" className='footerSection' role="contentinfo">
                <div className='footerContainer container'>
                    <div className="footerLogoSocials">
                        <Logo />
                        <div className="footerSocials">
                            <a href="/" className="skip-to-content">Skip to main content</a>
                            <Link
                                className="footerSocials"
                                to="https://www.facebook.com/profile.php?id=61560894480981"
                                target="_blank"
                                aria-label="Facebook page"
                            > <FaFacebookF />
                            </Link>
                            <Link
                                className="footerSocials"
                                to="https://www.instagram.com/keeps_guide?igsh=MXd6MnZva2VpemxsYQ%3D%3D&utm_source=qr"
                                target="_blank"
                            >
                                <FaSquareInstagram />
                            </Link>
                            <Link
                                className="footerSocials"
                                to="https://x.com/KeepsGuide"
                                target="_blank"
                                aria-label="Instagram page"
                            >
                                <FaXTwitter />
                            </Link>

                            <Link
                                className="footerSocials"
                                to="https://www.tiktok.com/@keeps.guide?_t=8n7xviIyRTj&_r=1"
                                target="_blank"
                                aria-label="TikTock page"
                            >
                                <FaTiktok />
                            </Link>

                        </div>
                    </div>
                    {window.innerWidth < 601 ? (
                        <div className="mobileDivisionContainer">
                            <ul className="footerSiteSections">
                                <HashLink to="/#dodSection">{"Drink of the Day"}</HashLink>
                                <HashLink to="/#discoverSection">{"Discover Cocktails"}</HashLink>
                                <HashLink to="/#discoverShotsSection">{"Discover Shots"}</HashLink>
                                <HashLink to="/#mocktailSection">{"Mocktails"}</HashLink>
                                <HashLink to="/#mustKnowSection">{"Bartender Must Knows"}</HashLink>
                                <NavLink to="/build-drink">{"Build A Drink"}</NavLink>
                            </ul>
                            <ul className="footerSiteInfo">
                                <NavLink to="/about-us">{"About Us"}</NavLink>
                                <NavLink to="/contact-us">{"Contact"}</NavLink>
                                <NavLink onClick={() => setButtonPopUp(true)} to="/privacy-policy">{"Privacy Choices"}</NavLink>
                                <PrivacyChoice trigger={buttonPopUp} setTrigger={setButtonPopUp} children={undefined}></PrivacyChoice>
                                <NavLink to="/privacy-policy">{"Privacy Policy"}</NavLink>
                                <NavLink to="/terms-and-conditions">{"Terms Of Service"}</NavLink>
                            </ul>
                        </div>
                    ) : (
                        <>
                            <div className="footerSiteSections">
                                <ul className="footerSiteSectionsLeft">
                                    <HashLink to="/#dodSection">{"Drink of the Day"}</HashLink>
                                    <HashLink to="/#discoverSection">{"Discover Cocktails"}</HashLink>
                                    <HashLink to="/#discoverShotsSection">{"Discover Shots"}</HashLink>
                                </ul>
                                <ul className="footerSiteSectionsRight">
                                    <HashLink to="/#mocktailSection">{"Mocktails"}</HashLink>
                                    <HashLink to="/#mustKnowSection">{"Bartender Must Knows"}</HashLink>
                                    <NavLink to="/build-drink">{"Build A Drink"}</NavLink>

                                </ul>
                            </div>
                            <ul className="footerSiteInfo">
                                <NavLink to="/about-us">{"About Us"}</NavLink>
                                <NavLink to="/contact-us">{"Contact"}</NavLink>
                                <NavLink onClick={() => setButtonPopUp(true)} to="/privacy-policy">{"Privacy Choices"}</NavLink>
                                <PrivacyChoice trigger={buttonPopUp} setTrigger={setButtonPopUp} children={undefined}></PrivacyChoice>
                                <NavLink to="/privacy-policy">{"Privacy Policy"}</NavLink>
                                <NavLink to="/terms-and-conditions">{"Terms Of Service"}</NavLink>
                            </ul>
                        </>
                    )}

                </div>
            </section>
            <section className='postFooter'>
                <div className="container">
                    <div className="postFooterContainer">
                        <div className="createBySection">Created By:
                            <Link
                                className="createdBy"
                                to="https://paulrblack.com/"
                            > Paul B
                            </Link>
                        </div>
                        <div className="copyrightSection">
                            <div className="copyrightYear">&copy; {year} Keep's Guide</div>
                        </div>
                        <div className="rightsReservedSection">
                            <div className="rightsReserved">All Rights Reserved.</div>
                        </div>
                        <div className="rightsReservedSection">
                            <Link className="apiBy" to="https://www.drinksapi.paulrblack.com/">API</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
