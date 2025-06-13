import React, { useEffect, useState } from 'react';
import Fundo from '../../components/fundo-nav';
import { FaFilter, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import instituicaoService from '../../services/instituicaoService';

function Alunos() {
  const [mostrarFiltro, setMostrarFiltro] = useState(false);
  const [alunos, setAlunos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarAlunos() {
      try {
        const idInstituicao = localStorage.getItem('id_instituicao');
        const token = localStorage.getItem('token');
        if (!idInstituicao) return;

        const [alunosData, cursosData, turmasData] = await Promise.all([
          instituicaoService.buscarAluno(idInstituicao, token),
          instituicaoService.buscarCursos(idInstituicao, token),
          instituicaoService.buscarTurmas(idInstituicao, token)
        ]);

        const cursosMap = new Map(cursosData.map(curso => [curso.id, curso.nome]));
        const turmasMap = new Map(turmasData.map(turma => [turma.id, turma.nome]));

        const alunosEnriquecidos = alunosData.map(aluno => {
          const nomeCurso = cursosMap.get(aluno.id_curso) || '-';
          const nomeTurma = turmasMap.get(aluno.id_turma) || '-';
          
          return {
            ...aluno,
            nomeCurso,
            nomeTurma
          };
        });

        setAlunos(alunosEnriquecidos);

      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setAlunos([]);
        alert('Erro ao buscar dados da página.');
      }
    }

    carregarAlunos();
  }, []);

  return (
    <Fundo>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <FaFilter
            style={styles.filterButton}
            onClick={() => setMostrarFiltro(!mostrarFiltro)}
          />
          <h2 style={styles.titulo}>Alunos</h2>
        </div>

        {mostrarFiltro && (
          <div style={styles.filtroOverlay}>
            <div style={{ padding: '10px', background: '#d9d9d9' }}>Filtros (em breve)</div>
          </div>
        )}

        <div style={styles.tabelaContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Nome</th>
                <th style={styles.th}>Curso</th>
                <th style={styles.th}>Turma</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Turno</th>
                <th style={styles.th}>Status</th>
                <th style={styles.thAcoes}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map((aluno) => (
                <tr key={aluno.id}>
                  <td style={styles.td}>{aluno.nome}</td>
                  <td style={styles.td}>{aluno.nomeCurso}</td>
                  <td style={styles.td}>{aluno.nomeTurma}</td>
                  <td style={styles.td}>{aluno.email}</td>
                  <td style={styles.td}>{aluno.turno}</td>
                  <td style={styles.td}>{aluno.status}</td>
                  <td style={styles.tdAcoes}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <FaEdit
                        style={styles.editIcon}
                        onClick={() =>
                          navigate('/cadastro-usuario', {
                            state: {
                              modo: 'edicao',
                              aluno,
                            },
                          })
                        }
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {alunos.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', color: '#999', padding: '24px 0' }}>
                    Nenhum aluno cadastrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <button
          style={styles.botaoVoltar}
          onClick={() => navigate('/home-instituicao')}
        >
          Voltar
        </button>
      </div>
    </Fundo>
  );
}

export default Alunos;

const styles = {
  wrapper: {
    minHeight: '100vh',
    padding: '30px 40px',
    fontFamily: 'Lexend, sans-serif',
    position: 'relative',
    backgroundColor: '#f6f6f6',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    position: 'relative',
  },
  filterButton: {
    fontSize: '24px',
    color: '#FD750D',
    cursor: 'pointer',
  },
  titulo: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#002B65',
  },
  tabelaContainer: {
    maxHeight: '60vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 0 8px rgba(0,0,0,0.05)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
  },
  th: {
    textAlign: 'left',
    backgroundColor: '#D9D9D9',
    padding: '16px',
    fontWeight: 600,
    fontSize: '15px',
    color: '#222',
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  td: {
    padding: '14px 16px',
    fontSize: '14px',
    color: '#333',
    borderTop: '1px solid #eee',
  },
  tdAcoes: {
    padding: '14px 16px',
    fontSize: '14px',
    color: '#333',
    borderTop: '1px solid #eee',
    textAlign: 'center',
  },
  thAcoes: {
    textAlign: 'center',
    backgroundColor: '#D9D9D9',
    padding: '16px',
    fontWeight: 600,
    fontSize: '15px',
    color: '#222',
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  editIcon: {
    color: '#FFB703',
    cursor: 'pointer',
    fontSize: '16px',
  },
  botaoVoltar: {
    marginTop: '40px',
    backgroundColor: '#FD750D',
    color: '#fff',
    border: 'none',
    padding: '12px 40px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  filtroOverlay: {
    position: 'absolute',
    top: '60px',
    left: '30px',
    zIndex: 10,
  },
};