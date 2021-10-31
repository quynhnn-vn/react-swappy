import React from "react";
import "../styles/Table.css";
import { useSelector } from "react-redux";
import { formatDate, formatDateForHeader } from "../utils";
import Service from "./Service";
import SwitchWeek from "./SwitchWeek";

export default function Table() {
    const week = useSelector((state) => state.week.week);
    const services = useSelector((state) => state.services.services);

    const renderDate = () =>
        week.dates &&
        ["CRÉNEAUX", ...week.dates].map((date, index) => (
            <th
                key={index}
                className={
                    date === formatDate(new Date()) ? "current-date" : null
                }
            >
                {console.log(date === formatDate(new Date()))}
                {date !== "CRÉNEAUX"
                    ? formatDateForHeader(new Date(date))
                    : date}
            </th>
        ));
    const renderSlot = () => {
        week.dates &&
            ["CRÉNEAUX", ...week.dates].map((date, index) => (
                <th key={index}>
                    {date !== "CRÉNEAUX"
                        ? formatDateForHeader(new Date(date))
                        : date}
                </th>
            ));
    };
    return (
        <div className="table-container">
            <SwitchWeek />
            <table>
                <thead className="table-header">
                    <tr>{renderDate()}</tr>
                </thead>
                <tbody className="table-body">
                    <tr>{renderSlot()}</tr>
                    {services.map((service) => (
                        <tr key={service.id}>
                            <Service service={service} />
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
