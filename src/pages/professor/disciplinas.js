import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import professorService from "../../services/professorService";

import alunosIcon from "../../img/sem-preenchimento/graduated.png";
import registrarIcon from "../../img/sem-preenchimento/contract.png";
import listaIcon from "../../img/sem-preenchimento/clipboard.png";
import avaliacaoIcon from "../../img/sem-preenchimento/checkmark.png";
import notasIcon from "../../img/sem-preenchimento/upload.png";

const corDisciplinaSelecionada = "#B9B9B9";
const corDisciplinaNaoSelecionada = "#E5EAEA";
const corAcoes = "rgba(1,99,77,0.15)";

function TurmaDetalhe() {
  const { id } = useParams();
  const [turma, setTurma] = useState(null);
  const [disciplinas, setDisciplinas] = useState([]);
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(null);

  useEffect(() => {
    // Busque os detalhes da turma (nome etc) se precisar
    professorService.buscarTurmaPorId(id).then(setTurma);

    // Buscar as disciplinas desse professor na turma usando sua função:
    professorService.buscarDisciplinaTurma(id)
      .then(setDisciplinas)
      .catch(() => setDisciplinas([]));
  }, [id]);

  if (!turma) return <div>Carregando...</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.titulo}>Turma {turma.nome}</h2>
      <span style={styles.subtitulo}>Disciplinas</span>
      <div style={{ display: "flex", gap: "28px", margin: "32px 0 44px 0" }}>
        {disciplinas.map((disciplina) => (
          <button
            key={disciplina.id}
            onClick={() => setDisciplinaSelecionada(disciplina)}
            style={{
              ...styles.cardDisciplina,
              background:
                disciplinaSelecionada && disciplinaSelecionada.id === disciplina.id
                  ? corDisciplinaSelecionada
                  : corDisciplinaNaoSelecionada,
            }}
          >
            {disciplina.nome}
          </button>
        ))}
      </div>

      <h3 style={styles.acoesTitulo}>Ações</h3>
      <div style={{ display: "flex", gap: "24px" }}>
        {disciplinaSelecionada ? (
          <>
            <CardAcao texto="Alunos" icone={alunosIcon} cor={corAcoes} />
            <CardAcao texto="Registrar Presença" icone={registrarIcon} cor={corAcoes} />
            <CardAcao texto="Lista de Presença" icone={listaIcon} cor={corAcoes} />
            <CardAcao texto="Inserir Avaliação" icone={avaliacaoIcon} cor={corAcoes} />
            <CardAcao texto="Lançar Notas" icone={notasIcon} cor={corAcoes} />
          </>
        ) : (
          <span style={{ color: "#aaa", marginTop: 40 }}>Selecione uma disciplina para exibir as ações.</span>
        )}
      </div>
    </div>
  );
}

function CardAcao({ texto, icone, cor }) {
  return (
    <div
      style={{
        background: cor,
        borderRadius: 10,
        width: 140,
        height: 140,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 8px #0002",
        cursor: "pointer",
      }}
    >
      <img src={icone} alt={texto} style={{ width: 54, marginBottom: 8 }} />
      <span
        style={{
          fontWeight: "bold",
          color: "#174C5A",
          fontSize: "1rem",
          marginTop: 8,
          letterSpacing: 0.2,
        }}
      >
        {texto}
      </span>
    </div>
  );
}

const styles = {
  container: {
    padding: "36px 50px",
  },
  titulo: {
    fontSize: "2rem",
    color: "#12224A",
    fontWeight: 700,
    marginBottom: 0,
  },
  subtitulo: {
    color: "#444",
    fontSize: "1rem",
    marginBottom: "8px",
    marginTop: "8px",
    display: "inline-block",
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
    transition: "background 0.2s",
    border: "none",
    fontWeight: "bold",
    color: "#404040",
    cursor: "pointer",
  },
  acoesTitulo: {
    fontSize: "1.25rem",
    color: "#174C5A",
    fontWeight: 700,
    margin: "40px 0 16px 0",
  },
};

export default TurmaDetalhe;
