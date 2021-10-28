import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNextWeek, getPrevWeek } from "../features/week/weekSlice";
import { getWeekOfYear } from "../utils";

export default function SwitchWeek() {
    const week = useSelector((state) => state.week.week);
    const dispatch = useDispatch();
    const handlePrevWeek = () => {
        dispatch(getPrevWeek());
    };
    const handleNextWeek = () => {
        dispatch(getNextWeek());
    };

    return (
        <div>
            <button onClick={handlePrevWeek}>Prev Week</button>
            <p>{week.dates && getWeekOfYear(week.dates[0])}</p>
            <button onClick={handleNextWeek}>Next Week</button>
        </div>
    );
}
