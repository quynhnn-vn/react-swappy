import React, { useState } from "react";
import "../styles/EventTooltip.css";
import { useSelector, useDispatch } from "react-redux";
import { editEventsAndUpdateSlot } from "../features/events/eventsSlice";

export default function EventTooltip({ children, event }) {
    const dispatch = useDispatch();

    const [isEdited, setIsEdited] = useState(false);
    const [editedEvent, setEditedEvent] = useState({
        id: event.id,
        old_slot_id: event.slot_id,
        new_slot_id: event.slot_id,
        user_id: event.user_id,
        date: event.date
    });

    const users = useSelector((state) => state.users.users);
    const slots = useSelector((state) => state.slots.slots);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(editEventsAndUpdateSlot(editedEvent));
        setIsEdited(false);
    };
    return (
        <div className="tooltip-container">
            <div className={isEdited ? "tooltip-box visible" : "tooltip-box"}>
                <form onSubmit={handleOnSubmit}>
                    <h3>Modifier un event</h3>
                    <div className="input-container">
                        Créneau:
                        <select
                            value={editedEvent.new_slot_id}
                            onChange={(e) =>
                                setEditedEvent({
                                    ...editedEvent,
                                    new_slot_id: Number(e.target.value)
                                })
                            }
                        >
                            {slots.map((slot) => (
                                <option key={slot.id} value={slot.id}>
                                    {slot.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="input-container">
                        Médecin:
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
                    </div>
                    <div className="input-container">
                        Date:
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
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>
            <div onClick={() => setIsEdited(!isEdited)}>{children}</div>
        </div>
    );
}
