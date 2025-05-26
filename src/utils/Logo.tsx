// Logo.jsx

import logoImage from "../assets/images/logo.png"

const Logo = ({ className = "", size = 150 }) => {
  return (
    <div className={`logo-container ${className}`}>
      <img
        src={logoImage}
        alt="Cyclify Logo"
        className="logo"
        style={{ width: `${size}px`, height: "auto" }}
      />
    </div>
  );
};

export default Logo;
