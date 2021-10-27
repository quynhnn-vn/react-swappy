import React from "react";
import { useSelector } from "react-redux";
import { selectServices } from "./servicesSlice";

export default function Services() {
    const services = useSelector(selectServices);
    return (
        <div>
            {services.map((service) => (
                <p key={service.id}>{service.name}</p>
            ))}
        </div>
    );
}
