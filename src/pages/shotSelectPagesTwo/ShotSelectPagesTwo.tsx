import { useParams } from 'react-router-dom';

import { ShotsSelectTwo } from '../../components/shotSelectTwo/ShotSelectTwo';
import { CoockieBar } from '../../components/CookiesComponents/cookies/CookieBar';
import { useCookies } from '../../providers/CookiesProvider';


export const ShotSelectPagesTwo = () => {
    const { cookiesConsent, acceptCookies, declineCookies, showCookieBanner } = useCookies();

    let { alcohol } = useParams()


    return (
        <>
            <ShotsSelectTwo alcohol={alcohol} />
            <CoockieBar
                showCookieBanner={showCookieBanner}
                cookiesConsent={cookiesConsent}
                acceptCookies={acceptCookies}
                declineCookies={declineCookies}
            />
        </>
    )
}
