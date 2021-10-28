import React from "react";
import { getUser, getColor } from "../utils";

export default function Event({ event }) {
    const style = {
        backgroundColor: getColor(event.slot_id)
    };
    return (
        <span>
            <button style={style}>
                {getUser(event.user_id)}
                {/* {isEdited && (
                    <EventDetails
                        editedEvent={editedEvent}
                        setEditedEvent={setEditedEvent}
                    />
                )} */}
            </button>
        </span>
    );
}
