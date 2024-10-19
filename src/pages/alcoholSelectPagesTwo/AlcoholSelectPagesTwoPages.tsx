import React, { useState, useEffect, useCallback } from 'react'
import slugify from 'react-slugify';
import { useParams } from 'react-router-dom';

import { AlcoholSelectTwo } from '../../components/alcoholSelectTwo/alcoholSelectTwo';
// import { CoockieBar } from '../../components/CookieComponents/cookies/CoockieBar';
import { useCookies } from '../../providers/CookiesProvider';


// import { convertAlcoholNameUtils } from '../pagesUtilities/Utilities';
// import { convertText } from '../pagesUtilities/Utilities';

export const AlcoholSelectPageTwo = () => {
    const { cookiesConsent, acceptCookies, declineCookies, showCookieBanner } = useCookies();

    let { alcohol } = useParams<string>()


    return (
        <>
            <AlcoholSelectTwo
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
