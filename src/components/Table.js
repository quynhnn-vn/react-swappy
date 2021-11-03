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
        ["CRÉNEAUX", ...week.dates].map((date, index) =>
            date !== "CRÉNEAUX" ? (
                <th colSpan="3" key={index}>
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
                </th>
            ) : (
                <th colSpan="1" key={index}>
                    <span>{date}</span>
                </th>
            )
        );

    const renderSlot = () =>
        week.dates &&
        ["", Array(7).fill(["Matin", "AM", "Soir"])]
            .flat(2)
            .map((name, index) =>
                index !== 0 ? (
                    <th key={index} id={index}>
                        {name}
                    </th>
                ) : (
                    <th key={index}></th>
                )
            );

    return (
        <div className="table-container">
            <SwitchWeek />
            <table>
                <thead className="table-header">
                    <tr>{renderDate()}</tr>
                    <tr>{renderSlot()}</tr>
                </thead>
                <tbody className="table-body">
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
