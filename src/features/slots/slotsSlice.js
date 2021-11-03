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
        /* action.payload has form:
        {
            id: event.id,
            old_slot_id: event.slot_id,
            new_slot_id: event.slot_id,
            slot_name: "Matin",
            user_id: event.user_id,
            date: event.date,
        } 
        */
        editEventsId: (state, action) => {
            if (action.payload.old_slot_id !== action.payload.new_slot_id) {
                const oldSlot = state.slots.find(
                    (slot) => slot.id === action.payload.old_slot_id
                );
                const editedOldSlot = {
                    ...oldSlot,
                    eventsId: oldSlot.eventsId.filter(
                        (eventId) => eventId !== action.payload.id
                    )
                };
                const newSlot = state.slots.find(
                    (slot) => slot.id === action.payload.new_slot_id
                );

                const editedNewSlot = {
                    ...newSlot,
                    eventsId: [...newSlot.eventsId, action.payload.id]
                };

                state.slots = state.slots.map((slot) => {
                    if (slot.id === action.payload.old_slot_id) {
                        return editedOldSlot;
                    } else if (slot.id === action.payload.new_slot_id) {
                        return editedNewSlot;
                    } else {
                        return slot;
                    }
                });
            }
        },
        deleteEventId: (state, action) => {
            const deleteIndex = state.slots.findIndex((slot) =>
                slot.eventsId.includes(action.payload)
            );
            const deletedSlot = {
                ...state.slots[deleteIndex],
                eventsId: state.slots[deleteIndex].eventsId.filter(
                    (eventId) => eventId !== action.payload
                )
            };
            state.slots = state.slots.map((slot, index) =>
                index === deleteIndex ? deletedSlot : slot
            );
        },
        /* action.payload has form:
        {
            id: v4(),
            service_id: 1,
            user_id: 1,
            slot_name: "Matin",
            slot_id: 1,
            date: formatDate(new Date())
        } 
        */
        addEventId: (state, action) => {
            const oldSlot = state.slots.find(
                (slot) => slot.id === action.payload.slot_id
            );
            const editedOldSlot = {
                ...oldSlot,
                eventsId: [...oldSlot.eventsId, action.payload.id]
            };
            state.slots = state.slots.map((slot) =>
                slot.id === action.payload.slot_id ? editedOldSlot : slot
            );
        }
    }
});
export const { loadSlots, getEvents, editEventsId, deleteEventId, addEventId } =
    slotsSlice.actions;
export default slotsSlice.reducer;
