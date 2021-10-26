import React from "react";
import { getWeekOfYear } from "../utils";

export default function PlanningHeader({
    currentWeek,
    handlePrevWeek,
    handleNextWeek
}) {
    return (
        <div>
            <button onClick={handlePrevWeek}>Prev Week</button>
            <h3>{getWeekOfYear(currentWeek[0])}</h3>
            <button onClick={handleNextWeek}>Next Week</button>
        </div>
    );
}
