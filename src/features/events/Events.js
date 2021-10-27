import React from "react";
import { useSelector } from "react-redux";
import { selectEvents } from "./eventsSlice";

export default function Events() {
    const events = useSelector(selectEvents);
    return (
        <div>
            {events.map((event) => (
                <p key={event.id}>{event.date}</p>
            ))}
        </div>
    );
}
