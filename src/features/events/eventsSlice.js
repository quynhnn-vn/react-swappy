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
export const editEventsAndUpdateSlot = (payload) => {
    return (dispatch) => {
        dispatch(editEvent(payload));
        dispatch(editEventsId(payload));
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
        {id: '456', user_id: '16', old_slot_id: '123', new_slot_id: '23', date: "2021-10-22"}
        */
        editEvent: (state, action) => {
            const index = state.events.findIndex(
                (event) => event.id === action.payload.id
            );
            const editedEvent = {
                ...state.events[index],
                slot_id: action.payload.new_slot_id,
                user_id: action.payload.user_id,
                date: action.payload.date
            };
            state.events = [
                ...new Set(
                    state.events.map((event) =>
                        event.id === action.payload.id ? editedEvent : event
                    )
                )
            ];
        },
        addEvent: (state, action) => {
            state.events = [...state.events, action.payload];
        }
    }
});
export const { loadEvents, editEvent, addEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
