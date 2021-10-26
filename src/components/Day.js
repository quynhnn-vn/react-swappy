import React from "react";
import Event from "./Event";

export default function Day({ eventsOfDay }) {
    return (
        <div>
            {eventsOfDay &&
                eventsOfDay.map((event) => (
                    <Event
                        key={event.id}
                        event={event}
                        slotId={event.slot_id}
                    />
                ))}
        </div>
    );
}
