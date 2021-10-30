import React from "react";
import "../styles/Table.css";
import { useSelector } from "react-redux";
import { formatDateForHeader } from "../utils";
import Service from "./Service";

export default function Table() {
    const week = useSelector((state) => state.week.week);
    const services = useSelector((state) => state.services.services);

    const renderHeader = () =>
        week.dates &&
        ["CRÉNEAUX", ...week.dates].map((date, index) => (
            <th key={index}>
                {date !== "CRÉNEAUX"
                    ? formatDateForHeader(new Date(date))
                    : date}
            </th>
        ));
    return (
        <div className="table-container">
            <table>
                <thead className="table-header">{renderHeader()}</thead>
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
