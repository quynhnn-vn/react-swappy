import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function EventDetails() {
    //const dispatch = useDispatch();
    const [editedEvent, setEditedEvent] = useState({
        serviceName: "",
        slotName: "",
        userName: "",
        date: ""
    });
    // useEffect(() => {
    //     dispatch(editEvent(editedEvent));
    // }, [dispatch])
    const services = useSelector((state) => state.services.services);
    const users = useSelector((state) => state.users.users);
    return (
        <form>
            <select
                value={editedEvent.serviceName}
                onChange={(e) =>
                    setEditedEvent({
                        ...editedEvent,
                        serviceName: e.target.value
                    })
                }
            >
                {services.map((service) => (
                    <option key={service.id} value={service.name}>
                        {service.name}
                    </option>
                ))}
            </select>
            <select
                value={editedEvent.slotName}
                onChange={(e) =>
                    setEditedEvent({
                        ...editedEvent,
                        slotName: e.target.value
                    })
                }
            >
                {["Matin", "AM", "Soir"].map((slot, index) => (
                    <option key={index} value={slot}>
                        {slot}
                    </option>
                ))}
            </select>
            <select
                value={editedEvent.userName}
                onChange={(e) =>
                    setEditedEvent({
                        ...editedEvent,
                        userName: e.target.value
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
