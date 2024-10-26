import React, { useState, useEffect, useCallback } from 'react';
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import './calendar.css';

interface CalendarProps {
    date: Date;
    year: number;
    month: number;
    handleDateClick: (date: string) => void;
    pastDrinksOfTheDay: { theDate: string }[];
    todaysDrinkOfTheDay: string;
}

export const Calendar: React.FC<CalendarProps> = ({ date, year, month, handleDateClick, pastDrinksOfTheDay }) => {
    const [calendarYear, setCalendarYear] = useState(year);
    const [calendarMonth, setCalendarMonth] = useState(month);
    const [calendarData, setCalendarData] = useState<any[]>([]);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    useEffect(() => {
        const generateCalendar = () => {
            const dayOne = new Date(calendarYear, calendarMonth, 1).getDay();
            const lastDate = new Date(calendarYear, calendarMonth + 1, 0).getDate();
            const dayEnd = new Date(calendarYear, calendarMonth, lastDate).getDay();
            const monthLastDate = new Date(calendarYear, calendarMonth, 0).getDate();

            let dates: any[] = [];
            const drinkDates = pastDrinksOfTheDay.map(drink => drink.theDate.split('T')[0]);

            // Add previous month dates
            for (let i = dayOne; i > 0; i--) {
                dates.push({ date: monthLastDate - i + 1, inactive: true, type: 'lastMonthDays' });
            }

            // Add current month dates
            for (let i = 1; i <= lastDate; i++) {
                const isToday = i === date.getDate() && calendarMonth === date.getMonth() && calendarYear === date.getFullYear();
                const currentDate = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
                dates.push({ date: i, inactive: false, isToday, hasDrink: drinkDates.includes(currentDate), type: '' });
            }

            // Add next month dates
            for (let i = dayEnd; i < 6; i++) {
                dates.push({ date: i - dayEnd + 1, inactive: true, type: 'nextMonthDays' });
            }

            setCalendarData(dates);
        };

        generateCalendar();
    }, [calendarYear, calendarMonth, date, pastDrinksOfTheDay]);

    const adjustMonth = (increment: number) => {
        setCalendarMonth(prev => {
            const newMonth = prev + increment;
            if (newMonth < 0) {
                setCalendarYear(calendarYear - 1);
                return 11;
            } else if (newMonth > 11) {
                setCalendarYear(calendarYear + 1);
                return 0;
            }
            return newMonth;
        });
    };

    const onDateClick = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
        const clickedDate = e.currentTarget.getAttribute('data-date');
        if (clickedDate) {
            handleDateClick(clickedDate); // Call the prop handler if needed
        }
    }, [handleDateClick]);

    return (
        <section className="calendarSection">
            <div className="containerCalendar">
                <header className="calendarHeader">
                    <p style={{ color: 'white' }} className="calendarCurrentDate">
                        {months[calendarMonth]} {calendarYear}
                    </p>
                    <div className="calendarNavigation">
                        <span id="calendarPrevious" onClick={() => adjustMonth(-1)}><MdNavigateBefore /></span>
                        <span id="calendarNext" onClick={() => adjustMonth(1)}><MdNavigateNext /></span>
                    </div>
                </header>
                <div className="calendarBody">
                    <ul className="calendarWeekdays">
                        <li>Sun</li>
                        <li>Mon</li>
                        <li>Tue</li>
                        <li>Wed</li>
                        <li>Thu</li>
                        <li>Fri</li>
                        <li>Sat</li>
                    </ul>
                    <ul className="calendarDates" id="calendarDates">
                        {calendarData.map((day, index) => (
                            <li
                                key={index}
                                onClick={onDateClick}
                                className={`${day.inactive ? 'inactive ' : ''}${day.isToday ? 'active ' : ''}${day.hasDrink ? 'has-drink ' : ''} calDate ${day.type}`}
                                data-date={`${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${String(day.date).padStart(2, '0')}`}
                            >
                                {day.date}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};
