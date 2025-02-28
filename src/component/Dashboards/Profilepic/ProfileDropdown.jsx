import React, { useState, useEffect } from "react";
import "./ProfileDropdown.css";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Handle screen resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="profile-container">
            <div className="profile-header" onClick={() => setIsOpen(!isOpen)}>
                <img src="../Images/nadir.png" alt="Profile" className="profile-picture" />
                {!isMobile && (
                    <>
                        <ChevronDown size={18} color="#0b0051" />
                    </>
                )}
            </div>
            {isOpen && (
                <div className="dropdown-menu">
                    <Link to="/patient-dashboard" className="dropdown-item">Dashboard</Link>
                    <button className="dropdown-item logout">Déconnexion</button>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
