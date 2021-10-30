import React, { useState } from "react";
import "../styles/EventTooltip.css";
import { useSelector, useDispatch } from "react-redux";
import { editEvent } from "../features/events/eventsSlice";

export default function EventTooltip({ children, event }) {
    const dispatch = useDispatch();

    const [isEdited, setIsEdited] = useState(false);
    const [editedEvent, setEditedEvent] = useState({
        id: event.id,
        slot_id: event.slot_id,
        user_id: event.user_id,
        date: event.date
    });

    const users = useSelector((state) => state.users.users);
    const slots = useSelector((state) => state.slots.slots);

    const distinctSlots = [
        slots.find((slot) => slot.name === "Matin"),
        slots.find((slot) => slot.name === "Après-midi"),
        slots.find((slot) => slot.name === "Soir")
    ];

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(editEvent(editedEvent));
        setIsEdited(false);
    };

    return (
        <div className="tooltip-container">
            <div className={isEdited ? "tooltip-box visible" : "tooltip-box"}>
                <form onSubmit={handleOnSubmit}>
                    <select
                        value={editedEvent.slot_id}
                        onChange={(e) =>
                            setEditedEvent({
                                ...editedEvent,
                                slot_id: Number(e.target.value)
                            })
                        }
                    >
                        {distinctSlots.map((slot) => (
                            <option key={slot.id} value={slot.id}>
                                {slot.name}
                            </option>
                        ))}
                    </select>
                    <select
                        value={editedEvent.user_id}
                        onChange={(e) =>
                            setEditedEvent({
                                ...editedEvent,
                                user_id: Number(e.target.value)
                            })
                        }
                    >
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.last_name + " " + user.first_name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="date"
                        value={editedEvent.date}
                        onChange={(e) =>
                            setEditedEvent({
                                ...editedEvent,
                                date: e.target.value
                            })
                        }
                    />
                    <input type="submit" value="Submit" />
                </form>
            </div>
            <div
                className="edit-container"
                onClick={() => setIsEdited(!isEdited)}
            >
                {children}
            </div>
        </div>
    );
}
