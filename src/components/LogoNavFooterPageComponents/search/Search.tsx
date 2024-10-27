import React, { useState, useEffect } from 'react'
import './search.css'
import { SearchResults } from './SearchResults';
import { IoMdSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io"
import { useNavigate } from 'react-router-dom';
import slugify from 'react-slugify';
// import { LoadingPage } from '../../loadingComponents/LoadingPage';
// import { ErrorPage } from '../../errorPageComponents/errorPage/ErrorPage';
import { AllDrinksApi } from '../../../api/DrinksAPI';


interface ResultItem {
    base_alcohol: string[];
    drink_name: string;
}


export const Search = () => {

    const [input, setInput] = useState("")
    const [selectedItem, setSelectedItem] = useState(-1)
    const [results, setResults] = useState<ResultItem[]>([])
    const navigate = useNavigate();

    const { data: AllDrinksApiData } = AllDrinksApi();



    const handleKeyDown = (e: { key: string; preventDefault: () => void; }) => {

        if (selectedItem < results.length) {
            if (e.key === "ArrowUp" && selectedItem > 0) {
                setSelectedItem((prev) => prev - 1);
            } else if (e.key === "ArrowDown" && selectedItem < results.length - 1) {
                setSelectedItem((prev) => prev + 1);
            } else if (e.key === "Enter" && selectedItem >= 0) {
                const link = `/${slugify(results[selectedItem].base_alcohol[0])}/${slugify(results[selectedItem].drink_name)}`;
                handleClose(e)

                navigate(link);
            }

        } else {
            setSelectedItem(-1)
        }
    };

    const handleClose = (e: { preventDefault: () => void; } | undefined) => {

        setInput("")
        setResults([])
        setSelectedItem(-1)

    }

    const DrinksStillLoading = () => {
        return (
            <div>{"Drinks are loading"}</div>
        )
    }


    useEffect(() => {
        if (input !== "" && !AllDrinksApiData) {
            <DrinksStillLoading />
        }
        if (input !== "") {
            const searchResults = AllDrinksApiData.drinks.filter((drink: { base_alcohol: string[]; drink_name: string; ingredients: string[]; }) => {
                return (
                    drink.base_alcohol[0].toLowerCase().includes(input.toLowerCase()) ||
                    drink.drink_name.toLowerCase().includes(input.toLowerCase()) ||
                    drink.ingredients.join(" ").toLowerCase().includes(input.toLowerCase())
                );
            })
            setResults(searchResults.sort())
        } else {
            setResults([])
        }

    }, [input, AllDrinksApiData])

    const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setInput(e.target.value)
    }

    // if (AllDrinksApiIsLoading) {
    //     return (<LoadingPage />);
    // }

    // if (AllDrinksApiIsError) {
    //     return (<ErrorPage />);
    // }



    return (
        <>
            <section className='searchSection'>
                <div className="searchInputDiv">
                    <input
                        alt="search box"
                        id="search"
                        className="searchBar"
                        type="text"
                        placeholder="Search Drink by Name, Alcohol, or Ingredient"
                        value={input}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="searchIcons">
                        {
                            input === "" ? (<IoMdSearch />) : (<IoMdClose onClick={handleClose} />)
                        }
                    </button>
                    <SearchResults results={results} selectedItem={selectedItem} handleClose={handleClose} />

                </div>
            </section>
        </>
    )
}
