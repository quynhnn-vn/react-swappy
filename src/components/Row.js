import React from "react";
import Day from "./Day";

export default function Row({ service, currentWeek }) {
    return (
        <>
            <td>{service.name}</td>
            {currentWeek.map((day, index) => {
                const eventsOfDay = service.eventsForSlots.filter(
                    (event) => event.date === day
                );
                return (
                    <td key={index}>
                        <Day day={day} eventsOfDay={eventsOfDay} />
                    </td>
                );
            })}
        </>
    );
}
