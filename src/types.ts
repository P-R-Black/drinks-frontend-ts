export interface Drink {
    results: any[];
    id: number;
    drink_name: string;
    slug: string;
    base_alcohol: string[];
    drink_type: string;
    garnish: string[];
    ingredients: string[];
    serving_glass: string;
    mixing_direction: string;
    profile: string;
    must_know_drink: boolean;

}

export interface DailyDrinkProps {
    date: Date;
    year: number;
    month: number;
    dd: string;
    mm: string;
    todaysDrinkOfTheDay: any;
    currentDrink: Drink[];
    dateLookup: string | undefined;
    months: string[];
    handleDateClick: (date: string) => void;
    pastDrinksOfTheDay: any;
}


export interface AlcoholSelectProps {
    alcohol: string | undefined;
}

export interface ResultItem {
    ingredients: any;
    id: number | null | undefined;
    base_alcohol: string[];
    drink_name: string;
}

export interface DrinkRecipeProp {
    drinkName: string | undefined;
    alcohol: string | undefined
}


export interface CalendarProps {
    date: Date;
    year: number;
    month: number;
    handleDateClick: (date: string) => void;
    pastDrinksOfTheDay: { theDate: string }[];
    todaysDrinkOfTheDay: string;
}

export interface SearchResultItem {
    base_alcohol: string[];
    drink_name: string;
}


export interface SearchResultsProps {
    results: any;
    selectedItem: any;
    handleClose: Function;
}


export interface ToolTipProps {
    text: string;
    children: any;
}

export interface Event {
    theDate: string;
    name: string;
}
