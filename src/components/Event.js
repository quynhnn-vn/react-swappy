import React, { useState } from "react";
import { getColor, getUser } from "../utils";
import EventDetails from "./EvenDetails";

export default function Event({ event, slotId }) {
    const [isEdited, setIsEdited] = useState(false);
    const [editedEvent, setEditedEvent] = useState({
        name: "",
        slot: "",
        user: ""
    });
    const style = {
        backgroundColor: getColor(slotId)
    };
    const handleEdit = () => {
        setIsEdited(!isEdited);
    };
    return (
        <span>
            <button style={style}>
                {getUser(event.user_id)}
                {isEdited && (
                    <EventDetails
                        editedEvent={editedEvent}
                        setEditedEvent={setEditedEvent}
                    />
                )}
            </button>
            <button onClick={handleEdit}>{isEdited ? "Hide" : "Edit"}</button>
        </span>
    );
}
