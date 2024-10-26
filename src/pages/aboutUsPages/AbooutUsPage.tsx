import { AboutUs } from '../../components/aboutUs/AboutUs';

import { CoockieBar } from '../../components/CookiesComponents/cookies/CookieBar';
import { useCookies } from '../../providers/CookiesProvider';



export const AboutUsPage = () => {
    const { cookiesConsent, acceptCookies, declineCookies, showCookieBanner } = useCookies();

    return (
        <>

            <AboutUs />
            <CoockieBar
                showCookieBanner={showCookieBanner}
                cookiesConsent={cookiesConsent}
                acceptCookies={acceptCookies}
                declineCookies={declineCookies}
            />
        </>
    )
}
