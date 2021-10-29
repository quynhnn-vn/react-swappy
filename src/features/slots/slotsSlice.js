import { createSlice } from "@reduxjs/toolkit";
import slotsData from "../../data/slots.json";
import eventsData from "../../data/events.json";

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
        getEvents: (state) => {
            const events = eventsData;
            state.slots = state.slots.map((slot) => ({
                ...slot,
                eventsId: events
                    .filter((event) => event.slot_id === slot.id)
                    .map((event) => event.id)
            }));
        },
        // action.payload has form: {eventId: "",serviceId: "", slotId: "", userId: "", "date": ""}
        editSlot: (state, action) => {
            const index = state.slots.findIndex(
                (slot) => slot.id === action.payload.slotId
            );
            const editedSlot = {
                ...state.slots[index],
                service_id: action.payload.serviceId
            };
            state.slots = state.slots.map((slot) =>
                slot.id === action.payload.slotId ? editedSlot : slot
            );
        }
    }
});
export const { loadSlots, getEvents, editSlot } = slotsSlice.actions;
export default slotsSlice.reducer;
