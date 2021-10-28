import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadEvents } from "../features/events/eventsSlice";
import { loadServices } from "../features/services/servicesSlice";
import { loadSlots } from "../features/slots/slotsSlice";
import { loadUsers } from "../features/users/usersSlice";
import { loadWeek } from "../features/week/weekSlice";
import Table from "../reduxComponents/Table";
import SwitchWeek from "../reduxComponents/SwitchWeek";

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
            <SwitchWeek />
            <Table />
        </div>
    );
}
