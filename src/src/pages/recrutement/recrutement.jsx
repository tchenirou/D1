"use client"

import { useState } from "react"
import { Check, ArrowRight } from 'lucide-react'
import './recrutement.css'
import { AlertTriangle } from 'lucide-react';

function PracticienRecruit() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    postalCode: "",
    specialty: "",
    practiceType: "",
    isRegistered: false
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const specialties = [
    "Médecine générale",
    "Pédiatrie",
    "Psychiatrie",
    "Dermatologie",
    "Gynécologie",
    // Add more specialties as needed
  ]

  const practiceTypes = [
    "Libéral",
    "Salarié",
    "Mixte",
    "Remplaçant",
    // Add more practice types as needed
  ]

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = "Le nom est requis"
    if (!formData.email) newErrors.email = "L'email est requis"
    if (!formData.phone) newErrors.phone = "Le téléphone est requis"
    if (!formData.postalCode) newErrors.postalCode = "Le code postal est requis"
    if (!formData.specialty) newErrors.specialty = "La spécialité est requise"
    if (!formData.practiceType) newErrors.practiceType = "Le type de pratique est requis"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        console.log("Form submitted:", formData)
        // Handle success
      } catch (error) {
        console.error("Error submitting form:", error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }

  return (
    <div className="praticien-page">
      <div className="container">
        <div className="praticien-content">
          {/* Left Content */}
          <div className="content-left">
            <h1>
              Dwak recrute des médecins :{" "}
              <span className="highlight">rejoignez-nous !</span>
            </h1>
            
            <p className="intro">
              Créée en 2024, Dwak est aujourd'hui la solution de téléconsultation référente en Algérie.
            </p>

            <div className="recruitment-info">
              <h2>Nous recrutons des professionnels de santé :</h2>
              <p>
                vous réfléchissez à <strong>compléter</strong> votre activité présentielle avec la
                téléconsultation ?
              </p>
            </div>

            <div className="benefits">
              <h3>Un emploi de médecin chez Dwak, c'est :</h3>
              <ul>
                <li>
                  <Check className="check-icon" />
                  Une <strong>flexibilité totale</strong> chaque semaine sur le choix de vos créneaux de téléconsultation
                </li>
                <li>
                  <Check className="check-icon" />
                  Un <strong>contrat adapté</strong> à chaque statut et spécialité
                </li>
                <li>
                  <Check className="check-icon" />
                  Un <strong>complément de rémunération</strong> immédiat et significatif
                </li>
                <li>
                  <Check className="check-icon" />
                  Un <strong>accompagnement</strong> et une <strong>formation</strong> continus de l'équipe médicale
                </li>
              </ul>
            </div>

            <div className="mission">
              <p>
                La mission de Dwak est de faciliter l'accès aux soins et de permettre à tous de recevoir{" "}
                <strong>des soins de qualité</strong> dans un délai compatible avec leur état de santé.
              </p>
              <p className="tagline">
                Dwak, une équipe de médecins engagée pour une pratique moderne et utile aux patients.
              </p>
            </div>
          </div>

          {/* Right Form */}
          <div className="form-container">
            <div className="form-content">
              <h2>Demander une démo</h2>
                 <p className="form-notice">
                     <AlertTriangle size={18} color="#DC2626" className="warning-icon" />
                        Remplissez ce formulaire uniquement si vous êtes médecin
                   </p>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nom*"
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <div className="error-message">{errors.name}</div>}
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Adresse email*"
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <div className="error-message">{errors.email}</div>}
                </div>

                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Numéro de téléphone*"
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <div className="error-message">{errors.phone}</div>}
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="Code postal*"
                    className={errors.postalCode ? 'error' : ''}
                  />
                  {errors.postalCode && <div className="error-message">{errors.postalCode}</div>}
                </div>

                <div className="form-group">
                  <select
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    className={errors.specialty ? 'error' : ''}
                  >
                    <option value="">Spécialité médicale*</option>
                    {specialties.map((specialty) => (
                      <option key={specialty} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </select>
                  {errors.specialty && <div className="error-message">{errors.specialty}</div>}
                </div>

                <div className="form-group">
                  <select
                    name="practiceType"
                    value={formData.practiceType}
                    onChange={handleChange}
                    className={errors.practiceType ? 'error' : ''}
                  >
                    <option value="">Type de pratique*</option>
                    {practiceTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.practiceType && <div className="error-message">{errors.practiceType}</div>}
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="isRegistered"
                      checked={formData.isRegistered}
                      onChange={handleChange}
                    />
                    <span>Inscrit à l'Ordre des Médecins Algériens</span>
                  </label>
                </div>

                <button type="submit" className="submit-button" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Envoi en cours..."
                  ) : (
                    <>
                      Soumettre <ArrowRight className="arrow-icon" />
                    </>
                  )}
                </button>

                <p className="form-disclaimer">
                  En cliquant sur « soumettre » le formulaire, vous consentez à ce que Dwak collecte et traite vos données à des fins de prospection commerciale.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PracticienRecruit