import React, { useState } from "react";
import { Link } from "react-router-dom";

import Fundo from "../../components/fundo"; 
import iconeUsuario from "../../img/sem-preenchimento/user.png";
import iconeTurma from "../../img/sem-preenchimento/cad-turma.png";
import iconeCurso from "../../img/sem-preenchimento/curso.png";
import iconeAluno from "../../img/sem-preenchimento/graduated.png";
import iconeProfessor from "../../img/sem-preenchimento/prof.png";
import iconeTurmas from "../../img/sem-preenchimento/turmas.png";

function Home() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const botoes = [
    { label: "Cadastrar Usuário", icon: iconeUsuario, href: "/cadastro-usuarios" },
    { label: "Cadastrar Turma", icon: iconeTurma, href: "/cadastro-turma" },
    { label: "Cadastrar Curso", icon: iconeCurso, href: "/cadastro-curso" },
    { label: "Alunos", icon: iconeAluno },
    { label: "Professores", icon: iconeProfessor },
    { label: "Turmas", icon: iconeTurmas },
  ];

  return (
    <Fundo>
      <div style={styles.menuCentral}>
        <div style={styles.grid}>
        {botoes.map((botao, idx) => {
          const CardWrapper = botao.href ? Link : "div";

          return (
            <CardWrapper
              to={botao.href}
              key={idx}
              style={{
                ...styles.card,
                boxShadow:
                  hoveredIdx === idx
                    ? "0 8px 24px rgba(9, 40, 81, 0.18)"
                    : styles.card.boxShadow,
                transform: hoveredIdx === idx ? "scale(1.04)" : "scale(1)",
                transition: "box-shadow 0.1s, transform 0.1s",
                textDecoration: "none",
                color: "inherit",
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
            </CardWrapper>
          );
        })}
        </div>
      </div>
    </Fundo>
  );
}

export default Home;

const styles = {
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
