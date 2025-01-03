import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import slugify from 'react-slugify';
import './search.css';
import { SearchResultsProps } from '../../../types';




export const SearchResults: React.FC<SearchResultsProps> = ({ results, selectedItem, handleClose }) => {

    const listRef = useRef(null);


    useEffect(() => {
        const list: any = listRef.current;
        if (list) {
            const activeItem = list.querySelector('.active');

            if (activeItem) {
                // Scroll the list to keep the active item in view
                list.scrollTop = activeItem.offsetTop - list.offsetTop;
            }
        }

    }, [selectedItem]);

    // const closeResults = () => {
    //     let resultsList = document.querySelector('.results_list')
    //     resultsList?.setAttribute('className', '.hidden')
    // }

    return (
        <>

            <div className="results_list" ref={listRef}>
                <ul className="searchResultContainer">
                    {results.map((result: { id: React.Key | null | undefined; base_alcohol: any[]; drink_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: any) => {
                        return (
                            <li key={result.id} onClick={() => handleClose()}>
                                <Link
                                    to={`/${slugify(result.base_alcohol[0])}/${slugify(result.drink_name)}`}
                                    className={selectedItem === index ? "searchResultList active" : "searchResultList"}>
                                    {result.drink_name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>

    )
}