import { addDays, format, startOfWeek } from "date-fns";
import slots from "./data/slots.json";
import events from "./data/events.json";
import users from "./data/users.json";

export const formatDate = (date) => {
    return format(date, "yyyy-MM-dd");
};
export const getWeek = () => {
    const currentDate = new Date();
    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
    let weekDate = [],
        formattedWeekDate = [];
    for (let i = 0; i <= 6; i++) {
        weekDate.push(addDays(startDate, i));
        formattedWeekDate.push(formatDate(weekDate[i]));
    }
    return formattedWeekDate;
};
export const reStructure = (service) => {
    const slotsForService = slots.filter(
        (slot) => slot.service_id === service.id
    );
    const eventsForSlots = slotsForService.map((slot) =>
        events.filter((event) => event.slot_id === slot.id)
    );
    const currentService = {
        id: service.id,
        name: service.name,
        slotsForService: slotsForService.map(
            ({ service_id, ...otherAttrs }) => otherAttrs
        ),
        eventsForSlots: eventsForSlots
            .map((eventForSlot) =>
                eventForSlot.map(({ slot_id, ...otherAttrs }) => otherAttrs)
            )
            .flat()
    };
    return currentService;
};
export const getUser = (userId) => {
    const foundUser = users.find((user) => user.id === userId);
    return foundUser.last_name[0] + foundUser.first_name[0];
};
