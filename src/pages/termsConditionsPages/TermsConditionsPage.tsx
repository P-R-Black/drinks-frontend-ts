
import { TermsConditions } from '../../components/terms_conditions/TermsConditions';
import { CoockieBar } from '../../components/CookiesComponents/cookies/CookieBar';
import { useCookies } from '../../providers/CookiesProvider';

export const TermsConditionsPage = () => {
    const { cookiesConsent, acceptCookies, declineCookies, showCookieBanner } = useCookies();
    return (
        <>
            <TermsConditions />
            <CoockieBar
                showCookieBanner={showCookieBanner}
                cookiesConsent={cookiesConsent}
                acceptCookies={acceptCookies}
                declineCookies={declineCookies}
            />

        </>
    )
}
