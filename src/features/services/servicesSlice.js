import { createSlice } from "@reduxjs/toolkit";
import servicesData from "../../data/services.json";
import slotsData from "../../data/slots.json";

/* Services state has form: 
    services: [
        {
            id: "01",
            name: "Urgences",
            slotsId: ["01", "02"],
        }
    ]
*/
/* action.payload has form:
    {id: '123', name: 'Urgence'}
*/
export const servicesSlice = createSlice({
    name: "services",
    initialState: {
        services: []
    },
    reducers: {
        loadServices: (state) => {
            state.services = servicesData.map((service) => ({
                ...service,
                slotsId: []
            }));
        },
        getSlots: (state) => {
            const slots = slotsData;
            state.services = state.services.map((service) => ({
                ...service,
                slotsId: slots
                    .filter((slot) => slot.service_id === service.id)
                    .map((slot) => slot.id)
            }));
        }
    }
});
export const { loadServices, getSlots } = servicesSlice.actions;
export default servicesSlice.reducer;
