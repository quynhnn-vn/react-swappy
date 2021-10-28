import React from "react";
import { useDispatch } from "react-redux";
import { getNextWeek, getPrevWeek } from "../features/week/weekSlice";

export default function SwitchWeek() {
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
            <button onClick={handleNextWeek}>Next Week</button>
        </div>
    );
}
