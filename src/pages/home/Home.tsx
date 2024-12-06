import { useState, useEffect, useCallback } from 'react'

import { Hero } from '../../components/homePageComponents/hero/Hero';
import { DailyDrink } from '../../components/homePageComponents/daily_drink/DailyDrink';

import { MidSection } from '../../components/midsection/MidSection';
import { MidSectionTwo } from '../../components/midsection/MidSection';
import { Discover } from '../../components/homePageComponents/discover/Discover';
import { DiscoverShots } from '../../components/homePageComponents/discoverShots/DiscoverShots';
import { Mocktails } from '../../components/homePageComponents/mocktails/Mocktails';
import { MustKnows } from '../../components/homePageComponents/mustKnows/MustKnows';
import { CoockieBar } from '../../components/CookiesComponents/cookies/CookieBar';
import { useCookies } from '../../providers/CookiesProvider';
import { GetBackendApi, GetTodaysDrinkOfTheDay } from '../../api/GetSetDodApi';
// import { AllDrinksApi } from '../../api/DrinksAPI';
import { LoadingPage } from '../../components/loadingComponents/LoadingPage';
import { ErrorPage } from '../../components/errorPageComponents/errorPage/ErrorPage';
import { Drink, Event } from '../../types';
import { DrinksAPI } from '../../api/DrinksAPI';



export const Home = () => {

  const { cookiesConsent, acceptCookies, declineCookies, showCookieBanner, } = useCookies();

  const { data: backendApiData, isLoading: backendApiDataIsLoading, isError: backendApiDataIsError, error: backendApiDataError } = GetBackendApi();
  const { data: drinkOfTheDayData, isLoading: drinkOfTheDayDataIsLoading, isError: drinkOfTheDayDataIsError } = GetTodaysDrinkOfTheDay();


  const { initialData, fullData, isError: AllDrinksApiIsError } = DrinksAPI();


  var date = new Date()
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();
  var dd = String(day).padStart(2, '0');
  var mm = String(month + 1).padStart(2, '0'); //January is 0!

  const [pastDrinksOfTheDay, setPastDrinksOfTheDay] = useState([])
  const [todaysDrinkOfTheDay, seTTodaysDrinkOfTheDay] = useState([])
  const [currentDrink, setCurrentDrink] = useState<Drink[]>([])
  const [drinks, setDrinks] = useState<Drink[]>([])
  const [dateLookup, setDateLookup] = useState<string | undefined>(undefined);
  // const [drinkLookup, setDrinkLookup] = useState<string | undefined>(undefined)

  const [drinkOfTheDay, setDrinkOfTheDay] = useState([])


  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "Novenber", "December"
  ];

  const updateDrinks = () => {
    let assignDrinks: any;
    if (!fullData && initialData) {
      assignDrinks = initialData
      setDrinks(assignDrinks)

    } else if (fullData) {
      assignDrinks = fullData
      setDrinks(assignDrinks)

    }

  }

  useEffect(() => {

    updateDrinks()
  })


  // gets the drink of the day info file in server directory:
  const getFullDrinkInfo = useCallback((theLastDod: string) => {
    let ldod = drinks.filter((drink: { drink_name: string; }) => drink.drink_name === theLastDod)
    setCurrentDrink(prev => { return ldod })
  }, [drinks]);



  useEffect(() => {
    // gets today's Dod
    const fetchLastRecord = async () => {
      if (drinkOfTheDayData) {
        try {
          seTTodaysDrinkOfTheDay(drinkOfTheDayData['name'])
          if (drinks.length > 0) {
            getFullDrinkInfo(drinkOfTheDayData['name'])
          }

        } catch (error: any) {
          console.error(error.message)
        }
      }
    }

    if (backendApiData) {
      setDrinkOfTheDay(backendApiData)
    }
    // returns past drinks of the day and their date
    const fetchData = async () => {
      try {
        setPastDrinksOfTheDay(drinkOfTheDay)
      } catch (error) {
        console.error(backendApiDataError?.message)

      }
    }



    fetchData()
    fetchLastRecord()
  }, [drinks, drinkOfTheDay, backendApiData, backendApiDataError?.message, drinkOfTheDayData, getFullDrinkInfo]);


  if (AllDrinksApiIsError) {
    return (<ErrorPage />);
  }

  if (drinkOfTheDayDataIsLoading) {
    return (<LoadingPage />);
  }

  if (drinkOfTheDayDataIsError) {
    return (<ErrorPage />);
  }

  if (backendApiDataIsLoading) {
    return (<LoadingPage />);
  }

  if (backendApiDataIsError) {
    return (<ErrorPage />);
  }



  const eventMap: { [key: string]: string | undefined } = {};
  if (pastDrinksOfTheDay) {
    pastDrinksOfTheDay.forEach((event: Event) => {
      const date = event.theDate.split('T')[0];
      eventMap[date] = event.name;
    });
  }


  const handleDateClick = (date: any) => {
    let formattedDate = formatDates(date)
    const event: string | undefined = eventMap[String(date)];
    if (event) {
      setDateLookup(formattedDate)
      getFullDrinkInfo(event)
    }
  };

  const formatDates = (date: string) => {
    let formatDatesMonth: string = date.split('-')[1]; // Extracts month part (e.g., "10" for October)
    let formatDatesDay: string = date.split('-')[2]; // Extracts day part (e.g., "24")
    let formatDatesYear: string = date.split('-')[0]; // Extracts year part (e.g., "2024")


    const digitToMonth: { [key: string]: string } = {
      "01": "January", "02": "February", "03": "March", "04": "April", "05": "May", "06": "June",
      "07": "July", "08": "August", "09": "September", "10": "October", "11": "November", "12": "December"
    }

    const monthName = digitToMonth[formatDatesMonth]
    let changedDate = `${monthName} ${formatDatesDay}, ${formatDatesYear}`
    return changedDate;

  }


  return (
    <>
      <Hero />
      <MidSection />
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
      <MidSectionTwo />
      <Discover />
      <DiscoverShots />
      <Mocktails />
      <MustKnows />
      <CoockieBar
        showCookieBanner={showCookieBanner}
        cookiesConsent={cookiesConsent}
        acceptCookies={acceptCookies}
        declineCookies={declineCookies}
      />
    </>
  )
};