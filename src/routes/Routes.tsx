import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { Home } from '../pages/home/Home';
import { AlcoholSelectPage } from '../pages/alcoholSelectPages/AlcoholSelectPage';
import { AlcoholSelectPageTwo } from '../pages/alcoholSelectPagesTwo/AlcoholSelectPagesTwoPages';
import { DrinkRecipePage } from '../pages/drinkRecipePages/DrinkRecipePage';
import { ShotSelectPages } from '../pages/shotSelectPages/ShotSelectPages';
import { ShotSelectPagesTwo } from '../pages/shotSelectPagesTwo/ShotSelectPagesTwo';

import { AboutUsPage } from '../pages/aboutUsPages/AbooutUsPage';
import { ContactUsPage } from '../pages/contactUsPages/ContactUsPage';
import { TermsConditionsPage } from '../pages/termsConditionsPages/TermsConditionsPage';
import { PrivacyPolicyPage } from '../pages/privacyPolicyPages/PrivacyPolicyPage';
import { ErrorPagePage } from '../pages/errorPagePages/ErrorPagePage';

// import { BuildDrinkPage } from '../pages/buildDrinkPage/BuildDrinkPage';
// import { SuperUserPage } from '../pages/superUserPage/SuperUserPage';
// import { DashboardPage } from '../pages/dashboardPage/DashboardPage';

export const router = createBrowserRouter([

    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <Home /> },
            { path: "/:alcohol", element: <AlcoholSelectPage /> },
            { path: "/:alcohol/drinks", element: <AlcoholSelectPageTwo /> },
            { path: "/:alcohol/shot", element: <ShotSelectPages /> },
            { path: "/:alcohol/all_shots", element: <ShotSelectPagesTwo /> },
            { path: "/:alcohol/:drinkName", element: <DrinkRecipePage /> },
            // { path: "/build-drink", element: <BuildDrinkPage /> },
            { path: "/about-us", element: <AboutUsPage /> },
            { path: "/contact-us", element: <ContactUsPage /> },
            { path: "/terms-and-conditions", element: <TermsConditionsPage /> },
            { path: "/privacy-policy", element: <PrivacyPolicyPage /> },
            { path: "*", element: <ErrorPagePage /> },

            // { path: "/keep-user-admin", element: <SuperUserPage /> },
            // { path: "/dashboard", element: <DashboardPage /> },


        ]
    }
])