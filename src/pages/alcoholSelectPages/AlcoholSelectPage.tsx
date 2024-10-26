
import { useParams } from 'react-router-dom';

import { AlcoholSelect } from '../../components/alcoholselect/alcoholSelect';
import { CoockieBar } from '../../components/CookiesComponents/cookies/CookieBar';
import { useCookies } from '../../providers/CookiesProvider';


export const AlcoholSelectPage = () => {
    const { cookiesConsent, acceptCookies, declineCookies, showCookieBanner } = useCookies();

    let { alcohol } = useParams<string>()


    return (
        <>
            <AlcoholSelect alcohol={alcohol} />

            <CoockieBar
                showCookieBanner={showCookieBanner}
                cookiesConsent={cookiesConsent}
                acceptCookies={acceptCookies}
                declineCookies={declineCookies}
            />
        </>
    )
}
