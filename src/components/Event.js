import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../styles/Event.css";
import { getUser } from "../utils";
import EventTooltip from "./EventTooltip";

export default function Event({ event }) {
    const slots = useSelector((state) => state.slots.slots);
    const [style, setStyle] = useState({
        backgroundColor: ""
    });
    useEffect(() => {
        setStyle({
            backgroundColor: slots.find((slot) => slot.id === event.slot_id)
                .color
        });
    }, [event.slot_id, slots]);

    return (
        <EventTooltip event={event}>
            <button className="event-btn" style={style}>
                {getUser(event.user_id)}
            </button>
        </EventTooltip>
    );
}
