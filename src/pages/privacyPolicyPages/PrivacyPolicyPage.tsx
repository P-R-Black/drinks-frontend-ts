
import { PrivacyPolicy } from '../../components/privacyPolicy/PrivacyPolicy';
import { CoockieBar } from '../../components/CookiesComponents/cookies/CookieBar';
import { useCookies } from '../../providers/CookiesProvider';


export const PrivacyPolicyPage = () => {
    const { cookiesConsent, acceptCookies, declineCookies, showCookieBanner } = useCookies();
    return (
        <>
            <PrivacyPolicy />
            <CoockieBar
                showCookieBanner={showCookieBanner}
                cookiesConsent={cookiesConsent}
                acceptCookies={acceptCookies}
                declineCookies={declineCookies}
            />

        </>
    )
}
