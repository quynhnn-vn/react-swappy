import React, { useState } from "react";
import { v4 as uuid } from "uuid";

export default function NewEvent() {
    const [newEvent, setNewEvent] = useState({
        id: uuid(),
        user_id: 0,
        slot_id: 0,
        date: new Date()
    });
    return (
        <div className="newevent-container">
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
    );
}
