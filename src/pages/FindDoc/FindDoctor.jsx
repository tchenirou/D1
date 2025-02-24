"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Calendar, Star, Clock, Filter, X, ChevronDown, ChevronUp } from 'lucide-react'
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns'
import "./FindDoctor.css"
const specialties = [
  "Médecine générale", "Pédiatrie", "Cardiologie", "Dermatologie", "Gynécologie",
  "Ophtalmologie", "Orthopédie", "Psychiatrie", "Neurologie", "Endocrinologie"
]

const mockDoctors = [
  { id: 1, name: "Dr. Sarah Benali", specialty: "Gynécologie", rating: 4.8, reviews: 124, image: "/Images/Dfemme2.png" },
  { id: 2, name: "Dr. Ahmed Kader", specialty: "Cardiologie", rating: 4.9, reviews: 98, image: "/Images/Dhomme1.png" },
  { id: 3, name: "Dr. Leila Mansouri", specialty: "Pédiatrie", rating: 4.7, reviews: 156, image: "/Images/Dfemme1.jpg" },
  { id: 4, name: "Dr. Karim Zidane", specialty: "Dermatologie", rating: 4.4, reviews: 89, image: "/Images/Dhomme2.png" },
  { id: 5, name: "Dr. Amine Tazi", specialty: "Médecine générale", rating: 4.9, reviews: 201, image: "/Images/Dhomme3.png" },
  { id: 6, name: "Dr. Youssef El Amrani", specialty: "Ophtalmologie", rating: 4.8, reviews: 112, image: "/Images/Dhomme4.png" },
]

function FindDoctor() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("")
  const [selectedRating, setSelectedRating] = useState(0)
  const [doctors, setDoctors] = useState(mockDoctors)
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)

  useEffect(() => {
    const filteredDoctors = mockDoctors.filter(doctor => 
      (searchTerm === "" || doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedSpecialty === "" || doctor.specialty === selectedSpecialty) &&
      (selectedRating === 0 || doctor.rating >= selectedRating)
    )
    setDoctors(filteredDoctors)
  }, [searchTerm, selectedSpecialty, selectedRating])

  const handleSearch = (e) => {
    e.preventDefault()
    // Implement search logic here
  }

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor)
    setShowAppointmentModal(true)
  }

  const generateTimeSlots = () => {
    const slots = []
    for (let i = 9; i <= 17; i++) {
      slots.push(`${i}:00`)
      if (i !== 17) slots.push(`${i}:30`)
    }
    return slots
  }

  const renderWeekCalendar = () => {
    const startDate = startOfWeek(selectedDate, { weekStartsOn: 1 })
    const endDate = endOfWeek(selectedDate, { weekStartsOn: 1 })
    const days = eachDayOfInterval({ start: startDate, end: endDate })

    return (
      <div className="week-calendar">
        {days.map((day, index) => (
          <div key={index} className="day-column">
            <div className="day-header">{format(day, 'EEE d')}</div>
            {generateTimeSlots().map((slot, slotIndex) => (
              <button key={slotIndex} className="time-slot" onClick={() => handleSelectTimeSlot(day, slot)}>
                {slot}
              </button>
            ))}
          </div>
        ))}
      </div>
    )
  }

  const handleSelectTimeSlot = (day, time) => {
    console.log(`Selected: ${format(day, 'yyyy-MM-dd')} at ${time}`)
    // Here you would typically save the appointment or show a confirmation
    setShowAppointmentModal(false)
  }

  return (
    <div className="find-doctor-page">
      <div className="search-section">
        <h1>Trouvez le médecin idéal</h1>
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Rechercher par nom ou spécialité"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="filter-select"
          >
            <option value="">Toutes les spécialités</option>
            {specialties.map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(Number(e.target.value))}
            className="filter-select"
          >
            <option value={0}>Toutes les notes</option>
            <option value={4}>4+ étoiles</option>
            <option value={4.5}>4.5+ étoiles</option>
          </select>
          <button type="submit" className="search-button">Rechercher</button>
        </form>
      </div>

      <div className="results-section">
        <h2>Médecins disponibles ({doctors.length})</h2>
        <div className="doctors-grid">
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
              </div>
              <button className="book-button" onClick={() => handleBookAppointment(doctor)}>
                Prendre RDV
              </button>
            </div>
          ))}
        </div>
      </div>

      {showAppointmentModal && selectedDoctor && (
        <div className="modal-overlay">
          <div className="appointment-modal">
            <button className="close-modal" onClick={() => setShowAppointmentModal(false)}>
              <X />
            </button>
            <h2>Prendre rendez-vous avec {selectedDoctor.name}</h2>
            <p>{selectedDoctor.specialty}</p>
            <div className="appointment-calendar">
              {renderWeekCalendar()}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FindDoctor