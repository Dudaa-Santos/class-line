import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Fundo from '../../components/fundo-nav';
import professorService from '../../services/professorService';

function AlunosDisciplina() {
  const [alunos, setAlunos] = useState([]);
  const navigate = useNavigate();
  const { idDisciplina } = useParams();

  useEffect(() => {
    async function carregarAlunos() {
      try {
        const token = localStorage.getItem('token');
        if (!idDisciplina || !token) return;

        const alunosData = await professorService.buscarAlunoDisciplina(idDisciplina, token);
        setAlunos(alunosData);
      } catch (error) {
        console.error('Erro ao buscar alunos da disciplina:', error);
        setAlunos([]);
        alert('Erro ao buscar os alunos da disciplina.');
      }
    }

    carregarAlunos();
  }, [idDisciplina]);

  return (
    <Fundo>
      <div style={styles.container}>
        <div style={styles.layoutRow}>
          <div style={styles.voltarWrapper}>
            <button
              onClick={() => navigate(-1)}
              style={styles.botaoVoltar}
              title="Voltar"
            >
              <FaArrowLeft />
            </button>
          </div>
          <div style={styles.contentWrapper}>
            <h2 style={styles.titulo}>Alunos da Disciplina</h2>
          </div>
        </div>

        <div style={styles.tabelaContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Nome</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Turma</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map((aluno) => (
                <tr key={aluno.id}>
                  <td style={styles.td}>{aluno.nome}</td>
                  <td style={styles.td}>{aluno.email}</td>
                  <td style={styles.td}>{aluno.nomeTurma || '-'}</td>
                </tr>
              ))}
              {alunos.length === 0 && (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center', color: '#999', padding: '24px 0' }}>
                    Nenhum aluno encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Fundo>
  );
}

export default AlunosDisciplina;

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
  tabelaContainer: {
    marginTop: "40px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 0 8px rgba(0,0,0,0.05)",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
  },
  th: {
    textAlign: "left",
    backgroundColor: "#D9D9D9",
    padding: "16px",
    fontWeight: 600,
    fontSize: "15px",
    color: "#222",
  },
  td: {
    padding: "14px 16px",
    fontSize: "14px",
    color: "#333",
    borderTop: "1px solid #eee",
  },
};
