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
        },
        /* action.payload has form:
        {
            id: event.id,
            old_slot_id: event.slot_id,
            new_slot_id: event.slot_id,
            slot_name: "Matin",
            user_id: event.user_id,
            date: event.date,
            service_id: oldServiceId
        } 
        */
        editSlotsId: (state, action) => {
            const index = state.services.findIndex(
                (service) => service.id === action.payload.service_id
            );

            const editedService = {
                ...state.services[index],
                slotsId: [
                    ...new Set([
                        ...state.services[index].slotsId,
                        action.payload.new_slot_id
                    ])
                ]
            };

            state.services = state.services.map((service) =>
                service.id === action.payload.service_id
                    ? editedService
                    : service
            );
        }
    }
});
export const { loadServices, getSlots, editSlotsId } = servicesSlice.actions;
export default servicesSlice.reducer;
