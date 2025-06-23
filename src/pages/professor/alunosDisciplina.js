import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Fundo from '../../components/fundo-nav';
import professorService from '../../services/professorService';

function AlunosDisciplina() {
  const [alunos, setAlunos] = useState([]);
  const { idDisciplina } = useParams();

  useEffect(() => {
    async function carregarAlunos() {
      try {
        const token = localStorage.getItem('token');
        if (!idDisciplina || !token) return;

        const alunosData = await professorService.buscarAlunoDisciplina(idDisciplina, token);

        const alunosComDados = alunosData.map((aluno) => ({
          nome: aluno.nomeAluno,
          email: aluno.emailAluno,
          frequencia: aluno.frequencia + '%',
          media: aluno.media.toFixed(2),
        }));

        setAlunos(alunosComDados);
      } catch (error) {
        console.error('Erro ao buscar alunos da disciplina:', error);
        alert('Erro ao buscar os alunos da disciplina.');
      }
    }

    carregarAlunos();
  }, [idDisciplina]);

  const handleVoltar = () => {
    window.history.back();
  };

  return (
    <Fundo>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.titulo}>Alunos da Disciplina</h2>
        </div>

        <div style={styles.tabelaContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Nome</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Frequência</th>
                <th style={styles.th}>Média</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map((aluno, index) => (
                <tr key={index}>
                  <td style={styles.td}>{aluno.nome}</td>
                  <td style={styles.td}>{aluno.email}</td>
                  <td style={styles.td}>{aluno.frequencia}</td>
                  <td style={styles.td}>{aluno.media}</td>
                </tr>
              ))}
              {alunos.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', color: '#999', padding: '24px 0' }}>
                    Nenhum aluno encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div style={styles.botoesContainer}>
          <button onClick={handleVoltar} style={styles.botaoVoltar}>
            Voltar
          </button>
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
  header: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "30px",
  },
  titulo: {
    fontSize: "2rem",
    color: "#12224A",
    fontWeight: 700,
    margin: 0,
  },
  tabelaContainer: {
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 0 8px rgba(0,0,0,0.05)",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
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
  botoesContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '32px',
  },
  botaoVoltar: {
    backgroundColor: '#FD750D',
    color: '#fff',
    border: 'none',
    padding: '12px 40px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontFamily: 'Lexend, sans-serif',
    display: 'flex',
    alignItems: 'center',
  },
};
