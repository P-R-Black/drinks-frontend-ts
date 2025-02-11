import { useParams } from 'react-router-dom';

import { AlcoholSelectTwo } from '../../components/alcoholSelectTwo/alcoholSelectTwo';
import { useCookies } from '../../providers/CookiesProvider';
import { CoockieBar } from '../../components/CookiesComponents/cookies/CookieBar';

export const AlcoholSelectPageTwo = () => {

    const { cookiesConsent, acceptCookies, declineCookies, showCookieBanner } = useCookies();

    let { alcohol } = useParams<string>()


    return (
        <>
            <AlcoholSelectTwo alcohol={alcohol} />
            <CoockieBar
                showCookieBanner={showCookieBanner}
                cookiesConsent={cookiesConsent}
                acceptCookies={acceptCookies}
                declineCookies={declineCookies}
            />
        </>
    )
}
