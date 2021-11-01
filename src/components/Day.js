import React from "react";
import { useSelector } from "react-redux";
import "../styles/Day.css";
import {
    selectAMEvents,
    selectMatinEvents,
    selectSoirEvents
} from "../features/slots/slotsSlice";
import Slot from "./Slot";

export default function Day({ eventsForServiceAndDate }) {
    const [allMatinEvents, allAMEvents, allSoirEvents] = [
        useSelector(selectMatinEvents),
        useSelector(selectAMEvents),
        useSelector(selectSoirEvents)
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

    return [matinEvents, amEvents, soirEvents].map((eventsForSlot, index) => {
        return <Slot key={index} eventsForSlot={eventsForSlot} />;
    });
}
