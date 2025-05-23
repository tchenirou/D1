"use client"

import { Routes, Route, Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import About from "../About/About"
import Home from "../Home/Home"
import Login from "../Login/login"
import Overview from "../Overview/Overview"
import "./App.css"
import Testimonials from "../../component/Feautures/Testimonial"
import Signup from "../Signup/signup"
import Contact from "../contact/contact"
import Recrutement from "../recrutement/recrutement"
import ForgotPassword from "../ForgotPass/ForgotPassword"
import FindDoctor from "../Dashboard/PatienDashboard/FindDoc/FindDoctor"
import Appointments from "../Dashboard/PatienDashboard/PatientAppointement/PatientAppointement";
import Settings from "../Dashboard/PatienDashboard/Settings/Settings"
import PatientDashboard from "../Dashboard/PatienDashboard/Dashboard/patient-dashboard"
import DoctorDashboard from "../Dashboard/DoctorDashboard/Dashboard/Doctor-Dashboard"
import DoctorAppointments from "../Dashboard/DoctorDashboard/Appointments/Doctor-Appointments"
import DoctorSettings from "../Dashboard/DoctorDashboard/DoctorSettings/DoctorSettings"
import AdminDashboard from "../Dashboard/AdminDashboard/Dashboard/AdminDashboard"
import AdminDoctors from "../Dashboard/AdminDashboard/AdminDoctors/AdminDoctors"
import AdminSettings from "../Dashboard/AdminDashboard/AdminSettings/AdminSettings"
import AdminPatients from "../Dashboard/AdminDashboard/AdminPatients/AdminPatients"
import AdminAppointments from "../Dashboard/AdminDashboard/AdminAppointments/AdminAppointments"
function App() {
  const location = useLocation()
  const [isVisible, setIsVisible] = useState(true)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY === 0) // Show header only when at the top
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // All the Dashboard Pages 
  const dashboardRoutes = ["/patient-dashboard" ,"/find-doctor","/Appointments" ,"/settings" ,"/doctor-dashboard", 
    "/doctor-appointments", "/doctor-settings", "/admin-dashboard", "/admin-doctors", 
    "/admin-patients", "/admin-appointments", "/admin-messages", "/admin-reports",
     "/admin-billing", "/admin-settings"] ;
  // Hide header for dashboard pages
  const isDashboardPage = dashboardRoutes.includes(location.pathname);

  return (
    <div className="app">
      {/* Header */}
      {!isDashboardPage && (
      <header className={isVisible ? "visible" : "hidden"}>
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img src="/Images/logo.png" alt="WAK Logo" />
            </Link>
          </div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
              <Link to="/Overview">Service</Link>
              </li>
              <li>
              <Link to="/contact">Contact</Link>
              </li>
              <li>
              <Link to="/recrutement">Recrutement</Link>
              </li>
            </ul>
          </nav>
          <div className="auth-buttons">
          <Link to="/login" className="login-button">Se connecter</Link>
          <Link to="/signup" className="signup-button">S'inscrire</Link>
          </div>
        </div>
      </header>)}

      {/* Main Content */}
      <div
        className="main-content"
        style={{
          marginTop: isVisible ? "80px" : "0px",  // Adjust based on header visibility
          marginTop: isDashboardPage ? "0px" : "80px",
          transition: "margin-top 0.3s ease-in-out",
        }}
      >
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/recrutement" element={<Recrutement />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/find-doctor" element={<FindDoctor />} />
          <Route path="/Appointments" element={<Appointments />} />
          <Route path="/Overview" element={<Overview />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />\
          <Route path="/doctor-appointments" element={<DoctorAppointments />} />
          <Route path="/doctor-settings" element={<DoctorSettings />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-doctors" element={<AdminDoctors />} />
          <Route path="/admin-settings" element={<AdminSettings />} />
          <Route path="/admin-patients" element={<AdminPatients />} />
          <Route path="/admin-appointments" element={<AdminAppointments />} />
        </Routes>

        {/* Conditionally render sections based on the current route */}
        {location.pathname === "/" && (
          <>
            {/* Features Section */}
            <section className="features" id="features">
              <div className="container">
                <h2>Profitez de consultations médicales en ligne fluides et sans complications.</h2>
                <div className="feature-cards">
                  <div className="feature-card">
                    <img src="/Images/visibilite.png" alt="Feature 1" />
                    <h3>Avantages pour le Référencement Naturel</h3>
                    <p>🔹 Améliorez votre visibilité en ligne et attirez plus de patients naturellement.</p>
                  </div>
                  <div className="feature-card">
                    <img src="/Images/docteam.png" alt="Feature 2" />
                    <h3>Opportunités pour les Professionnels de Santé</h3>
                    <p>🔹 Rejoignez notre réseau de professionnels médicaux qualifiés et de confiance.</p>
                  </div>
                  <div className="feature-card">
                    <img src="/Images/feature3-removebg-preview.png" alt="Feature 3" />
                    <h3>Pourquoi Choisir Dwak pour Vos Besoins Médicaux ?</h3>
                    <p>🔹 Bénéficiez d’un accompagnement personnalisé assuré par des professionnels expérimentés.</p>
                  </div>
                </div>
                <button className="secondary-button">En savoir plus</button>
              </div>
            </section>

            {/* Steps Section */}
            <section className="steps">
              <div className="container">
                <h2>Votre Parcours vers des Consultations Médicales en Ligne</h2>
                <div className="step-cards">
                  <div className="step-card">
                    <div className="step-number">1</div>
                    <h3>Première consultation ? Inscrivez-vous dès maintenant</h3>
                    <p>
                      Créez votre compte en quelques minutes et commencez votre parcours de soins en toute simplicité.
                    </p>
                  </div>
                  <div className="step-card">
                    <div className="step-number">2</div>
                    <h3>Prenez rendez-vous avec un médecin dès aujourd’hui</h3>
                    <p>Choisissez parmi notre réseau de professionnels de santé qualifiés.</p>
                  </div>
                  <div className="step-card">
                    <div className="step-number">3</div>
                    <h3>Recevez des soins personnalisés</h3>
                    <p>Échangez directement avec un médecin et bénéficiez d’un accompagnement sur mesure.</p>
                  </div>
                </div>
                <div className="steps-buttons">
                  <Link to="/signup" className="primary-button">Consulter maintenant</Link>
                  <button className="secondary-button">En savoir plus</button>
                </div>
              </div>
            </section>

            {/* Future of Healthcare Section */}
            <section className="future-healthcare">
              <div className="container">
                <div className="future-content">
                  <h2>Découvrez l’Avenir des Soins de Santé</h2>
                  <div className="future-cards">
                    <div className="future-card">
                      <h3>Patients</h3>
                      <p>Accédez à des soins de qualité depuis le confort de votre domicile.</p>
                    </div>
                    <div className="future-card">
                      <h3>Médecins</h3>
                      <p>Rejoignez notre plateforme pour élargir votre patientèle et développer votre activité.</p>
                    </div>
                  </div>
                  <button className="primary-button">En savoir plus</button>
                </div>
                <div className="future-image">
                  <img src="/Images/telecomunication.jpg" alt="Future of healthcare" />
                </div>
              </div>
            </section>

            {/* Testimonial Section */}
            {location.pathname === "/" && (
              <>
                {/* Other sections */}
                <Testimonials />
              </>
            )}

            {/* Final CTA Section */}
            <section className="final-cta">
              <div className="container">
                <div className="cta-content">
                  <h2>Besoin d’aide ? Notre support est disponible 24h/24, 7j/7</h2>
                  <h4>📢 Toujours là pour vous aider ! Notre équipe est à votre disposition à tout moment.</h4>
                  <h4>📞 Assistance en continu : Contactez-nous via chat, e-mail ou téléphone.</h4>
                  <h4>🤝 Accompagnement personnalisé pour une expérience fluide et sans stress.</h4>
                  <h4>⚡ Réponse rapide garantie – Vous ne serez jamais seul !</h4>
                  <Link to="/contact" className="primary-button">Contacter le Support</Link>
                  
                </div>
                <div className="cta-image">
                  <img src="/Images/support.png" alt="support" />
                </div>
              </div>
            </section>
          </>
        )}

        {/* Footer */}
        {!isDashboardPage && (
        <footer>
          <div className="container">
            <div className="footer-columns">
              <div className="footer-column">
                <h4>Company</h4>
                <ul>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Resources</h4>
                <ul>
                  <li>
                    <a href="#newsletter">Newsletter</a>
                  </li>
                  <li>
                  <Link to="/contact">Help center</Link>
                  </li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Product</h4>
                <ul>
                  <li>
                    <Link to="/Overview">Overview</Link>
                  </li>
                  <li>
                    <a href="#features">Features</a>
                  </li>
                  <li>
                    <a href="#tutorials">Tutorials</a>
                  </li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>For Patients</h4>
                <ul>
                  <li>
                    <Link to="/find-doctor">Find Doctors</Link>
                  </li>
                  <li>
                    <a href="#conditions">Conditions</a>
                  </li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>For Doctors</h4>
                <ul>
                  <li>
                    <a href="#guidelines">Guidelines</a>
                  </li>
                  <li>
                    <a href="#faqs">FAQs</a>
                  </li>
                  <li>
                    <a href="#apply">Apply Now</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2024 Dwak. All rights reserved.</p>
              <div className="footer-links">
                <a href="#privacy">Privacy Policy</a>
                <a href="#terms">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>)}
      </div>
    </div>
  )
}

export default App

