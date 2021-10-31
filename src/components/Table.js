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
            <th key={index}>
                {date !== "CRÉNEAUX" ? (
                    <div className="date-header">
                        <span>
                            {formatDateForHeader(new Date(date)).substr(0, 4)}
                        </span>
                        <span
                            className={
                                date === formatDate(new Date())
                                    ? "current-date-span"
                                    : null
                            }
                        >
                            {formatDateForHeader(new Date(date)).substr(-2)}
                        </span>
                    </div>
                ) : (
                    <span>{date}</span>
                )}
            </th>
        ));
    const renderSlot = () => {
        week.dates &&
            ["CRÉNEAUX", ...week.dates].map((date, index) => (
                <td key={index}>
                    {date !== "CRÉNEAUX"
                        ? formatDateForHeader(new Date(date))
                        : date}
                </td>
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
