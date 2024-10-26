import React, { useEffect, useState, useRef, ReactNode } from 'react';
import { Logo } from '../../components/LogoNavFooterPageComponents/logo/Logo';
import { Link } from 'react-router-dom';
import './privacyPolicy.css';
import Cookies from 'js-cookie';
import ReactGA from 'react-ga4';

interface PrivacyChoiceProps {
    trigger: boolean;
    setTrigger: (value: boolean) => void;
    children: ReactNode;
}

declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

const GA_MEASUREMENT_ID = process.env.REACT_APP_GOOGLE_MEASUREMENT_ID;

export const PrivacyChoice: React.FC<PrivacyChoiceProps> = ({ trigger, setTrigger, children }) => {
    const [hasConsentValue, setHasConsentValue] = useState(false);
    const [isCookieSet, setCookie] = useState<boolean>(false);
    const googleAnalyticsScriptRef = useRef<HTMLScriptElement | null>(null);
    const closeButtonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if (trigger && closeButtonRef.current) {
            closeButtonRef.current.focus();
        }
        const cookiesConsent = Cookies.get("cookiesConsent");
        setHasConsentValue(!!cookiesConsent);
        setCookie(cookiesConsent === "true");

        if (cookiesConsent === "true") {
            loadGoogleAnalytics();
        }
    }, [trigger]);

    const loadGoogleAnalytics = () => {
        setHasConsentValue(true);
        if (googleAnalyticsScriptRef.current) return;

        googleAnalyticsScriptRef.current = document.createElement('script');
        googleAnalyticsScriptRef.current.async = true;
        googleAnalyticsScriptRef.current.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(googleAnalyticsScriptRef.current);

        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) {
            window.dataLayer.push(args);
        }
        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID, {
            page_path: window.location.pathname,
        });
    };

    const removeGoogleAnalytics = () => {
        if (googleAnalyticsScriptRef.current) {
            document.head.removeChild(googleAnalyticsScriptRef.current);
            googleAnalyticsScriptRef.current = null;
            window.dataLayer = [];
        }
    };

    const cookiesAccept = () => {
        Cookies.set('cookiesConsent', 'true');
        loadGoogleAnalytics();
        setCookie(true);
        ReactGA.initialize(GA_MEASUREMENT_ID || '');
        ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
        setTrigger(false);
    };

    const cookiesDeclined = () => {
        Cookies.remove('cookiesConsent');
        setCookie(false);
        setHasConsentValue(false);
        removeGoogleAnalytics();
        setTrigger(false);
    };

    return trigger ? (
        <section
            className="privacyChoiceSection privacyPopup"
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-title"
        >
            <div className="logoDiv">
                <Logo />
                <button
                    onClick={() => setTrigger(false)}
                    className="closeButton"
                    aria-label="Close Privacy Choices"
                    ref={closeButtonRef}
                >
                    X
                </button>
                {children}
            </div>
            <div className="privacyChoiceContainer">
                <div className="privacyText">
                    <h3>Your Privacy Choices</h3>
                    <p>
                        Under applicable U.S. state privacy laws (e.g., California, Colorado, etc.), residents have the right to opt-out of
                        "sales" and "shares" of personal information, "targeted advertising," and certain use/disclosure of "sensitive"
                        personal information. For more information, see our Privacy Policy.
                    </p>
                    <p>
                        To opt-out, you must <span className="privacyChoiceSpan">(1)</span> submit the "Opt-Out Form" using the link below or
                        email <Link to="mailto:pblackdevdemo@gmail.com">pblackdevdemo@gmail.com</Link> with the subject "Opt-Out of Sales."
                    </p>
                </div>
                <Link to="mailto:pblackdevdemo@gmail.com">Send Opt-Out Email</Link>
                <button
                    className="privacyChoiceOptButton"
                    onClick={cookiesAccept}
                    aria-label="Accept Cookies Targeting"
                >
                    Accept Cookies Targeting
                </button>
                <button
                    className="privacyChoiceOptButton"
                    onClick={cookiesDeclined}
                    aria-label="Opt Out of Cookies Targeting"
                >
                    Opt Out of Cookies Targeting
                </button>
            </div>
        </section>
    ) : null;
};
