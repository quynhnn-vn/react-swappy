import { configureStore } from "@reduxjs/toolkit";
import servicesReducer from "../features/services/servicesSlice";
import slotsReducer from "../features/slots/slotsSlice";
import eventsReducer from "../features/events/eventsSlice";
import usersReducer from "../features/users/usersSlice";
import weekReducer from "../features/week/weekSlice";

export const store = configureStore({
    reducer: {
        services: servicesReducer,
        slots: slotsReducer,
        events: eventsReducer,
        users: usersReducer,
        week: weekReducer
    }
});
