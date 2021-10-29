import React, { useState } from "react";
import { getUser, getColor } from "../utils";
import EventDetails from "./EventDetails";

export default function Event({ event }) {
    const [isEdited, setIsEdited] = useState(false);
    const style = {
        backgroundColor: getColor(event.slot_id)
    };
    return (
        <div style={style}>
            {getUser(event.user_id)}
            <button onClick={() => setIsEdited(!isEdited)}>
                {isEdited ? "Hide" : "Edit"}
            </button>
            {isEdited && <EventDetails eventId={event.id} />}
        </div>
    );
}
