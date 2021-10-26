import React from "react";
import Day from "./Day";
import Event from "./Event";

export default function Row({ service, currentWeek }) {
    return (
        <>
            <td>{service.name}</td>
            {currentWeek.map((day) => {
                const eventsOfDay = service.eventsForSlots.filter(
                    (event) => event.date === day
                );
                return (
                    <td>
                        <Day day={day} eventsOfDay={eventsOfDay} />
                    </td>
                );
            })}
        </>
    );
}
