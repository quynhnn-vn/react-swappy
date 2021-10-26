import { getWeek, reStructure } from "./utils";
import React, { useState } from "react";
import services from "./data/services.json";
import "./App.css";
import Week from "./components/Week";
import Row from "./components/Row";

function App() {
    const [currentWeek, setCurrentWeek] = useState(getWeek());
    const renderHeader = () => {
        return ["SERVICES", ...currentWeek].map((day, index) => (
            <th key={index}>{day}</th>
        ));
    };
    const renderTable = (service) => {
        return (
            <Row
                key={service.id}
                currentWeek={currentWeek}
                service={reStructure(service)}
            />
        );
    };
    return (
        <div className="App">
            <table border="1">
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {services.map((service) => (
                        <tr>{renderTable(service)}</tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
