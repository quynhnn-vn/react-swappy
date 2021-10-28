import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNextWeek, getPrevWeek, selectWeek } from "./weekSlice";

export default function Week() {
    const dispatch = useDispatch();
    const week = useSelector(selectWeek);
    const handlePrevWeek = () => {
        dispatch(getPrevWeek());
    };
    const handleNextWeek = () => {
        dispatch(getNextWeek());
    };
    return (
        <div>
            <button onClick={handlePrevWeek}>Prev Week</button>
            <button onClick={handleNextWeek}>Next Week</button>
            <p key={week.index}>{week.dates && week.dates.toString()}</p>
        </div>
    );
}
