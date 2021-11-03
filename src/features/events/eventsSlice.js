import { createSlice } from "@reduxjs/toolkit";
import eventsData from "../../data/events.json";
import { editEventsId } from "../slots/slotsSlice";
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
export const editEventAndUpdateSlots = (payload) => {
    return (dispatch) => {
        dispatch(editEventsId(payload));
        dispatch(editEvent(payload));
    };
};
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
        {
            id: event.id,
            old_slot_id: event.slot_id,
            new_slot_id: event.slot_id,
            slot_name: "Matin",
            user_id: event.user_id,
            date: event.date
        } 
        */
        editEvent: (state, action) => {
            const editedEvent = {
                id: action.payload.id,
                slot_id: action.payload.new_slot_id,
                user_id: action.payload.user_id,
                date: action.payload.date
            };

            state.events = state.events.map((event) =>
                event.id === action.payload.id ? editedEvent : event
            );
        },
        deleteEvent: (state, action) => {
            state.events = state.events.filter(
                (event) => event.id !== action.payload
            );
        }
    }
});
export const { loadEvents, editEvent, deleteEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
