import { createSlice } from "@reduxjs/toolkit";
import { addDays, subDays } from "date-fns";
import { formatDate, getCurrentWeek, getWeekIndex } from "../../utils";
/*
week: {   
        index: "44",
        dates: ["2021-10-21", "2021-10-22"]
    }
 */
export const weekSlice = createSlice({
    name: "week",
    initialState: {
        week: {}
    },
    reducers: {
        loadWeek: (state) => {
            state.week = {
                index: getWeekIndex(new Date()),
                dates: getCurrentWeek()
            };
        },
        getPrevWeek: (state) => {
            state.week = {
                index: state.week.index - 1,
                dates: state.week.dates.map((date) =>
                    formatDate(subDays(new Date(date), 7))
                )
            };
        },
        getNextWeek: (state) => {
            state.week = {
                index: state.week.index + 1,
                dates: state.week.dates.map((date) =>
                    formatDate(addDays(new Date(date), 7))
                )
            };
        }
    }
});
export const { loadWeek, getPrevWeek, getNextWeek } = weekSlice.actions;
export default weekSlice.reducer;
