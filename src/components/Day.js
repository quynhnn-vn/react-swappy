import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../styles/Day.css";
import Slot from "./Slot";

export default function Day({ eventsForServiceAndDate }) {
    const [allEvents, setAllEvents] = useState([]);
    const slots = useSelector((state) => state.slots.slots);

    const getAllSpecificEvents = useCallback(
        (str) =>
            slots
                .filter((slot) => slot.name === str)
                .map((slot) => slot.eventsId)
                .flat(2),
        [slots]
    );

    useEffect(() => {
        const [allMatinEvents, allAMEvents, allSoirEvents] = [
            getAllSpecificEvents("Matin"),
            getAllSpecificEvents("Après-midi"),
            getAllSpecificEvents("Soir")
        ];
        const matinEvents = eventsForServiceAndDate.filter((event) =>
            allMatinEvents.includes(event.id)
        );
        const amEvents = eventsForServiceAndDate.filter((event) =>
            allAMEvents.includes(event.id)
        );
        const soirEvents = eventsForServiceAndDate.filter((event) =>
            allSoirEvents.includes(event.id)
        );
        setAllEvents([matinEvents, amEvents, soirEvents]);
    }, [eventsForServiceAndDate, getAllSpecificEvents]);

    return allEvents.map((eventsForSlot, index) => {
        return <Slot key={index} eventsForSlot={eventsForSlot} />;
    });
}
