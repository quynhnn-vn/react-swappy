import { createSlice } from "@reduxjs/toolkit";
import servicesData from "../../data/services.json";

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
        addService: (state, action) => {
            const newState = { ...action.payload, slotsId: [] };
            state.services = [...state.services, newState];
        },
        //action.payload has form : ["id1", "id2"]
        getSlots: (state, action) => {
            const slots = action.payload;
            state.services = state.services.map((service) => ({
                ...service,
                slotsId: slots
                    .filter((slot) => slot.service_id === service.id)
                    .map((slot) => slot.id)
            }));
        }
    }
});
export const { loadServices, addService, getSlots } = servicesSlice.actions;
export default servicesSlice.reducer;
