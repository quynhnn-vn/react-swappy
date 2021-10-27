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
        addEvent: (state, action) => {
            state.events = [...state.events, action.payload];
        },
        editEvent: (state, action) => {
            // const index = state.events.findIndex(
            //     (event) => event.id === action.payload.id
            // );
            // const editedState = {...state.events[index], }
            // state.events =
        }
    }
});
export const { loadEvents, addEvent, editEvent } = eventsSlice.actions;
export const selectEvents = (state) => state.events.events;
export default eventsSlice.reducer;
