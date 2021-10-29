import React, { useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { loadEvents } from "./features/events/eventsSlice";
import { getSlots, loadServices } from "./features/services/servicesSlice";
import { getEvents, loadSlots } from "./features/slots/slotsSlice";
import { loadUsers } from "./features/users/usersSlice";
import { loadWeek } from "./features/week/weekSlice";
import Table from "./components/Table";
import SwitchWeek from "./components/SwitchWeek";

export default function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadWeek());
        dispatch(loadServices());
        dispatch(loadSlots());
        dispatch(loadEvents());
        dispatch(loadUsers());
        dispatch(getSlots());
        dispatch(getEvents());
    }, [dispatch]);

    return (
        <div>
            <SwitchWeek />
            <Table />
        </div>
    );
}
