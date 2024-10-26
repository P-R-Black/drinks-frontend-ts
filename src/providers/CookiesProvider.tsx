import React, { createContext, useContext, useState, ReactNode } from 'react'

import Cookies from 'js-cookie';
import ReactGA from 'react-ga4';

const CookiesContext = createContext<any>(null);

export const useCookies = () => useContext(CookiesContext);

interface CookiesProviderProps {
    children: ReactNode;
}

declare global {
    interface Window {
        dataLayer: any[]; // You can specify the type more strictly if you know the exact structure
        gtag: (...args: any[]) => void;
    }
}

const GA_UA_ID = process.env.REACT_APP_GOOGLE_UA_ID; // OUR_TRACKING_ID
const GA_ANALYTICS = process.env.REACT_APP_GOOGLE_MEASUREMENT_ID;


export const CookiesProvider: React.FC<CookiesProviderProps> = ({ children }) => {

    const [cookiesConsent, setCookiesConsent] = useState(() => {
        const consent = Cookies.get('cookiesConsent')
        return consent === undefined ? null : consent === "true";
    })

    const [showCookieBanner, setShowCookieBanner] = useState(true)
    const [googleAnalyticsScriptLoaded, setGoogleAnalyticsScriptLoaded] = useState(false);

    const loadGoogleAnalytics = () => {
        if (googleAnalyticsScriptLoaded) return;

        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_UA_ID}`;

        script.onload = () => {
            setGoogleAnalyticsScriptLoaded(true);
            window.dataLayer = window.dataLayer || [];
            window.gtag = function () {
                window.dataLayer.push(arguments);
            };

            window.gtag('js', new Date());
            window.gtag('config', GA_ANALYTICS, {
                cookie_flags: 'SameSite=None;Secure',
                page_path: window.location.pathname,
            });
        };

        document.head.appendChild(script);
    };



    const removeGoogleAnalytics = () => {
        const script = document.querySelector(`script[src*="${GA_UA_ID}"]`);
        if (script) {
            document.head.removeChild(script);
            if (window.dataLayer) {
                window.dataLayer = [];
            }
        }
        setGoogleAnalyticsScriptLoaded(false);
    };

    const acceptCookies = () => {
        Cookies.set("cookiesConsent", "true", {
            sameSite: 'None',
            secure: true
        });
        setCookiesConsent(true);
        setShowCookieBanner(false);
        loadGoogleAnalytics();

        if (GA_UA_ID) {
            ReactGA.initialize(GA_UA_ID);
            ReactGA.send({
                hitType: "pageview",
                page: window.location.pathname,
            });
        } else {
            console.warn('Google Analytics UA ID is not defined.');
        }
    };

    const declineCookies = () => {
        Cookies.remove("cookiesConsent");
        setCookiesConsent(false);
        setShowCookieBanner(false);
        removeGoogleAnalytics();
    };

    return (
        <CookiesContext.Provider value={{ cookiesConsent, showCookieBanner, acceptCookies, declineCookies }}>
            {children}
        </CookiesContext.Provider>
    )
}
