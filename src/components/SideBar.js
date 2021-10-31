import React from "react";
import "../styles/SideBar.css";

export default function SideBar() {
    return (
        <ul className="sidebar-container">
            <li>
                <button>Gestion des sites</button>
            </li>
            <li>
                <button>Gestion des astreintes</button>
            </li>
            <li>
                <button>Gestion du planning</button>
            </li>
        </ul>
    );
}
