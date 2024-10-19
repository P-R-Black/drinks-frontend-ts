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

    let googleAnalyticsScript: null;

    const loadGoogleAnalytics = () => {

        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_UA_ID}`;

        document.head.appendChild(script);
        console.log('window', window)
        let dataLayer = window.dataLayer || [];

        function gtag(_p0: string, p0: string, _p1: { cookie_flags: string; }, p1: Date) {
            dataLayer.push(arguments)
        }

        // gtag(_p0: string, p0: string, _p1: { cookie_flags: string;}, p1: Date): void
        // gtag("js", new Date());
        window.gtag("js", "config", `${GA_ANALYTICS}`, {
            cookie_flags: 'SameSite=None;Secure',
            // page_path: window.location.pathme

        });
    };


    const removeGoogleAnalytics = () => {
        if (googleAnalyticsScript) {
            document.head.removeChild(googleAnalyticsScript);
            googleAnalyticsScript = null;
            if (window.dataLayer) {
                window.dataLayer = [];
            }
        }
    }

    const acceptCookies = () => {
        Cookies.set("cookiesConsent", "true", {
            sameSite: 'None',
            secure: true
        })
        setCookiesConsent(true);
        setShowCookieBanner(false);
        loadGoogleAnalytics()

        if (GA_UA_ID) {
            ReactGA.initialize(GA_UA_ID);
            ReactGA.send({
                hitType: "pageview",
                page: window.location.pathname,

            });
        } else {
            console.warn('Google Analytics UA ID is not defined.');
        }

    }

    const declineCookies = () => {
        Cookies.remove("cookiesConsent");
        setCookiesConsent(false);
        setShowCookieBanner(false)
        removeGoogleAnalytics()
    }
    return (
        <CookiesContext.Provider value={{ cookiesConsent, showCookieBanner, acceptCookies, declineCookies }}>
            {children}
        </CookiesContext.Provider>
    )
}
