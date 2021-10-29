import { createSlice } from "@reduxjs/toolkit";
import eventsData from "../../data/events.json";
/*
events: [
    {
        id: 62,
        user_id: 15,
        slot_id: 6,
        date: "2021-10-21"
    }
];
 */
export const eventsSlice = createSlice({
    name: "events",
    initialState: {
        events: []
    },
    reducers: {
        loadEvents: (state) => {
            state.events = eventsData;
        },
        /* action.payload has form: 
        {id: '456', user_id: '16', slot_id: '123', date: "2021-10-22"}
        */
        editEvent: (state, action) => {
            const index = state.events.findIndex(
                (event) => event.id === action.payload.id
            );
            const editedEvent = {
                ...state.events[index],
                user_id: action.payload.user_id,
                slot_id: action.payload.slot_id,
                date: action.payload.date
            };
            state.events = [
                ...new Set(
                    state.events.map((event) =>
                        event.id === action.payload.id ? editedEvent : event
                    )
                )
            ];
        }
    }
});
export const { loadEvents, editEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
