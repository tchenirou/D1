import React, { useState, useEffect } from "react";
import "./ProfileDropdown.css";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";

const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const location = useLocation(); // Get current path

    // Handle screen resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const patientRoutes = [
        "/patient-dashboard",
        "/Appointments",
        "/documents",
        "/settings",
        "/find-doctor"
      ];
      const doctorRoutes = [
        "/doctor-dashboard",
        "/doctor-appointments",
        "/doctor-settings",
        "/finances"
      ];
      const adminRoutes = [
        "/admin-dashboard",
        "/admin-doctors",
        "/admin-patients",
        "/admin-appointments",
        "/admin-messages",
        "/admin-reports",
        "/admin-billing"
      ];
  // Determine the correct dashboard link
  let dashboardLink = "/"; // Default fallback
  if (patientRoutes.some(route => location.pathname.includes(route))) {
      dashboardLink = "/patient-dashboard";
  } if (doctorRoutes.some(route => location.pathname.includes(route))) {
      dashboardLink = "/doctor-dashboard";
  } if (adminRoutes.some(route => location.pathname.includes(route))) {
      dashboardLink = "/admin-dashboard";
  }
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
                    <Link to={dashboardLink} className="dropdown-item">Dashboard</Link>
                    <button className="dropdown-item logout">Déconnexion</button>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
