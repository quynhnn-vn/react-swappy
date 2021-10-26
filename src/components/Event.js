import React from "react";
import { getUser } from "../utils";

export default function Event({ event }) {
    return <button>{getUser(event.user_id)}</button>;
}
