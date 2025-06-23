import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import professorService from "../../services/professorService";
import Fundo from "../../components/fundo-nav";

import alunosIcon from "../../img/sem-preenchimento/graduated.png";
import registrarIcon from "../../img/sem-preenchimento/contract.png";
import listaIcon from "../../img/sem-preenchimento/clipboard.png";
import avaliacaoIcon from "../../img/sem-preenchimento/checkmark.png";
import notasIcon from "../../img/sem-preenchimento/upload.png";
import { FaArrowLeft } from "react-icons/fa";

function Disciplinas() {
  const navigate = useNavigate();
  const [disciplinas, setDisciplinas] = useState([]);
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(null);
  const token = localStorage.getItem("token");
  const idProfessor = localStorage.getItem("id_professor");

  useEffect(() => {
    professorService
      .buscarDisciplinaProfessor(idProfessor, token)
      .then(setDisciplinas)
      .catch(() => setDisciplinas([]));
  }, [idProfessor, token]);

  const handleDisciplinaClick = (disciplina) => {
    if (disciplinaSelecionada?.idDisciplina === disciplina.idDisciplina) {
      setDisciplinaSelecionada(null);
    } else {
      setDisciplinaSelecionada(disciplina);
    }
  };

  const handleAcaoClick = (acao) => {
    if (!disciplinaSelecionada) return;

    const idTurma = disciplinaSelecionada.idTurma;
    const idDisciplina = disciplinaSelecionada.idDisciplina;
    let path = '';

    switch (acao) {
      case 'Alunos':
        path = `/alunos/disciplina/${idDisciplina}`;
        break;
      case 'Registrar Presença':
        path = `/frequencia/turma/${idTurma}/disciplina/${idDisciplina}`;
        break;
      case 'Lista de Presença':
        path = `/professor/turmas/${idTurma}/disciplinas/${idDisciplina}/lista-presenca`;
        break;
      case 'Inserir Avaliação':
        path = `/professor/turmas/${idTurma}/disciplinas/${idDisciplina}/inserir-avaliacao`;
        break;
      case 'Lançar Notas':
        path = `/professor/turmas/${idTurma}/disciplinas/${idDisciplina}/lancar-notas`;
        break;
      default:
        return;
    }

    navigate(path);
  };

  return (
    <Fundo>
      <div style={styles.container}>
        <div style={styles.layoutRow}>
          <div style={styles.voltarWrapper}>
            <button style={styles.botaoVoltar} onClick={() => navigate("/home-professor")}>
              <FaArrowLeft size={14} />
            </button>
          </div>

          <div style={styles.contentWrapper}>
            <h2 style={styles.titulo}>Minhas Disciplinas</h2>
            <span style={styles.subtitulo}>Selecione uma para ver ações</span>

            <div style={styles.disciplinasContainer}>
              {disciplinas.map((disciplina, index) => {
                const isSelected = disciplinaSelecionada?.idDisciplina === disciplina.idDisciplina;
                const backgroundColor = isSelected
                  ? coresDisciplinas[index % coresDisciplinas.length]
                  : corDisciplinaNaoSelecionada;

                return (
                  <button
                    key={disciplina.idDisciplina}
                    onClick={() => handleDisciplinaClick(disciplina)}
                    style={{
                      ...styles.cardDisciplina,
                      background: backgroundColor,
                      color: isSelected ? "#FFF" : "#404040",
                    }}
                  >
                    {disciplina.nome}
                  </button>
                );
              })}
            </div>

            <h3 style={styles.acoesTitulo}>Ações</h3>
            <div style={styles.acoesContainer}>
              {disciplinaSelecionada ? (
                <>
                  <CardAcao texto="Alunos" icone={alunosIcon} onClick={() => handleAcaoClick("Alunos")} />
                  <CardAcao texto="Registrar Presença" icone={registrarIcon} onClick={() => handleAcaoClick("Registrar Presença")} />
                  <CardAcao texto="Lista de Presença" icone={listaIcon} onClick={() => handleAcaoClick("Lista de Presença")} />
                  <CardAcao texto="Inserir Avaliação" icone={avaliacaoIcon} onClick={() => handleAcaoClick("Inserir Avaliação")} />
                  <CardAcao texto="Lançar Notas" icone={notasIcon} onClick={() => handleAcaoClick("Lançar Notas")} />
                </>
              ) : (
                <span style={{ color: "#aaa", marginTop: 40 }}>
                  Selecione uma disciplina para exibir as ações.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fundo>
  );
}

function CardAcao({ texto, icone, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  const dynamicCardStyle = {
    ...cardAcaoStyles.card,
    transform: isHovered ? "scale(1.03)" : "scale(1)",
    boxShadow: isHovered ? "0 4px 12px #0003" : "0 2px 8px #0002",
  };

  return (
    <div
      style={dynamicCardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <img src={icone} alt={texto} style={cardAcaoStyles.icon} />
      <span style={cardAcaoStyles.label}>{texto}</span>
    </div>
  );
}

const coresDisciplinas = ["#4B9EFF", "#36B76C", "#F4B43E", "#A186E8", "#28C3B4"];
const corDisciplinaNaoSelecionada = "#E5EAEA";

const styles = {
  container: {
    padding: "36px 50px",
  },
  layoutRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: "20px",
  },
  voltarWrapper: {
    paddingTop: "6px", 
  },
  contentWrapper: {
    flex: 1,
  },
  botaoVoltar: {
    backgroundColor: "#27AE60",
    color: "#fff",
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background 0.2s",
  },
  titulo: {
    fontSize: "2rem",
    color: "#12224A",
    fontWeight: 700,
    marginBottom: 0,
    marginTop: 0,
    marginLeft: "30px",
  },
  subtitulo: {
    color: "#466190",
    fontSize: "1rem",
    marginBottom: "7px",
    marginTop: "8px",
    display: "inline-block",
    marginLeft: "30px",

  },
  disciplinasContainer: {
    display: "flex",
    gap: "28px",
    margin: "32px 0 44px 0",
    flexWrap: "wrap",
    marginLeft: "30px",

  },
  cardDisciplina: {
    width: 170,
    height: 90,
    borderRadius: 12,
    fontSize: "1.25rem",
    boxShadow: "0 2px 8px #0001",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s, color 0.2s",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
    textAlign: "center",
    padding: "8px",
    marginLeft: "30px",

  },
  acoesTitulo: {
    fontSize: "1.5rem",
    color: "#12224A",
    fontWeight: 700,
    margin: "40px 0 16px 0",
    marginLeft: "30px",

  },
  acoesContainer: {
    display: "flex",
    gap: "24px",
    flexWrap: "wrap",
    marginLeft: "30px",
  },
};

const cardAcaoStyles = {
  card: {
    background: "rgba(1, 99, 77, 0.15)",
    borderRadius: "16px",
    width: "210px",
    height: "210px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    border: "none",
    transition: "box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out",
  },
  icon: {
    width: "115px",
    height: "115px",
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

export default Disciplinas;