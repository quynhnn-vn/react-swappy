import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEvent } from "../features/events/eventsSlice";
import { addEventId } from "../features/slots/slotsSlice";
import { basicSlots, formatDate } from "../utils";

export default function NewEventForm() {
    const dispatch = useDispatch();

    const services = useSelector((state) => state.services.services);
    const users = useSelector((state) => state.users.users);
    const slots = useSelector((state) => state.slots.slots);

    const [newEvent, setNewEvent] = useState({
        id: Math.floor(Math.random() * 10000 + 200),
        service_id: 1,
        user_id: 1,
        slot_name: "Matin",
        slot_id: 1,
        date: formatDate(new Date())
    });

    const findSlotId = (slotName, serviceId) =>
        slots.find(
            (slot) => slot.name === slotName && slot.service_id === serviceId
        ).id;

    const handleChangeSlot = (e) => {
        setNewEvent({
            ...newEvent,
            slot_name: e.target.value,
            slot_id: findSlotId(e.target.value, newEvent.service_id)
        });
    };
    console.log(newEvent);
    const handleSubmitAdd = (e) => {
        e.preventDefault();
        dispatch(addEvent(newEvent));
        dispatch(addEventId(newEvent));
    };

    return (
        <form onSubmit={handleSubmitAdd}>
            <h3>Ajouter un event</h3>
            <div className="input-container">
                <label>Service</label>
                <select
                    value={newEvent.service_id}
                    onChange={(e) =>
                        setNewEvent({
                            ...newEvent,
                            service_id: Number(e.target.value)
                        })
                    }
                >
                    {services.map((service) => (
                        <option key={service.id} value={service.id}>
                            {service.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="input-container">
                <label>Créneau</label>
                <select value={newEvent.slot_name} onChange={handleChangeSlot}>
                    {basicSlots.map((slot, index) => (
                        <option key={index} value={slot.name}>
                            {slot.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="input-container">
                <label>Médecin</label>
                <select
                    value={newEvent.user_id}
                    onChange={(e) =>
                        setNewEvent({
                            ...newEvent,
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
                <label>Date</label>
                <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) =>
                        setNewEvent({
                            ...newEvent,
                            date: e.target.value
                        })
                    }
                />
            </div>
            <input type="submit" value="Envoyer" />
        </form>
    );
}
