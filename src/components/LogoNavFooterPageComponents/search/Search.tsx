import React, { useState, useEffect } from 'react'
import './search.css'
import { SearchResults } from './SearchResults';
import { IoMdSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io"
import { useNavigate } from 'react-router-dom';
import slugify from 'react-slugify';
import { ErrorPage } from '../../errorPageComponents/errorPage/ErrorPage';
import { DrinksAPI } from '../../../api/DrinksAPI';
import { SearchResultItem } from '../../../types';




export const Search = () => {

    const [input, setInput] = useState("")
    const [selectedItem, setSelectedItem] = useState(-1)
    const [results, setResults] = useState<SearchResultItem[]>([])
    const navigate = useNavigate();

    const { initialData, fullData, isLoading: AllDrinksApiIsLoading, isError: AllDrinksApiIsError } = DrinksAPI();

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

    // Dont think I'll need this after updating placeholder to update based on initialData loading,
    // ... and update useEffect to use initalData if fullData is not loaded
    const DrinksStillLoading = () => {
        return (
            <div>{"Drinks are loading"}</div>
        );

    }



    useEffect(() => {
        if (input !== "" && !fullData) {
            const searchResults = initialData?.filter((drink: { base_alcohol: string[]; drink_name: string; ingredients: string[]; }) => {
                return (
                    drink.base_alcohol[0].toLowerCase().includes(input.toLowerCase()) ||
                    drink.drink_name.toLowerCase().includes(input.toLowerCase()) ||
                    drink.ingredients.join(" ").toLowerCase().includes(input.toLowerCase())
                );
            })
            if (searchResults) {
                setResults(searchResults.sort())
            }
        }
        if (input !== "") {
            const searchResults = fullData?.filter((drink: { base_alcohol: string[]; drink_name: string; ingredients: string[]; }) => {
                return (
                    drink.base_alcohol[0].toLowerCase().includes(input.toLowerCase()) ||
                    drink.drink_name.toLowerCase().includes(input.toLowerCase()) ||
                    drink.ingredients.join(" ").toLowerCase().includes(input.toLowerCase())
                );
            })
            if (searchResults) {
                setResults(searchResults.sort())
            }

        } else {
            setResults([])
        }

    }, [input, fullData, initialData])

    const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setInput(e.target.value)
    }



    if (AllDrinksApiIsError) {
        return (<ErrorPage />);
    }


    return (
        <>
            <section className='searchSection'>
                <div className="searchInputDiv">
                    <input
                        alt="search box"
                        id="search"
                        className="searchBar"
                        type="text"
                        placeholder={!initialData ? "Loading All Drinks" : "Search Drink by Name, Alcohol, or Ingredient"}
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