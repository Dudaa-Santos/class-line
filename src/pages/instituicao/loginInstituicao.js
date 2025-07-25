import React, { useState } from 'react';
import logo from '../../img/logo/logo2.png'; 
import ilustracao from '../../img/IMG_LOGIN.png'; 
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Oval } from 'react-loader-spinner';

import instituicaoService from '../../services/instituicaoService';

export default function LoginInstituicao() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    setIsLoading(true);
    try {
      const dados = await instituicaoService.loginInstituicao(login, senha);
      localStorage.setItem('id_instituicao', dados.id);
      if (dados.token) {
        localStorage.setItem('token', dados.token);
      }
      navigate('/home-instituicao');
    } catch (err) {
      setErro('Login ou senha inválidos.');
    } finally {
      setIsLoading(false);
    }
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
                autoComplete="username"
              />
            <div style={styles.senhaContainer}>
              <input
                type={mostrarSenha ? "text" : "password"}
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                style={styles.senhaInput}
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                style={styles.olhinhoButton}
                tabIndex={-1}
                aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
              >
                {mostrarSenha ? (
                  <FiEyeOff size={22} color="#787878" />
                ) : (
                  <FiEye size={22} color="#787878" />
                )}
              </button>
            </div>

            <button type="submit" style={styles.button} disabled={isLoading}>
              {isLoading ? (
                <Oval
                  height={20}
                  width={20}
                  color="#fff"
                  secondaryColor="#34a853"
                  strokeWidth={4}
                  strokeWidthSecondary={4}
                  ariaLabel="carregando"
                  wrapperStyle={{ display: 'inline-block', marginRight: 7, verticalAlign: 'middle' }}
                />
              ) : (
                "Acessar"
              )}
            </button>

            {erro && (
              <p style={{ color: 'red', fontSize: '14px', textAlign: 'center', marginTop: '5px' }}>{erro}</p>
            )}
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
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    opacity: 1,
    transition: 'opacity 0.2s',
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
  senhaContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '300px',
  },
  senhaInput: {
    padding: '10px 44px 10px 15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
  },
  olhinhoButton: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    display: "flex",
    alignItems: "center",
    zIndex: 2
  },
};
