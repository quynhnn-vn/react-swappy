import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Events from "../features/events/Events";
import { loadEvents } from "../features/events/eventsSlice";
import Services from "../features/services/Services";
import { loadServices } from "../features/services/servicesSlice";
import Slots from "../features/slots/Slots";
import { loadSlots } from "../features/slots/slotsSlice";
import Users from "../features/users/Users";
import { loadUsers } from "../features/users/usersSlice";

export default function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadServices());
        dispatch(loadSlots());
        dispatch(loadEvents());
        dispatch(loadUsers());
    }, [dispatch]);
    return (
        <div>
            <Services />
            <Slots />
            <Events />
            <Users />
        </div>
    );
}
