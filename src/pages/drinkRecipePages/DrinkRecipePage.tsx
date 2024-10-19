import React from 'react'
import { useParams } from 'react-router-dom';

import { DrinkRecipe } from '../../components/drinkRecipe/DrinkRecipe';
// import { CoockieBar } from '../../components/CookieComponents/cookies/CoockieBar';
import { useCookies } from '../../providers/CookiesProvider';



export const DrinkRecipePage = () => {

    const { cookiesConsent, acceptCookies, declineCookies, showCookieBanner } = useCookies();

    let { drinkName } = useParams<string>()
    let { alcohol } = useParams<string>()

    return (
        <>

            <DrinkRecipe
                drinkName={drinkName}
                alcohol={alcohol}

            />
            {/* <CoockieBar
        showCookieBanner={showCookieBanner}
        cookiesConsent={cookiesConsent}
        acceptCookies={acceptCookies}
        declineCookies={declineCookies}
      /> */}
        </>
    )
}
