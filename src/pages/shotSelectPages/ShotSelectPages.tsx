import React, { useState, useEffect, useCallback } from 'react';

import { useParams } from 'react-router-dom';

import { ShotSelect } from '../../components/shotSelect/ShotSelect';
// import { CoockieBar } from '../../components/CookieComponents/cookies/CoockieBar';
// import { useOutletContext } from 'react-router-dom';
import slugify from 'react-slugify';
import { useCookies } from '../../providers/CookiesProvider';


export const ShotSelectPages = () => {
    const { cookiesConsent, acceptCookies, declineCookies, showCookieBanner } = useCookies();

    let { alcohol } = useParams()
    // const { allShots } = useOutletContext()

    // const [displayName, setDisplayName] = useState("")


    // const convertAlcoholName = useCallback((alcohol) => {

    //     // gets base alcohol as it appears from API
    //     const findParenthesis = (text) => {
    //         let findAlcohol = allShots.filter((as) => as.base_alcohol[0] === text.toLowerCase())
    //             .map((fd) => fd.base_alcohol)
    //         findAlcohol = findAlcohol.length > 1 ? findAlcohol[0] : findAlcohol
    //         var regExp = /\(([^)]+)\)/;
    //         if (regExp.test(findAlcohol)) {
    //             return true
    //         } else {
    //             return false
    //         }
    //     }

    //     const convertText = (text) => {
    //         let needsToBeConverted = slugify(text)
    //         let findAlcohol = allShots.filter((as) => needsToBeConverted === slugify(as.base_alcohol) ? as.base_alcohol : "")
    //         let finalText = findAlcohol.map((fa) => fa.base_alcohol)
    //         finalText.map(function (word) {
    //             return word !== "De" ? word.base_alcohol : word.replace('De', 'de') + word.slice(1)
    //         }).join(' ')
    //         return findAlcohol.map((fa) => fa.base_alcohol)
    //     }


    //     let alcoholConvert = alcohol.toLowerCase().split('-').map(function (word) {
    //         return word.charAt(0).toUpperCase() + word.slice(1)
    //     }).join(' ')
    //     if (findParenthesis(alcoholConvert)) {
    //         setDisplayName(convertText(alcoholConvert))
    //     } else {
    //         setDisplayName(alcoholConvert)
    //     }

    // }, [allShots])

    // useEffect(() => {
    //     convertAlcoholName(alcohol)
    // }, [alcohol, convertAlcoholName])


    return (
        <>
            <ShotSelect alcohol={alcohol} />
            {/* <CoockieBar
        showCookieBanner={showCookieBanner}
        cookiesConsent={cookiesConsent}
        acceptCookies={acceptCookies}
        declineCookies={declineCookies}
      /> */}
        </>
    )
}
