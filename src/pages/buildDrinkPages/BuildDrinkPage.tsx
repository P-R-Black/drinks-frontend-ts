import { BuildDrink } from "../../components/BuildDrinkComponents/BuildDrink";
import { CoockieBar } from "../../components/CookiesComponents/cookies/CookieBar";
import { useCookies } from "../../providers/CookiesProvider";




export const BuildDrinkPage = () => {
    const { cookiesConsent, acceptCookies, declineCookies, showCookieBanner } = useCookies();


    return (
        <>
            <BuildDrink />
            <CoockieBar
                showCookieBanner={showCookieBanner}
                cookiesConsent={cookiesConsent}
                acceptCookies={acceptCookies}
                declineCookies={declineCookies}
            />
        </>
    )
}
