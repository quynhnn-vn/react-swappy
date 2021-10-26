import React from "react";
import Day from "./Day";

export default function Week({ week }) {
    return (
        <div>
            {week.map((day, index) => (
                <Day day={day} key={index} rowIndex={index} />
            ))}
        </div>
    );
}
