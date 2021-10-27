import { createSlice } from "@reduxjs/toolkit";
import slotsData from "../../data/slots.json";
/* Slots state has form:
    slots : [
        {
            id: 8,
            service_id: 2,
            name: "Après-midi",
            color: "#2B4162"
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
            state.slots = slotsData;
        }
    }
});
export const { loadSlots } = slotsSlice.actions;
export const selectSlots = (state) => state.slots.slots;
export default slotsSlice.reducer;
