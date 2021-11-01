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
        }
    }
});
export const { loadSlots, getEvents } = slotsSlice.actions;
export const selectMatinEvents = (state) =>
    state.slots.slots
        .filter((slot) => slot.name === "Matin")
        .map((slot) => slot.eventsId)
        .flat(2);

export const selectAMEvents = (state) =>
    state.slots.slots
        .filter((slot) => slot.name === "Après-midi")
        .map((slot) => slot.eventsId)
        .flat(2);

export const selectSoirEvents = (state) =>
    state.slots.slots
        .filter((slot) => slot.name === "Soir")
        .map((slot) => slot.eventsId)
        .flat(2);
export default slotsSlice.reducer;
