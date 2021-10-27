import { createSlice } from "@reduxjs/toolkit";
import usersData from "../../data/users.json";

/*
users: [
    {
        id: 1,
        first_name: "Rookie",
        last_name: "Cruz"
    }
];
 */
export const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: []
    },
    reducers: {
        loadUsers: (state) => {
            state.users = usersData;
        },
        /* action.payload has form: 
        {id: '456', first_name: 'Guillaume', last_name: 'Herver'}
        */
        addUser: (state, action) => {
            state.users = [...state.users, action.payload];
        }
    }
});
export const { loadUsers, addUser } = usersSlice.actions;
export const selectUsers = (state) => state.users.users;
export default usersSlice.reducer;
