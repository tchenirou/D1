import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError(!email.trim());
    setPasswordError(!password.trim());

    if (email && password) {
      console.log("Login attempt", { email, password });
    }
  };

  const handleInputChange = (setter, setError) => (e) => {
    setter(e.target.value);
    setError(false); // Remove error when user starts typing
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Connectez-vous</h1>
        <p className="login-subtitle">Renseignez votre email et mot de passe</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={handleInputChange(setEmail, setEmailError)}
              onFocus={() => setEmailError(false)} // Remove error when input is focused
              placeholder="Email"
              className={emailError ? "error" : ""}
            />
            {emailError && <div className="error-message">Champ obligatoire</div>}
          </div>

          <div className="form-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handleInputChange(setPassword, setPasswordError)}
              onFocus={() => setPasswordError(false)}
              placeholder="Mot de passe"
              className={passwordError ? "error" : ""}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {passwordError && <div className="error-message">Champ obligatoire</div>}
          </div>

          <Link to="/forgot-password" className="forgot-password">
            Mot de passe oublié
          </Link>

          <button type="submit" className="Connecter-button">
            Se connecter
          </button>
        </form>

        <div className="signup-section">
          <div className="signup-content">
            <p>Pas encore de compte ?</p>
            <Link to="/signup" className="create-account">
              Créer un compte
            </Link>
          </div>
          <img
            src="/Images/loginGuy.png"
            alt="New user illustration"
            className="signup-illustration"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
