import React, { useState, useEffect } from 'react'
import './search.css'
import { SearchResults } from './SearchResults';
import { IoMdSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io"
import { useNavigate } from 'react-router-dom';
import slugify from 'react-slugify';




export const Search = () => {
    const [input, setInput] = useState("")
    const [selectedItem, setSelectedItem] = useState(-1)
    const [results, setResults] = useState([])
    const navigate = useNavigate();


    // const handleKeyDown = (e) => {
    //     if (selectedItem < results.length) {
    //         if (e.key === "ArrowUp" && selectedItem > 0) {
    //             setSelectedItem((prev) => prev - 1);
    //         } else if (e.key === "ArrowDown" && selectedItem < results.length - 1) {
    //             setSelectedItem((prev) => prev + 1);
    //         } else if (e.key === "Enter" && selectedItem >= 0) {
    //             const link = `/${slugify(results[selectedItem].base_alcohol[0])}/${slugify(results[selectedItem].drink_name)}`;
    //             handleClose()
    //             e.preventDefault()
    //             navigate(link);
    //         }

    //     } else {
    //         setSelectedItem(-1)
    //     }
    // };

    // const handleClose = (e) => {
    //     e.preventDefault()
    //     setInput("")
    //     setResults([])
    //     setSelectedItem(-1)

    // }


    // useEffect(() => {
    //     if (input !== "") {
    //         const results = drinks.filter((drink) => {
    //             return (
    //                 drink.base_alcohol[0].toLowerCase().includes(input.toLowerCase()) ||
    //                 drink.drink_name.toLowerCase().includes(input.toLowerCase()) ||
    //                 drink.ingredients.join(" ").toLowerCase().includes(input.toLowerCase())
    //             );
    //         })
    //         setResults(results.sort())
    //     } else {
    //         setResults([])
    //     }

    // }, [input, drinks])

    // const handleChange = (e) => {
    //     setInput(e.target.value)
    // }



    return (
        <>
            <section className="searchSection">
                <div className="searchInputDiv">
                    <input
                        alt="search box"
                        id="search"
                        className="searchBar"
                        type="text"
                        placeholder="Search Drink By Name, Alcohol or Ingredient"
                    />
                    <button className="searchIcons">
                        {
                            input === "" ? (<IoMdSearch />) : (<IoMdClose />)
                        }
                    </button>
                    <SearchResults />
                </div>

            </section>

            {/* <section className='searchSection'>
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
        </section>  */}
        </>




    )
}
