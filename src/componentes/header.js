import React from "react";
import "./Header.css";

export default ({ black }) => {
  return (
    <header className={black ? "black" : ""}>
      <div className="header-logo">
        <a href="/">
          <img src="netflix-logo.png" alt="Netflix" />
        </a>
      </div>
      
      <div className="header-user">
        <img src="icone-usuario.png" alt="Usuário" />
      </div>
    </header>
  )
}
