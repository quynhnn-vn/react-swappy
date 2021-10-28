import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadEvents } from "../features/events/eventsSlice";
import Services from "../features/services/Services";
import { loadServices } from "../features/services/servicesSlice";
import Slots from "../features/slots/Slots";
import { loadSlots } from "../features/slots/slotsSlice";
import { loadUsers } from "../features/users/usersSlice";
import Week from "../features/week/Week";
import { loadWeek } from "../features/week/weekSlice";

export default function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadWeek());

        dispatch(loadServices());

        dispatch(loadSlots());

        dispatch(loadEvents());

        dispatch(loadUsers());
    }, [dispatch]);
    return (
        <div>
            <Week />
            <Services />
            <Slots />
            {/*<Events />
            <Users /> */}
        </div>
    );
}
