import React from "react";
import { useSelector } from "react-redux";
import { selectSlots } from "./slotsSlice";

export default function Slots() {
    const slots = useSelector(selectSlots);
    return (
        <div>
            {slots.map((slot) => (
                <p key={slot.id}>{slot.name}</p>
            ))}
        </div>
    );
}
