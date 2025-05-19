import React, { useState } from "react";
import Logo from "../../img/logo/logo-branca-sFundo.png";
import UserIcon from "../../img/sem-preenchimento/userIcon.png";
import iconeUsuario from "../../img/sem-preenchimento/user.png";
import iconeTurma from "../../img/sem-preenchimento/cad-turma.png";
import iconeCurso from "../../img/sem-preenchimento/curso.png";
import iconeAluno from "../../img/sem-preenchimento/graduated.png";
import iconeProfessor from "../../img/sem-preenchimento/prof.png";
import iconeTurmas from "../../img/sem-preenchimento/turmas.png";

function Home() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const botoes = [
    { label: "Cadastrar Usuário", icon: iconeUsuario },
    { label: "Cadastrar Turma", icon: iconeTurma },
    { label: "Cadastrar Curso", icon: iconeCurso },
    { label: "Alunos", icon: iconeAluno },
    { label: "Professores", icon: iconeProfessor },
    { label: "Turmas", icon: iconeTurmas },
  ];

  return (
    <div style={styles.homeContainer}>
      <nav style={styles.navbar}>
        <img src={Logo} alt="Logo" style={styles.logo} />
        <img src={UserIcon} alt="UserIcon" style={styles.userIcon} />
      </nav>

      <div style={styles.menuCentral}>
        <div style={styles.grid}>
          {botoes.map((botao, idx) => (
            <div
              key={idx}
              style={{
                ...styles.card,
                boxShadow:
                  hoveredIdx === idx
                    ? "0 8px 24px rgba(9, 40, 81, 0.18)"
                    : styles.card.boxShadow,
                transform: hoveredIdx === idx ? "scale(1.04)" : "scale(1)",
                transition: "box-shadow 0.1s, transform 0.1s",
              }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div
                style={{
                  height: "160px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={botao.icon}
                  alt={botao.label}
                  style={
                    botao.label === "Turmas"
                      ? { ...styles.icon, width: "150px", height: "150px" }
                      : styles.icon
                  }
                />
              </div>
              <span style={styles.label}>{botao.label}</span>
            </div>
          ))}
        </div>
      </div>
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
  },
  menuCentral: {
    width: '100vw',
    minHeight: 'calc(100vh - 100px)', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "40px",
  },
  card: {
    background: "rgba(1, 99, 77, 0.15)",
    borderRadius: "16px",
    width: "230px",
    height: "230px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
    transition: "box-shadow 0.2s",
    cursor: "pointer",
    border: "none",
  },
  icon: {
    width: "132px",
    height: "132px",
    marginBottom: "20px",
    objectFit: "contain",
    userSelect: "none",
  },
  label: {
    color: "#092851",
    fontWeight: "bold",
    fontSize: "15px",
    textAlign: "center",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    fontFamily: "'Lexend', sans-serif",
  },
};
