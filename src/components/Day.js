import React from "react";
import Event from "./Event";

export default function Day({ eventsForServiceAndDate }) {
    return (
        <>
            {eventsForServiceAndDate.map((event) => {
                return <Event key={event.id} event={event} />;
            })}
        </>
    );
}
