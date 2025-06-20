import React, { useState, useEffect } from 'react';
import Fundo from '../../components/fundo-nav';
import professorService from '../../services/professorService';
import { useParams } from 'react-router-dom';

function LancarNotas() {
  const { idTurma, idDisciplina } = useParams();
  const idProfessor = localStorage.getItem('id_professor');
  const token = localStorage.getItem('token');

  const [avaliacoes, setAvaliacoes] = useState([]);
  const [avaliacaoSelecionada, setAvaliacaoSelecionada] = useState('');
  const [alunosNotas, setAlunosNotas] = useState([]);

  // Buscar avaliações da disciplina
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

  // Buscar alunos vinculados à avaliação selecionada
  useEffect(() => {
    async function carregarAlunosDaAvaliacao() {
      try {
        if (!avaliacaoSelecionada) return;
        const alunos = await professorService.buscarNotas(avaliacaoSelecionada, token);
        const lista = alunos.map(aluno => ({
          idAluno: aluno.idAluno,
          nome: aluno.nome,
          nota: aluno.nota || ''
        }));
        setAlunosNotas(lista);
      } catch (error) {
        console.error("Erro ao buscar alunos/notas:", error);
      }
    }

    carregarAlunosDaAvaliacao();
  }, [avaliacaoSelecionada, token]);

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
    } catch (error) {
      console.error("Erro ao lançar notas:", error);
      alert("Erro ao lançar notas.");
    }
  };

  const handleCancelar = () => {
    window.history.back();
  };

  return (
    <Fundo>
      <div style={styles.wrapper}>
        <h2 style={styles.titulo}>Lançar Notas</h2>

        <div style={{ marginBottom: '20px' }}>
          <select
            value={avaliacaoSelecionada}
            onChange={(e) => setAvaliacaoSelecionada(e.target.value)}
            style={styles.input}
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
                  <th style={styles.th}>Nota</th>
                </tr>
              </thead>
              <tbody>
                {alunosNotas.map((item, idx) => (
                  <tr key={item.idAluno}>
                    <td style={styles.td}>{item.nome}</td>
                    <td style={styles.td}>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        value={item.nota}
                        onChange={(e) => handleNotaChange(idx, e.target.value)}
                        style={styles.input}
                      />
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
    padding: '30px 40px',
    fontFamily: 'Lexend, sans-serif',
    backgroundColor: '#f6f6f6',
  },
  titulo: {
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#002B65',
    marginBottom: '24px',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #D9D9D9',
    fontSize: '14px',
    width: '100%',
  },
  tabelaContainer: {
    maxHeight: '44vh',
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
  },
  td: {
    padding: '14px',
    fontSize: '14px',
    borderTop: '1px solid #eee',
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
