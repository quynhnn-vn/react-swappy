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
        {id: '456', user_id: '16', old_slot_id: '123', new_slot_id: '23', date: "2021-10-22"}
        */
        editEventsId: (state, action) => {
            const oldIndex = state.slots.findIndex(
                (slot) => slot.id === action.payload.old_slot_id
            );
            const newIndex = state.slots.findIndex(
                (slot) => slot.id === action.payload.new_slot_id
            );
            const editedOldSlot = {
                ...state.slots[oldIndex],
                eventsId: state.slots[oldIndex].eventsId.filter(
                    (eventId) => eventId !== action.payload.id
                )
            };
            const editedNewSlot = {
                ...state.slots[newIndex],
                eventsId: [...state.slots[newIndex].eventsId, action.payload.id]
            };
            state.slots = [
                ...new Set(
                    state.slots.map((slot) => {
                        if (slot.id === action.payload.old_slot_id) {
                            return editedOldSlot;
                        } else if (slot.id === action.payload.new_slot_id) {
                            return editedNewSlot;
                        } else {
                            return slot;
                        }
                    })
                )
            ];
        }
    }
});
export const { loadSlots, getEvents, editEventsId } = slotsSlice.actions;
export default slotsSlice.reducer;
