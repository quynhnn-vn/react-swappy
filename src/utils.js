import { addDays, format, startOfWeek, getWeek } from "date-fns";
import { fr } from "date-fns/locale";
import slots from "./data/slots.json";
import events from "./data/events.json";
import users from "./data/users.json";

export const formatDate = (date) => {
    return format(new Date(date), "yyyy-MM-dd");
};
export const formatDateForHeader = (date) => {
    return format(new Date(date), "eeedd", { locale: fr }).toUpperCase();
};
export const getWeekOfYear = (date) => {
    const weekOfYear = getWeek(new Date(date));
    const monthOfYear = format(new Date(date), "LLL", {
        locale: fr
    }).toUpperCase();
    return monthOfYear + "-semaine " + weekOfYear;
};
export const getCurrentWeek = () => {
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
    return {
        id: service.id,
        name: service.name,
        slotsForService: slotsForService,
        eventsForSlots: eventsForSlots.flat()
    };
};
export const getUser = (userId) => {
    const foundUser = users.find((user) => user.id === userId);
    return foundUser.last_name[0] + foundUser.first_name[0];
};
export const getColor = (slotId) => {
    return slots.find((slot) => slot.id === slotId).color;
};
