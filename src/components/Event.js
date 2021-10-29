import React, { useState } from "react";
import { getUser, getColor } from "../utils";
import EventDetails from "./EventDetails";

export default function Event({ event }) {
    const [isEdited, setIsEdited] = useState(false);
    const style = {
        backgroundColor: getColor(event.slot_id)
    };
    return (
        <>
            <button onClick={() => setIsEdited(!isEdited)} style={style}>
                {getUser(event.user_id)}
            </button>
            {isEdited && <EventDetails event={event} />}
        </>
    );
}
