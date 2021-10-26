import React from "react";
import Event from "./Event";

export default function Day({ day, eventsOfDay }) {
    return (
        <div>
            {eventsOfDay && eventsOfDay.map((event) => <Event event={event} />)}
        </div>
    );
}
