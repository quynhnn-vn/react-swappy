import React from "react";
import { useSelector } from "react-redux";
import { formatDateForHeader } from "../utils";
import Service from "./Service";

export default function Table() {
    const week = useSelector((state) => state.week.week);
    const services = useSelector((state) => state.services.services);

    const renderHeader = () =>
        week.dates &&
        ["SERVICES", ...week.dates].map((date, index) => (
            <th key={index}>
                {date !== "SERVICES"
                    ? formatDateForHeader(new Date(date))
                    : date}
            </th>
        ));
    return (
        <table border={1}>
            <thead>
                <tr>{renderHeader()}</tr>
            </thead>
            <tbody>
                {services.map((service) => (
                    <tr key={service.id}>
                        <Service service={service} />
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
