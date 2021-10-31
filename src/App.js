import React, { useEffect } from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { loadEvents } from "./features/events/eventsSlice";
import { getSlots, loadServices } from "./features/services/servicesSlice";
import { getEvents, loadSlots } from "./features/slots/slotsSlice";
import { loadUsers } from "./features/users/usersSlice";
import { loadWeek } from "./features/week/weekSlice";

import Table from "./components/Table";
// import SideBar from "./components/SideBar";

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
        <Router>
            <div className="app-container">
                {/* <SideBar /> */}
                <Switch>
                    <Route exact path="/">
                        <Table />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
