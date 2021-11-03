import { addDays, format, startOfWeek, getWeek } from "date-fns";
import { fr } from "date-fns/locale";
import users from "./data/users.json";
export const basicSlots = [
    { name: "Matin", color: "#7F9CC7" },
    { name: "Après-midi", color: "#2B4162" },
    { name: "Soir", color: "#020969" }
];
export const formatDate = (date) => {
    return format(new Date(date), "yyyy-MM-dd");
};
export const formatDateForHeader = (date) => {
    return format(new Date(date), "eee.dd", { locale: fr }).toUpperCase();
};
export const getWeekOfYear = (date) => {
    const weekOfYear = getWeek(new Date(date));
    const monthOfYear = format(new Date(date), "LLL", {
        locale: fr
    }).toUpperCase();
    return monthOfYear + " - semaine " + weekOfYear;
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
export const getUser = (userId) => {
    const foundUser = users.find((user) => user.id === userId);
    return foundUser.last_name[0] + foundUser.first_name[0];
};
