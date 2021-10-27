import React from "react";
import { useSelector } from "react-redux";
import { selectUsers } from "./usersSlice";

export default function Users() {
    const users = useSelector(selectUsers);
    return (
        <div>
            {users.map((user) => (
                <p key={user.id}>{user.last_name}</p>
            ))}
        </div>
    );
}
