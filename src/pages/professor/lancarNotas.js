import React, { useState, useEffect } from 'react';
import Fundo from '../../components/fundo-nav';
import professorService from '../../services/professorService';
import { useParams, useNavigate } from 'react-router-dom';

function LancarNotas() {
  const { idTurma, idDisciplina } = useParams();
  const idProfessor = localStorage.getItem('id_professor');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [avaliacoes, setAvaliacoes] = useState([]);
  const [avaliacaoSelecionada, setAvaliacaoSelecionada] = useState('');
  const [alunosNotas, setAlunosNotas] = useState([]);

  useEffect(() => {
    async function carregarAvaliacoes() {
      try {
        const avaliacoesAPI = await professorService.buscarAvaliacao(
          idDisciplina, idProfessor, idTurma, token
        );
        setAvaliacoes(avaliacoesAPI || []);
      } catch (err) {
        console.error("Erro ao buscar avaliações:", err);
      }
    }

    if (idTurma && idDisciplina && idProfessor && token) {
      carregarAvaliacoes();
    }
  }, [idTurma, idDisciplina, idProfessor, token]);

  useEffect(() => {
    async function carregarAlunos() {
      if (!avaliacaoSelecionada) return;

      try {
        const alunosAPI = await professorService.buscarAluno(idTurma, token);
        const lista = alunosAPI.map(aluno => ({
          idAluno: aluno.idAluno ?? aluno.id,
          nome: aluno.nome,
          nota: ''
        }));
        setAlunosNotas(lista);
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
        alert("Erro ao buscar alunos.");
      }
    }

    carregarAlunos();
  }, [avaliacaoSelecionada]);

  const handleNotaChange = (idx, novaNota) => {
    const atualizados = [...alunosNotas];
    atualizados[idx].nota = novaNota;
    setAlunosNotas(atualizados);
  };

  const handleFinalizar = async () => {
    try {
      const payload = {
        idAvaliacao: avaliacaoSelecionada,
        notas: alunosNotas.map(a => ({
          idAluno: a.idAluno,
          nota: parseFloat(a.nota)
        }))
      };

      await professorService.lancarNotas(payload, token);
      alert('Notas lançadas com sucesso!');
      navigate(`/grade-curricular/${idTurma}`);
    } catch (error) {
      console.error("Erro ao lançar notas:", error);
      alert("Erro ao lançar notas.");
    }
  };

  const handleCancelar = () => {
    navigate(`/grade-curricular/${idTurma}`);
  };

  return (
    <Fundo>
      <div style={styles.wrapper}>
        <h2 style={styles.titulo}>Lançar Notas</h2>

        <div style={styles.selectContainer}>
          <select
            value={avaliacaoSelecionada}
            onChange={(e) => setAvaliacaoSelecionada(e.target.value)}
            style={styles.select}
          >
            <option value="">Selecione uma Avaliação</option>
            {avaliacoes.map((av) => (
              <option key={av.id} value={av.id}>{av.nome}</option>
            ))}
          </select>
        </div>

        {avaliacaoSelecionada && (
          <div style={styles.tabelaContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Nome do Aluno</th>
                  <th style={styles.thNota}>Nota</th>
                </tr>
              </thead>
              <tbody>
                {alunosNotas.map((item, idx) => (
                  <tr key={item.idAluno}>
                    <td style={styles.td}>{item.nome}</td>
                    <td style={{ ...styles.td, textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        value={item.nota}
                        onChange={(e) => handleNotaChange(idx, e.target.value)}
                        style={styles.inputNota}
                      />
                    </div>
                  </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div style={styles.botoesContainer}>
          <button style={styles.botaoCancelar} onClick={handleCancelar}>Voltar</button>
          <button style={styles.botaoCadastrar} onClick={handleFinalizar}>Finalizar</button>
        </div>
      </div>
    </Fundo>
  );
}

export default LancarNotas;

const styles = {
  wrapper: {
    minHeight: '100vh',
    padding: '30px 20px',
    fontFamily: 'Lexend, sans-serif',
    backgroundColor: '#f6f6f6',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  titulo: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#002B65',
    marginBottom: '24px',
    textAlign: 'center',
  },
  selectContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
    width: '100%',
  },
  select: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #D9D9D9',
    fontSize: '14px',
    width: '100%',
    maxWidth: '400px',
  },
  tabelaContainer: {
    width: '100%',
    maxWidth: '700px',
    overflowY: 'auto',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 8px rgba(0,0,0,0.05)',
    marginBottom: '20px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: '#D9D9D9',
    padding: '14px',
    fontWeight: 600,
    fontSize: '15px',
    textAlign: 'left',
  },
  thNota: {
    backgroundColor: '#D9D9D9',
    padding: '14px',
    fontWeight: 600,
    fontSize: '15px',
    textAlign: 'center',
  },
  td: {
    padding: '14px',
    fontSize: '14px',
    borderTop: '1px solid #eee',
  },
  inputNota: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px',
    width: '100px',
  },
  botoesContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '24px',
    marginTop: '32px',
  },
  botaoCancelar: {
    backgroundColor: '#FD750D',
    color: '#fff',
    border: 'none',
    padding: '12px 40px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  botaoCadastrar: {
    backgroundColor: '#27AE60',
    color: '#fff',
    border: 'none',
    padding: '12px 40px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};
