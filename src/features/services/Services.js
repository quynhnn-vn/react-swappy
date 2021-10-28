import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSlots } from "../slots/slotsSlice";
import { getSlots, selectServices } from "./servicesSlice";

export default function Services() {
    const dispatch = useDispatch();
    const services = useSelector(selectServices);
    const slots = useSelector(selectSlots);

    useEffect(() => {
        dispatch(getSlots(slots));
    }, [dispatch, slots]);
    return (
        <div>
            {services.map((service) => (
                <div>
                    <span key={service.id}>{service.name}</span>
                    {service.slotsId.map((slotId) => (
                        <span key={slotId}>{slotId + "--"}</span>
                    ))}
                </div>
            ))}
        </div>
    );
}
