import React from "react";
import "../styles/Day.css";
import Event from "./Event";

export default function Day({ eventsForServiceAndDate }) {
    return (
        <div className="day-container">
            {eventsForServiceAndDate.map((event) => {
                return <Event key={event.id} event={event} />;
            })}
        </div>
    );
}
