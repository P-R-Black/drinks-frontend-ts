import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { Home } from '../pages/home/Home';
import { AlcoholSelectPage } from '../pages/alcoholSelectPages/AlcoholSelectPage';
import { AlcoholSelectPageTwo } from '../pages/alcoholSelectPagesTwo/AlcoholSelectPagesTwoPages';
import { DrinkRecipePage } from '../pages/drinkRecipePages/DrinkRecipePage';
import { ShotSelectPages } from '../pages/shotSelectPages/ShotSelectPages';
import { ShotSelectPagesTwo } from '../pages/shotSelectPagesTwo/ShotSelectPagesTwo';

// import { BuildDrinkPage } from '../pages/buildDrinkPage/BuildDrinkPage';
// import { AboutUs } from '../pages/about/About';
// import { Contact } from '../pages/contact/Contact';
// import { Terms } from '../pages/terms/Terms';
// import { Privacy } from '../pages/privacy/Privacy';
// import { PageNotFound } from '../pages/notFound/NotFound';
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
            // { path: "/about-us", element: <AboutUs /> },
            // { path: "/contact-us", element: <Contact /> },
            // { path: "/terms-and-conditions", element: <Terms /> },
            // { path: "/privacy-policy", element: <Privacy /> },
            // { path: "*", element: <PageNotFound /> },

            // { path: "/keep-user-admin", element: <SuperUserPage /> },
            // { path: "/dashboard", element: <DashboardPage /> },


        ]
    }
])