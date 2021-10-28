import { createSlice } from "@reduxjs/toolkit";
import slotsData from "../../data/slots.json";
/* Slots state has form:
    slots : [
        {
            id: 8,
            service_id: 2,
            name: "Après-midi",
            color: "#2B4162",
            eventsId: [],
        }
    ];
*/
export const slotsSlice = createSlice({
    name: "slots",
    initialState: {
        slots: []
    },
    reducers: {
        loadSlots: (state) => {
            state.slots = slotsData.map((slot) => ({
                ...slot,
                eventsId: []
            }));
        },
        getEvents: (state, action) => {
            const events = action.payload;
            state.slots = state.slots.map((slot) => ({
                ...slot,
                eventsId: events
                    .filter((event) => event.slot_id === slot.id)
                    .map((event) => event.id)
            }));
        }
    }
});
export const { loadSlots, getEvents } = slotsSlice.actions;
export const selectSlots = (state) => state.slots.slots;
export default slotsSlice.reducer;
