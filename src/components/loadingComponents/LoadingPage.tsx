import React from 'react'
import './loadingPage.css';

export const LoadingPage = () => {
    return (
        <>
            <div className="bannerContainer">{"Fetching A New Bottle"}</div>
            <div className="pageLoading">
                <div className="loadingText">Loading</div>
                <span></span>
                <span></span>
                <span></span>
            </div>

        </>
    )
}
