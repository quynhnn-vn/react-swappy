import {
    formatDate,
    formatDateForHeader,
    getCurrentWeek,
    getWeekIndex,
    reStructure
} from "./utils";
import React, { useState, useEffect } from "react";
import services from "./data/services.json";
import "./App.css";
import Row from "./components/Row";
import PlanningHeader from "./components/PlanningHeader";
import { addDays, subDays } from "date-fns";

function App() {
    // Array contains all day of current week
    const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());
    // Week index of the current week - initial value = 44 for this week
    const currentWeekIndex = getWeekIndex(currentWeek[0]);
    // Week index after switching between weeks
    const [weekIndex, setWeekIndex] = useState(currentWeekIndex);
    // Flag to toggle when switching weeks
    const [isClicked, setIsClicked] = useState(false);
    // Array contains all re-structured data elements, each element is an object containing data of a service
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(services.map((service) => reStructure(service)));

        // Difference between the current week index and the week index after switched
        const diff = weekIndex - currentWeekIndex;
        // If diff = -1 => new currentWeek = old currentweek - 1 * 7days
        // If diff = 1 => new currentWeek = old currentweek + 1 * 7days
        if (isClicked) {
            diff > 0
                ? setCurrentWeek(
                      currentWeek.map((day) =>
                          formatDate(addDays(new Date(day), Math.abs(diff) * 7))
                      )
                  )
                : setCurrentWeek(
                      currentWeek.map((day) =>
                          formatDate(subDays(new Date(day), Math.abs(diff) * 7))
                      )
                  );
        }
        return () => {
            setIsClicked(false);
        };
    }, [isClicked, currentWeek, weekIndex, currentWeekIndex]);

    // Decrease the weekindex by 1 when click
    const handlePrevWeek = () => {
        setWeekIndex(weekIndex - 1);
        setIsClicked(true);
    };
    // Increase the weekindex by 1 when click
    const handleNextWeek = () => {
        setWeekIndex(weekIndex + 1);
        setIsClicked(true);
    };

    // Render the header for table
    // Add a custom element to currentWeek to make a space for the service column
    const renderHeader = () =>
        ["SERVICES", ...currentWeek].map((day, index) => (
            <th key={index}>
                {day !== "SERVICES" ? formatDateForHeader(new Date(day)) : day}
            </th>
        ));

    // Render each row of table
    const renderRow = (service) => (
        <Row
            key={service.id}
            currentWeek={currentWeek}
            service={reStructure(service)}
        />
    );
    return (
        <div className="App">
            <PlanningHeader
                currentWeek={currentWeek}
                handleNextWeek={handleNextWeek}
                handlePrevWeek={handlePrevWeek}
            />
            <table>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {data.map((service) => (
                        <tr key={service.id}>{renderRow(service)}</tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
