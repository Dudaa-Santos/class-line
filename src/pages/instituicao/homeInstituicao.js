import React, { useState } from "react";
import { Link } from "react-router-dom";

import Fundo from "../../components/fundo-nav";
import iconeUsuario from "../../img/sem-preenchimento/user.png";
import iconeTurma from "../../img/sem-preenchimento/cad-turma.png";
import iconeCurso from "../../img/sem-preenchimento/curso.png";
import iconeAluno from "../../img/sem-preenchimento/graduated.png";
import iconeProfessor from "../../img/sem-preenchimento/prof.png";
import iconeTurmas from "../../img/sem-preenchimento/turmas.png";
import iconeDisciplina from "../../img/sem-preenchimento/add-disciplina.png";
import iconeCursos from "../../img/sem-preenchimento/cursos.png";

const BotaoCard = ({ botao, onMouseEnter, onMouseLeave, isHovered }) => {
  const CardWrapper = botao.href ? Link : "div";

  const dynamicStyles = {
    boxShadow: isHovered
      ? "0 8px 24px rgba(9, 40, 81, 0.18)"
      : "0 1px 8px rgba(0,0,0,0.05)",
    transform: isHovered ? "scale(1.04)" : "scale(1)",
  };

  return (
    <CardWrapper
      to={botao.href}
      style={{
        ...styles.card,
        ...dynamicStyles,
        textDecoration: "none",
        color: "inherit"
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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
};

function Home() {
  const [hoveredKey, setHoveredKey] = useState(null);

  const botoesSuperiores = [
    { label: "Cadastrar Usuário", icon: iconeUsuario, href: "/cadastro-usuarios" },
    { label: "Cadastrar Turma", icon: iconeTurma, href: "/cadastro-turma" },
    { label: "Cadastrar Curso", icon: iconeCurso, href: "/cadastro-curso" },
    { label: "Cadastrar Disciplina", icon: iconeDisciplina, href: "/cadastro-disciplina" },
  ];

  const botoesInferiores = [
    { label: "Alunos", icon: iconeAluno, href: "/alunos" },
    { label: "Professores", icon: iconeProfessor, href: "/professores" },
    { label: "Turmas", icon: iconeTurmas, href: "/turmas" },
    { label: "CURSOS", icon: iconeCursos, href: "/cursos" },  
  ];

  return (
    <Fundo>
      <div style={styles.menuCentral}>
        <div style={styles.containerPrincipal}>
          <div style={styles.gridSuperior}>
            {botoesSuperiores.map((botao, idx) => {
              const key = `sup-${idx}`;
              return (
                <BotaoCard
                  key={key}
                  botao={botao}
                  onMouseEnter={() => setHoveredKey(key)}
                  onMouseLeave={() => setHoveredKey(null)}
                  isHovered={hoveredKey === key}
                />
              );
            })}
          </div>
          <div style={styles.gridInferior}>
            {botoesInferiores.map((botao, idx) => {
              const key = `inf-${idx}`;
              return (
                <BotaoCard
                  key={key}
                  botao={botao}
                  onMouseEnter={() => setHoveredKey(key)}
                  onMouseLeave={() => setHoveredKey(null)}
                  isHovered={hoveredKey === key}
                />
              );
            })}
          </div>
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
  containerPrincipal: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '40px',
  },
  gridSuperior: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "40px",
  },
  gridInferior: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)", 
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
    cursor: "pointer",
    border: "none",
    transition: "box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out",
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
