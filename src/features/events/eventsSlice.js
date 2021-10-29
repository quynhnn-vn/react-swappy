import { createSlice } from "@reduxjs/toolkit";
import eventsData from "../../data/events.json";
import { editSlot } from "../slots/slotsSlice";
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
export const editEventAndSlot = (payload) => {
    return (dispatch) => {
        dispatch(editEvent(payload));
        dispatch(editSlot(payload));
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
        {id: '456', user_id: '16', slot_id: '123', date: "2021-10-22"}
        */
        addEvent: (state, action) => {
            state.events = [...state.events, action.payload];
        },
        // action.payload has form: {eventId: "","serviceId": "", "slotId": "", "userId": "", "date": ""}
        editEvent: (state, action) => {
            const index = state.events.findIndex(
                (event) => event.id === action.payload.eventId
            );
            const editedEvent = {
                ...state.events[index],
                user_id: action.payload.userId,
                slot_id: action.payload.slotId,
                date: action.payload.date
            };
            state.events = state.events.map((event) =>
                event.id === action.payload.eventId ? editedEvent : event
            );
        }
    }
});
export const { loadEvents, addEvent, editEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
