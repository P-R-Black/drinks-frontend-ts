import React from 'react';
import './cookiebar.css';

import { NavLink } from 'react-router-dom';
import { useCookies } from '../../../providers/CookiesProvider';

interface CookiesProps {
    cookiesConsent: Boolean;
    acceptCookies: any;
    declineCookies: any;
    showCookieBanner: Boolean;

}


export const CoockieBar: React.FC<CookiesProps> = () => {
    const { acceptCookies, declineCookies, showCookieBanner } = useCookies();

    return (
        <>
            {showCookieBanner && (
                <section id="cookieBarSection" className="cookieBarSection">
                    <div className="container">
                        <div className="cookieBarContainer">
                            <div className="cookieBarContainerTextBox">
                                <p>We store cookies on your device to enhance site navigation,
                                    analyze site usage, provide social media features, and assist
                                    in our marketing efforts.  Some of these cookies also help improve
                                    your user experience on our websites, assist with navigation and your
                                    ability to provide feedback. By continuing to use our services, you agree
                                    to the updated <NavLink to="/privacy-policy">Privacy Policy </NavLink>
                                    and  <NavLink to="/terms-and-conditions">Terms of Service</NavLink>.
                                </p>
                            </div>
                            <div className="cookieBarContainerButtonBox">
                                <button onClick={acceptCookies}>Accept</button>
                                <button onClick={declineCookies}>Decline</button>
                            </div>
                        </div>
                    </div>
                </section>)}
        </>


    )
}
