import { configureStore } from "@reduxjs/toolkit";
import servicesReducer from "../features/services/servicesSlice";
import slotsReducer from "../features/slots/slotsSlice";
import eventsReducer from "../features/events/eventsSlice";
import usersReducer from "../features/users/usersSlice";

export const store = configureStore({
    reducer: {
        services: servicesReducer,
        slots: slotsReducer,
        events: eventsReducer,
        users: usersReducer
    }
});
