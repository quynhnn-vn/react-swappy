import React from "react";
import "../styles/SwitchWeek.css";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";
import { getNextWeek, getPrevWeek } from "../features/week/weekSlice";
import { getWeekOfYear } from "../utils";

export default function SwitchWeek() {
    const dispatch = useDispatch();
    const week = useSelector((state) => state.week.week);

    const handlePrevWeek = () => {
        dispatch(getPrevWeek());
    };

    const handleNextWeek = () => {
        dispatch(getNextWeek());
    };

    return (
        <div className="switch-container">
            <button className="switch-btn" onClick={handlePrevWeek}>
                <AiOutlineLeftCircle className="switch-icon" />
            </button>
            <span className="switch-span">
                {week.dates && getWeekOfYear(week.dates[0])}
            </span>
            <button className="switch-btn" onClick={handleNextWeek}>
                <AiOutlineRightCircle className="switch-icon" />
            </button>
        </div>
    );
}
