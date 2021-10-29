import React from "react";
import { useSelector } from "react-redux";
import Day from "./Day";

export default function Service({ service }) {
    const week = useSelector((state) => state.week.week);
    const slots = useSelector((state) => state.slots.slots);
    const events = useSelector((state) => state.events.events);

    const slotsId = service.slotsId;

    const eventsIdForSlot = slotsId.map((slotId) => {
        const slot = slots.find((slot) => slot.id === slotId);
        return [...new Set(slot.eventsId)];
    });

    console.log(slots[0]);
    const eventsForService = eventsIdForSlot
        .map((eventsId) =>
            eventsId.map((eventId) =>
                events.filter((event) => event.id === eventId)
            )
        )
        .flat(2);
    return (
        <>
            <td>{service.name}</td>
            {week.dates.map((date, index) => {
                const eventsForServiceAndDate = eventsForService.filter(
                    (event) => event.date === date
                );
                return (
                    <td key={index}>
                        <Day
                            eventsForServiceAndDate={eventsForServiceAndDate}
                        />
                    </td>
                );
            })}
        </>
    );
}
