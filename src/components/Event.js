import React from "react";
import "../styles/Event.css";
import { getUser, getColor } from "../utils";
import EventTooltip from "./EventTooltip";

export default function Event({ event }) {
    const style = {
        backgroundColor: getColor(event.slot_id)
    };
    return (
        <EventTooltip event={event}>
            <button className="event-btn" style={style}>
                {getUser(event.user_id)}
            </button>
        </EventTooltip>
    );
}
