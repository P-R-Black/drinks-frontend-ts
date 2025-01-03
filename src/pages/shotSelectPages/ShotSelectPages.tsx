import { useParams } from 'react-router-dom';

import { ShotSelect } from '../../components/shotSelect/ShotSelect';
import { CoockieBar } from '../../components/CookiesComponents/cookies/CookieBar';

import { useCookies } from '../../providers/CookiesProvider';


export const ShotSelectPages = () => {
    const { cookiesConsent, acceptCookies, declineCookies, showCookieBanner } = useCookies();

    let { alcohol } = useParams()

    return (
        <>
            <ShotSelect alcohol={alcohol} />
            <CoockieBar
                showCookieBanner={showCookieBanner}
                cookiesConsent={cookiesConsent}
                acceptCookies={acceptCookies}
                declineCookies={declineCookies}
            />
        </>
    )
}
