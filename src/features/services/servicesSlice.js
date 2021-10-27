import { createSlice } from "@reduxjs/toolkit";
import servicesData from "../../data/services.json";

/* Services state has form: 
    services: [
        {
            id: "01",
            name: "Urgences",
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
            state.services = servicesData;
        },
        addService: (state, action) => {
            const newState = { ...action.payload };
            state.services = [...state.services, newState];
        }
    }
});
export const { loadServices, addService } = servicesSlice.actions;
export const selectServices = (state) => state.services.services;
export default servicesSlice.reducer;
