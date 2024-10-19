import React, { useState, useEffect, useCallback, useContext } from 'react'

import { Hero } from '../../components/homePageComponents/hero/Hero';
// import { DailyDrink } from '../../components/homePageComponents/daily_drink/DailyDrink';
// import { MustKnows } from '../../components/homePageComponents/must_knows/MustKnows';
import { MidSection } from '../../components/midsection/MidSection';
import { MidSectionTwo } from '../../components/midsection/MidSection';
import { Discover } from '../../components/homePageComponents/discover/Discover';
import { DiscoverShots } from '../../components/homePageComponents/discoverShots/DiscoverShots';
// import { Mocktails } from '../../components/homePageComponents/mocktails/Mocktails';
// import { CoockieBar } from '../../components/CookieComponents/cookies/CoockieBar';
// import { useOutletContext } from 'react-router-dom';
// import { useCookies } from '../../providers/cookiesProvider/CookiesProvider';



export const Home = () => {

  // const { cookiesConsent, acceptCookies, declineCookies, showCookieBanner, } = useCookies();

  //   const { drinks } = useOutletContext()
  //   const { lastDrinkOfTheDay } = useOutletContext()
  //   const { drinkOfTheDay } = useOutletContext()
  //   const { cocktails } = useOutletContext()
  //   const { allShots } = useOutletContext()
  //   const { mustKnows } = useOutletContext()


  // const { data: backendApi } = useOutletContext()
  // const { data: currDrinkOfTheDay } = useOutletContext()

  var date = new Date()
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();
  var dd = String(day).padStart(2, '0');
  var mm = String(month + 1).padStart(2, '0'); //January is 0!

  const [pastDrinksOfTheDay, setPastDrinksOfTheDay] = useState([])
  const [todaysDrinkOfTheDay, seTodaysDrinkOfTheDay] = useState([])
  const [currentDrink, setCurrentDrink] = useState([])
  const [dateLookup, setDateLookup] = useState()
  const [drinkLookup, setDrinkLookup] = useState()

  const calendarYear = year
  const calendarMonth = month

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "Novenber", "December"
  ];


  // gets the drink of the day info file in server directory:
  //   const getFullDrinkInfo = useCallback(async (theLastDod) => {
  //     let ldod = await drinks?.filter((drink) => drink.drink_name === theLastDod)
  //     setCurrentDrink([ldod])
  //   }, [drinks]);




  //   useEffect(() => {
  //     // returns past drinks of the day and their date
  //     const fetchData = async () => {
  //       try {
  //         setPastDrinksOfTheDay(drinkOfTheDay)
  //       } catch (error) {
  //         console.error(error.message)

  //       }
  //     }

  //     // gets today's Dod
  //     const fetchLastRecord = async () => {
  //       try {
  //         seTodaysDrinkOfTheDay(lastDrinkOfTheDay['name'])
  //         getFullDrinkInfo(lastDrinkOfTheDay['name'])
  //       } catch (error) {
  //         console.error(error.message)
  //       }
  //     }

  //     fetchData()
  //     fetchLastRecord()

  //   }, [drinks, drinkOfTheDay, getFullDrinkInfo]);
  //   // currentDrink,


  //   const eventMap = {};
  //   if (pastDrinksOfTheDay) {
  //     pastDrinksOfTheDay?.forEach(event => {
  //       const date = event.theDate.split('T')[0];
  //       eventMap[date] = event.name;
  //     });
  //   }

  //   const handleDateClick = async (date) => {
  //     const event = await eventMap[String(date)];
  //     if (event) {
  //       setDrinkLookup(event)
  //       getFullDrinkInfo(event)
  //     }
  //   };



  //   const calDate = document.querySelectorAll('.calDate')
  //   calDate.forEach((cd) => {
  //     cd.addEventListener('click', async () => {

  //       let getClassNames = cd.getAttribute('class')
  //       let clickedDay = cd.innerHTML
  //       let clickedYear = calendarYear
  //       let clickedMonth;

  //       if (getClassNames.includes('lastMonthDays')) {
  //         clickedMonth = calendarMonth
  //       } else if (getClassNames.includes('nextMonthDays')) {
  //         clickedMonth = calendarMonth + 2
  //       } else {
  //         clickedMonth = calendarMonth + 1
  //       }


  //       if (String(clickedMonth).length < 2) {
  //         clickedMonth = "0" + String(clickedMonth)
  //       }

  //       // let clickedOnDate = `${calendarYear}-${clickedMonth}-${cd.innerHTML.length === 1 ? '0' + cd.innerHTML : cd.innerHTML}`
  //       let monthInText = months[Number(clickedMonth - 1)]

  //       // handleDateClick(clickedOnDate)
  //       let changedDate = `${monthInText} ${clickedDay}, ${clickedYear}`
  //       setDateLookup(changedDate)

  //     })

  //   })


  return (
    <>
      <Hero />
      <MidSection />
      <Discover />
      <MidSectionTwo />
      <DiscoverShots />
      {/*
      <DailyDrink
        date={date}
        year={year}
        month={month}
        dd={dd}
        mm={mm}
        todaysDrinkOfTheDay={todaysDrinkOfTheDay}
        currentDrink={currentDrink}
        dateLookup={dateLookup}
        months={months}
        handleDateClick={handleDateClick}
        pastDrinksOfTheDay={pastDrinksOfTheDay}
      />
      
     
      <Mocktails
        cocktails={cocktails}
      />
      <MustKnows mustKnows={mustKnows} />
      <CoockieBar
        showCookieBanner={showCookieBanner}
        cookiesConsent={cookiesConsent}
        acceptCookies={acceptCookies}
        declineCookies={declineCookies}
      /> */}
    </>
  )
}




