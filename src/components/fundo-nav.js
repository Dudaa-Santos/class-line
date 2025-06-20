import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Oval } from 'react-loader-spinner';
import Logo from "../img/logo/logo-branca-sFundo.png";
import UserIcon from "../img/sem-preenchimento/userIcon.png";
import LogoutIcon from "../img/sem-preenchimento/logout.png";

function Fundo({ children }) {
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Ajuste conforme necessário
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  function handleLogout() {
    localStorage.clear();
    navigate("/login-professor");
  }

  return (
    <div style={styles.Container}>
      <nav style={styles.navbar}>
        <img src={Logo} alt="Logo" style={styles.logo} />
        <div style={{ position: "relative" }}>
          <img
            src={UserIcon}
            alt="UserIcon"
            style={styles.UserIcon}
            onClick={() => setShowMenu(!showMenu)}
          />
          {showMenu && (
            <div ref={menuRef} style={styles.overlay}>
              <button style={styles.logoutBtn} onClick={handleLogout}>
                <img src={LogoutIcon} alt="Logout" style={styles.logoutIcon} />
                Sair
              </button>
            </div>
          )}
        </div>
      </nav>

      {loading ? (
        <div style={styles.loadingContainer}>
          <Oval
            height={80}
            width={80}
            color="#092851"
            secondaryColor="#ccc"
            strokeWidth={4}
            strokeWidthSecondary={4}
            visible={true}
            ariaLabel="oval-loading"
          />
        </div>
      ) : (
        children
      )}
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
  overlay: {
    position: 'absolute',
    right: 0,
    top: '40px',
    background: '#fff',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
    minWidth: '110px',
    padding: '10px 10px',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 0',
    background: 'none',
    border: 'none',
    color: '#c00',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1rem',
    width: '100%',
    textAlign: 'left'
  },
  logoutIcon: {
    width: '20px',
    height: '20px',
    marginRight: '6px'
  },
  loadingContainer: {
    minHeight: 'calc(100vh - 80px)', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
