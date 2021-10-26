import React from "react";
import users from "../data/users.json";
import services from "../data/services.json";

export default function EventDetails({ editedEvent, setEditedEvent }) {
    return (
        <form>
            <label>Select a service: </label>
            <select
                value={editedEvent.name}
                onChange={(e) =>
                    setEditedEvent({
                        ...editedEvent,
                        name: e.target.value
                    })
                }
            >
                {services.map((service) => (
                    <option key={service.id} value={service.name}>
                        {service.name}
                    </option>
                ))}
            </select>
            <label>Select a slot: </label>
            <select
                value={editedEvent.slot}
                onChange={(e) =>
                    setEditedEvent({
                        ...editedEvent,
                        slot: e.target.value
                    })
                }
            >
                {["Matin", "AM", "Soir"].map((slot, index) => (
                    <option key={index} value={slot}>
                        {slot}
                    </option>
                ))}
            </select>
            <label>Select a user: </label>
            <select
                value={editedEvent.user}
                onChange={(e) =>
                    setEditedEvent({
                        ...editedEvent,
                        user: e.target.value
                    })
                }
            >
                {users.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.last_name + " " + user.first_name}
                    </option>
                ))}
            </select>
            <input type="submit" value="Submit" />
        </form>
    );
}
