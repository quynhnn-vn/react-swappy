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
    const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());
    const currentWeekIndex = getWeekIndex(currentWeek[0]);
    const [weekIndex, setWeekIndex] = useState(currentWeekIndex);
    const [isClicked, setIsClicked] = useState(false);

    const [data, setData] = useState([]);
    useEffect(() => {
        setData(services.map((service) => reStructure(service)));

        const diff = weekIndex - currentWeekIndex;
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

    const handlePrevWeek = () => {
        setWeekIndex(weekIndex - 1);
        setIsClicked(true);
    };
    const handleNextWeek = () => {
        setWeekIndex(weekIndex + 1);
        setIsClicked(true);
    };

    const renderHeader = () =>
        ["SERVICES", ...currentWeek].map((day, index) => (
            <th key={index}>
                {day !== "SERVICES" ? formatDateForHeader(new Date(day)) : day}
            </th>
        ));
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
