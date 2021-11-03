import React, { useState } from "react";
import "../styles/SwitchWeek.css";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";
import { getNextWeek, getPrevWeek } from "../features/week/weekSlice";
import { getWeekOfYear } from "../utils";
import NewEventForm from "./NewEventForm";

export default function SwitchWeek() {
    const dispatch = useDispatch();
    const week = useSelector((state) => state.week.week);
    const [isAdded, setIsAdded] = useState(false);

    const handlePrevWeek = () => {
        dispatch(getPrevWeek());
    };

    const handleNextWeek = () => {
        dispatch(getNextWeek());
    };

    const handleAddEvent = () => {
        setIsAdded(!isAdded);
    };

    return (
        <>
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
                <button onClick={handleAddEvent}>
                    {isAdded ? "Annuler l'ajoute" : "Ajouter un événement"}
                </button>
            </div>
            <div>{isAdded && <NewEventForm />}</div>
        </>
    );
}
