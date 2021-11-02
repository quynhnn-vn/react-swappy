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
        { id: event.id, old_slot_id: event.slot_id, new_slot_id: uuid(), slot_name: "", user_id: event.user_id, date: event.date } */
        editSlotsId: (state, action) => {
            const oldServiceId = state.services.find((service) =>
                service.slotsId.includes(action.payload.old_slot_id)
            ).id;

            const oldServiceIndex = state.services.findIndex(
                (service) => service.id === oldServiceId
            );
            const editedService = {
                ...state.services[oldServiceIndex],
                slotsId: state.services[oldServiceIndex].slotsId.map((slotId) =>
                    slotId === action.payload.old_slot_id
                        ? action.payload.new_slot_id
                        : slotId
                )
            };
            state.services = state.services.map((service) =>
                service.id === oldServiceId ? editedService : service
            );
        }
    }
});
export const { loadServices, getSlots, editSlotsId } = servicesSlice.actions;
export default servicesSlice.reducer;
