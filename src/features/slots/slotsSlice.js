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
                eventsId: [
                    ...new Set(
                        events
                            .filter((event) => event.slot_id === slot.id)
                            .map((event) => event.id)
                    )
                ]
            }));
        },
        /* action.payload has form:
        { id: "", old_slot_id: "", new_slot_id: "", slot_name: "", user_id: "", date: "" } */
        editEventsId: (state, action) => {
            const basicSlots = [
                { name: "Matin", color: "#7F9CC7" },
                { name: "Après-midi", color: "#2B4162" },
                { name: "Soir", color: "#020969" }
            ];
            const oldIndex = state.slots.findIndex(
                (slot) => slot.id === action.payload.old_slot_id
            );
            const oldServiceId = state.slots[oldIndex].service_id;
            const editedOldSlot = {
                ...state.slots[oldIndex],
                eventsId: state.slots[oldIndex].eventsId.filter(
                    (eventId) => eventId !== action.payload.id
                )
            };
            const newSlot = {
                id: action.payload.new_slot_id,
                service_id: oldServiceId,
                name: action.payload.slot_name,
                color: basicSlots.find(
                    (slot) => slot.name === action.payload.slot_name
                ).color,
                eventsId: [action.payload.id]
            };
            state.slots.push(newSlot);
            state.slots = [
                ...new Set(
                    state.slots.map((slot) =>
                        slot.id === action.payload.old_slot_id
                            ? editedOldSlot
                            : slot
                    )
                )
            ];
        }
    }
});
export const { loadSlots, getEvents, editEventsId } = slotsSlice.actions;
export default slotsSlice.reducer;
