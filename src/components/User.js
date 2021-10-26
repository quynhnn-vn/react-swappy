import React from "react";
import { getUser } from "../utils";

export default function User({ user }) {
    return <button>{getUser(user)}</button>;
}
