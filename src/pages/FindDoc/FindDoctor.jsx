"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Calendar, Star, Clock, Filter, X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles
import { format } from "date-fns";
import "./FindDoctor.css";

const specialties = [
  "Médecine générale", "Pédiatrie", "Cardiologie", "Dermatologie", "Gynécologie",
  "Ophtalmologie", "Orthopédie", "Psychiatrie", "Neurologie", "Endocrinologie"
];

const mockDoctors = [
  { id: 1, name: "Dr. Sarah Benali", specialty: "Médecine générale", rating: 4.8, reviews: 124, nextAvailable: "Aujourd'hui", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aHGX7MjBhr26kxLEnweg7Qf6egNxkI.png" },
  { id: 2, name: "Dr. Ahmed Kader", specialty: "Cardiologie", rating: 4.9, reviews: 98, nextAvailable: "Demain", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aHGX7MjBhr26kxLEnweg7Qf6egNxkI.png" },
  { id: 3, name: "Dr. Leila Mansouri", specialty: "Pédiatrie", rating: 4.7, reviews: 156, nextAvailable: "Dans 2 jours", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aHGX7MjBhr26kxLEnweg7Qf6egNxkI.png" }
];

function FindDoctor() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [doctors, setDoctors] = useState(mockDoctors);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [mapView, setMapView] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()); // 🆕 State for DatePicker

  useEffect(() => {
    const filteredDoctors = mockDoctors.filter(doctor =>
      (searchTerm === "" || doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedSpecialty === "" || doctor.specialty === selectedSpecialty) &&
      (selectedAvailability === "" || doctor.nextAvailable.toLowerCase().includes(selectedAvailability.toLowerCase()))
    );
    setDoctors(filteredDoctors);
  }, [searchTerm, selectedSpecialty, selectedAvailability]);

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowAppointmentModal(true);
  };

  return (
    <div className="find-doctor-page">
      <div className="search-section">
        <h1>Trouvez le médecin idéal</h1>
        <form className="search-form">
          <div className="search-input">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Rechercher par nom ou spécialité"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button type="button" className="filter-button" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="filter-icon" />
            Filtres
          </button>
        </form>

        {showFilters && (
          <div className="filters">
            <select value={selectedSpecialty} onChange={(e) => setSelectedSpecialty(e.target.value)} className="filter-select">
              <option value="">Toutes les spécialités</option>
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
            <select value={selectedAvailability} onChange={(e) => setSelectedAvailability(e.target.value)} className="filter-select">
              <option value="">Toutes les disponibilités</option>
              <option value="Aujourd'hui">Aujourd'hui</option>
              <option value="Demain">Demain</option>
              <option value="Cette semaine">Cette semaine</option>
            </select>
            <button className="view-toggle" onClick={() => setMapView(!mapView)}>
              {mapView ? "Vue liste" : "Vue carte"}
            </button>
          </div>
        )}
      </div>

      <div className="results-section">
        <h2>Médecins disponibles ({doctors.length})</h2>
        {mapView ? (
          <div className="map-view">
            <p>Carte des médecins (à implémenter)</p>
          </div>
        ) : (
          <div className="doctors-list">
            {doctors.map(doctor => (
              <div key={doctor.id} className="doctor-card">
                <img src={doctor.image || "/placeholder.svg"} alt={doctor.name} className="doctor-image" />
                <div className="doctor-info">
                  <h3>{doctor.name}</h3>
                  <p>{doctor.specialty}</p>
                  <div className="doctor-rating">
                    <Star className="star-icon" />
                    <span>{doctor.rating}</span>
                    <span className="reviews-count">({doctor.reviews} avis)</span>
                  </div>
                  <div className="doctor-availability">
                    <Clock className="clock-icon" />
                    <span>Prochain RDV: {doctor.nextAvailable}</span>
                  </div>
                </div>
                <button className="book-button" onClick={() => handleBookAppointment(doctor)}>
                  Prendre RDV
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showAppointmentModal && selectedDoctor && (
        <div className="modal-overlay">
          <div className="appointment-modal">
            <button className="close-modal" onClick={() => setShowAppointmentModal(false)}>
              <X />
            </button>
            <h2>Prendre rendez-vous avec {selectedDoctor.name}</h2>
            <p>{selectedDoctor.specialty}</p>

            {/* 🆕 Date Picker Component */}
            <div className="appointment-calendar">
              <label>Sélectionner une date :</label>
              
              <DatePicker
  selected={selectedDate}
  onChange={(date) => setSelectedDate(date)}
  minDate={new Date()}
  dateFormat="dd/MM/yyyy"
  className="datepicker-input"
  popperPlacement="bottom-start"
  popperModifiers={[
    {
      name: "preventOverflow",
      options: {
        boundary: "viewport",
      },
    },
  ]}
  calendarClassName="custom-datepicker" // Apply new styles
/>




            </div>

            <button className="confirm-appointment">
              Confirmer le rendez-vous ({format(selectedDate, "dd/MM/yyyy")})
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FindDoctor;
