import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSlots } from "../features/services/servicesSlice";
import { getEvents } from "../features/slots/slotsSlice";
import Day from "./Day";

export default function Service({ service }) {
    const dispatch = useDispatch();

    const week = useSelector((state) => state.week.week);
    const slots = useSelector((state) => state.slots.slots);
    const events = useSelector((state) => state.events.events);

    useEffect(() => {
        dispatch(getSlots(slots));
        dispatch(getEvents(events));
    }, [dispatch]);

    const slotsId = service.slotsId;

    const eventsIdForSlot = slotsId.map((slotId) => {
        const slot = slots.find((slot) => slot.id === slotId);
        return slot.eventsId;
    });
    const eventsForService = eventsIdForSlot
        .map((eventsId) =>
            eventsId.map((eventId) =>
                events.filter((event) => event.id === eventId)
            )
        )
        .flat(100);

    return (
        <>
            <td>{service.name}</td>
            {week.dates.map((date) => {
                const eventsForServiceAndDate = eventsForService.filter(
                    (event) => event.date === date
                );
                return (
                    <td>
                        <Day
                            eventsForServiceAndDate={eventsForServiceAndDate}
                        />
                    </td>
                );
            })}
        </>
    );
}
