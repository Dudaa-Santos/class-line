import React from "react";
import Logo from "../img/logo/logo-branca-sFundo.png";
import UserIcon from "../img/sem-preenchimento/userIcon.png"

function Fundo({ children }) {
  return (
    <div style={styles.Container}>
      <nav style={styles.navbar}>
        <img src={Logo} alt="Logo" style={styles.logo} />
        <img src={UserIcon} alt="UserIcon" style={styles.UserIcon} />
      </nav>
      {children}
    </div>
  );
}

export default Fundo;

const styles = {
navbar: {
    width: '100vw',
    height: '80px',
    background: '#092851',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 30px',
    boxSizing: 'border-box',
  },
  logo: {
    height: '70px',
    width: 'auto',
    marginLeft: '30px',
  },
  UserIcon: {
    width: '36px',
    height: '36px',
    cursor: 'pointer',
  },
  Container: {
    minHeight: '100vh',
    background: '#FCFCFC',
  },
};
