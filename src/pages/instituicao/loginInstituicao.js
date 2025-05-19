import React, { useState } from 'react';
import logo from '../../img/logo/logo2.png'; 
import ilustracao from '../../img/IMG_LOGIN.png'; 
import { Link } from "react-router-dom";

export default function LoginInstituicao() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login:', login, 'Senha:', senha);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.left}>
          <img src={ilustracao} alt="Ilustração" style={styles.leftImg} />
        </div>
        <div style={styles.right}>
        <img src={logo} alt="Logo ClassLine" style={styles.logo} />

        <div style={styles.contentBox}>

            <h2 style={styles.headingInst}>Login de Instituição</h2>
            <h2 style={styles.heading}>Bem-vindo(a) ao ClassLine!</h2>

            <form onSubmit={handleLogin} style={styles.form}>
            <input
                type="text"
                placeholder="Login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                style={styles.input}
            />
            <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                style={styles.input}
            />
            <button type="submit" style={styles.button}>Acessar</button>
            </form>
        </div>

        <p style={styles.linkProfessor}>
          Clique aqui para fazer login como{" "}
          <Link to="/login-professor" style={styles.linkSpan}>
            Professor
          </Link>
          .
        </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
    page: {
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #01634D 0%, #016161 22%, #005E76 64%, #002B65 89%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "'Lexend', sans-serif",
    },

    container: {
        width: '87%',
        height: '79%',
        maxWidth: '1112px',
        maxHeight: '660px',
        backgroundColor: '#fff',
        borderRadius: '20px',
        display: 'flex',
        boxShadow: '0 0 30px rgba(0, 0, 0, 0.15)',
        overflow: 'hidden',
    },
    left: {
      flex: 1,
      backgroundColor: 'rgba(1, 99, 77, 0.15)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    leftImg: {
      width: '80%',
      maxWidth: '400px',
    },
    right: {
      flex: 1,
      padding: '60px 40px 40px 40px',     
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: '20px',
    },
    logo: {
      width: '300px',
      marginBottom: '10px',
    },
    heading: {
      color: '#002551',
      marginBottom: '5px',
      fontSize: '20px',
      fontWeight: '600',
    },
    headingInst: {
      color: '#002551',
      marginBottom: '5px',
      fontSize: '20px',
      fontWeight: '600',
      textAlign: 'center',
      width: '100%',
    },
    form: {
      width: '100%',
      maxWidth: '300px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    input: {
      padding: '10px 15px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    button: {
       backgroundColor: '#34a853',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px', 
        fontSize: '16px',
        cursor: 'pointer',
        width: '150px', 
        alignSelf: 'center', 
        alignItems: 'center',
    },
    linkProfessor: {
      marginTop: '10px',
      fontWeight: 'Light',
      textAlign: 'center',
      color: '#002551',
    },
    linkSpan: {
      color: '#34a853',
      fontWeight: 'Light',
      cursor: 'pointer',
    },
    contentBox: {
        width: '100%',
        maxWidth: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start', 
        gap: '10px',
    },

  };

