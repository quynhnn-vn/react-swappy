import React from "react";
import Event from "./Event";

export default function Slot({ eventsForSlot }) {
    return (
        <td>
            {eventsForSlot.map((event) => (
                <Event key={event.id} event={event} />
            ))}
        </td>
    );
}
