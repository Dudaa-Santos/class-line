import React from "react";
import Logo from "../img/logo/logo-branca-sFundo.png";

function Home() {
  return (
    <div style={styles.homeContainer}>
      <nav style={styles.navbar}>
        <img src={Logo} alt="Logo" style={styles.logo} />
        <svg style={styles.userIcon} viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 8-4 8-4s8 0 8 4v1H4v-1z" />
        </svg>
      </nav>
      {/* Conteúdo da Home pode ir aqui */}
    </div>
  );
}

export default Home;

const styles = {
  navbar: {
    width: '100vw',
    height: '100px',
    background: '#092851',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    boxSizing: 'border-box',
  },
  logo: {
    height: '80px',
    width: 'auto',
    marginLeft: '30px',
  },
  userIcon: {
    width: '45px',
    height: '45px',
    fill: '#fff',
    cursor: 'pointer',
  },
  homeContainer: {
    minHeight: '100vh',
    background: '#f5f5f7',
  }
};
