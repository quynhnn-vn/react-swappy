import React, { useCallback, useEffect, useState } from "react";
import "../styles/EventTooltip.css";
import { useSelector, useDispatch } from "react-redux";
import { editEventsAndUpdateSlot } from "../features/events/eventsSlice";

export default function EventTooltip({ children, event }) {
    const dispatch = useDispatch();
    const slots = useSelector((state) => state.slots.slots);
    const users = useSelector((state) => state.users.users);

    const [isEdited, setIsEdited] = useState(false);
    const [editedEvent, setEditedEvent] = useState({
        id: "",
        old_slot_id: "",
        new_slot_id: "",
        slot_name: "",
        user_id: "",
        date: "",
        serviceId: ""
    });

    const index = slots.findIndex((slot) => slot.id === event.slot_id);
    const serviceId = slots[index].service_id;

    const findSlotName = useCallback(
        (slotId) => {
            return slots.find((slot) => slot.id === slotId).name;
        },
        [slots]
    );

    useEffect(() => {
        setEditedEvent({
            id: event.id,
            old_slot_id: event.slot_id,
            new_slot_id: event.slot_id,
            slot_name: findSlotName(event.slot_id),
            user_id: event.user_id,
            date: event.date,
            service_id: serviceId
        });
    }, [event, serviceId, findSlotName]);

    const basicSlots = [
        { name: "Matin", color: "#7F9CC7" },
        { name: "Après-midi", color: "#2B4162" },
        { name: "Soir", color: "#020969" }
    ];

    const findNewSlotId = (serviceId, slotName) => {
        const newSlot = slots.find(
            (slot) => slot.service_id === serviceId && slot.name === slotName
        );
        return newSlot
            ? Number(newSlot.id)
            : Number(Math.floor(Math.random() * 1000 + slots.length));
    };

    const handleOnChangeSlot = (e) => {
        setEditedEvent({
            ...editedEvent,
            slot_name: e.target.value,
            new_slot_id: findNewSlotId(serviceId, e.target.value)
        });
    };

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
                            onChange={handleOnChangeSlot}
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
