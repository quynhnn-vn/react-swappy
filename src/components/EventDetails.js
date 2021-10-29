import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editEventAndSlot } from "../features/events/eventsSlice";

export default function EventDetails({ eventId }) {
    const dispatch = useDispatch();
    //const events = useSelector((state) => state.events.events);

    const [editedEvent, setEditedEvent] = useState({
        eventId: eventId,
        serviceId: 0,
        slotId: 0,
        userId: 0,
        date: ""
    });
    const services = useSelector((state) => state.services.services);
    const users = useSelector((state) => state.users.users);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(editEventAndSlot(editedEvent));
    };

    return (
        <form onSubmit={handleOnSubmit}>
            <select
                value={editedEvent.serviceId}
                onChange={(e) =>
                    setEditedEvent({
                        ...editedEvent,
                        serviceId: Number(e.target.value)
                    })
                }
            >
                {services.map((service) => (
                    <option key={service.id} value={service.id}>
                        {service.name}
                    </option>
                ))}
            </select>
            <select
                value={editedEvent.slotId}
                onChange={(e) =>
                    setEditedEvent({
                        ...editedEvent,
                        slotId: Number(e.target.value)
                    })
                }
            >
                {[
                    { id: 1, name: "Matin" },
                    { id: 2, name: "AM" },
                    { id: 3, name: "Soir" }
                ].map((slot) => (
                    <option key={slot.id} value={slot.id}>
                        {slot.name}
                    </option>
                ))}
            </select>
            <select
                value={editedEvent.userId}
                onChange={(e) =>
                    setEditedEvent({
                        ...editedEvent,
                        userId: Number(e.target.value)
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
    );
}
