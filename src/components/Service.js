import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Day from "./Day";

export default function Service({ service }) {
    const week = useSelector((state) => state.week.week);
    const slots = useSelector((state) => state.slots.slots);
    const events = useSelector((state) => state.events.events);
    const [eventsForService, setEventsForService] = useState([]);

    useEffect(() => {
        const slotsId = service.slotsId;

        const eventsIdForSlot = slotsId.map((slotId) => {
            const slot = slots.find((slot) => slot.id === slotId);
            return slot.eventsId;
        });

        setEventsForService(
            eventsIdForSlot
                .map((eventsId) =>
                    eventsId.map((eventId) =>
                        events.filter((event) => event.id === eventId)
                    )
                )
                .flat(2)
        );
    }, [service.slotsId, slots, events]);

    return (
        <>
            <td>{service.name}</td>
            {week.dates.map((date, index) => {
                const eventsForServiceAndDate = eventsForService.filter(
                    (event) => event.date === date
                );
                return (
                    <Day
                        key={index}
                        eventsForServiceAndDate={eventsForServiceAndDate}
                    />
                );
            })}
        </>
    );
}
