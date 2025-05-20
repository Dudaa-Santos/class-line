import React from "react";
import Logo from "../../img/logo/logo-branca-sFundo.png";
import UserIcon from "../../img/sem-preenchimento/user.png";

function Home() {
  return (
    <div style={styles.homeContainer}>
      <nav style={styles.navbar}>
        <img src={Logo} alt="Logo" style={styles.logo} />
        <img src={UserIcon} alt="UserIcon" style={styles.userIcon} />
      </nav>
      {/* Conteúdo da Home pode ir aqui */}
    </div>
  );
}

export default Home;

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
  userIcon: {
    width: '36px',
    height: '36px',
    cursor: 'pointer',
  },
  homeContainer: {
    minHeight: '100vh',
    background: '#f5f5f7',
  }
};
