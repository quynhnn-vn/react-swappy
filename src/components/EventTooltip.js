import React, { useState } from "react";
import "../styles/EventTooltip.css";
import { useSelector, useDispatch } from "react-redux";
import { editEventsAndUpdateSlot } from "../features/events/eventsSlice";

export default function EventTooltip({ children, event }) {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);

    const [isEdited, setIsEdited] = useState(false);
    const [editedEvent, setEditedEvent] = useState({
        id: event.id,
        old_slot_id: event.slot_id,
        new_slot_id: Math.floor(Math.random() * 1000 + 18),
        slot_name: "Matin",
        user_id: event.user_id,
        date: event.date
    });

    const basicSlots = [
        { name: "Matin", color: "#7F9CC7" },
        { name: "Après-midi", color: "#2B4162" },
        { name: "Soir", color: "#020969" }
    ];

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
                            value={editedEvent.slot_name}
                            onChange={(e) =>
                                setEditedEvent({
                                    ...editedEvent,
                                    slot_name: e.target.value
                                })
                            }
                        >
                            {basicSlots.map((slot, index) => (
                                <option key={index} value={slot.name}>
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
