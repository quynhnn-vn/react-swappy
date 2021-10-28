import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectEvents } from "../events/eventsSlice";
import { getEvents, selectSlots } from "./slotsSlice";

export default function Slots() {
    const dispatch = useDispatch();
    const slots = useSelector(selectSlots);
    const events = useSelector(selectEvents);
    useEffect(() => {
        dispatch(getEvents(events));
    }, [dispatch, events]);
    return (
        <div>
            {slots.map((slot) => (
                <div>
                    <span key={slot.id}>{slot.name}</span>
                    {slot.eventsId.map((eventId) => (
                        <span key={slot.id}>{eventId + "--"}</span>
                    ))}
                </div>
            ))}
        </div>
    );
}
