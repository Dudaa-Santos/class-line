import React, { useEffect, useState } from 'react';
import Fundo from '../../components/fundo-nav';
import { FaFilter, FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import instituicaoService from '../../services/instituicaoService';

function Turmas() {
  const [mostrarFiltro, setMostrarFiltro] = useState(false);
  const [turmas, setTurmas] = useState([]);
  const navigate = useNavigate();

    useEffect(() => {
    async function carregarTurmas() {
      try {
        const idInstituicao = localStorage.getItem('id_instituicao');
        const token = localStorage.getItem('token');
        if (!idInstituicao) return;

        // aqui buscamos todas as turmas da instituição
        const turmasData = await instituicaoService.buscarTurmas(idInstituicao, token);
        setTurmas(turmasData);
      } catch (error) {
        console.error('Não foi possível carregar turmas:', error);
        setTurmas([]);
        alert('Não foi possível carregar turmas.');
      }
    }
    carregarTurmas();
  }, []);  // array vazio = executa apenas uma vez, ao montar

  return (
    <Fundo>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <FaFilter
            style={styles.filterButton}
            onClick={() => setMostrarFiltro(!mostrarFiltro)}
          />
          <h2 style={styles.titulo}>Turmas</h2>
        </div>
   
        {mostrarFiltro && (
          <div style={styles.filtroOverlay}>
            <div style={{ padding: '10px', background: '#eee' }}>Filtros (em breve)</div>
          </div>
        )}

        <div style={styles.tabelaContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Nome</th>
                <th style={styles.th}>Observação</th>
                <th style={styles.th}>Turno</th>
                <th style={styles.th}>Data Início</th>
                <th style={styles.th}>Data Fim</th>
                <th style={styles.th}>Curso</th>
                <th style={styles.thAcoes}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {turmas.map((turma) => (
                <tr key={turma.id}>
                  <td style={styles.td}>{turma.nome}</td>
                  <td style={styles.td}>{turma.observacao || '—'}</td>
                  <td style={styles.td}>{turma.turno}</td>
                  <td style={styles.td}>
                    {turma.dt_inicio
                      ? new Date(turma.dt_inicio).toLocaleDateString('pt-BR')
                      : '—'}
                  </td>
                  <td style={styles.td}>
                    {turma.dt_fim
                      ? new Date(turma.dt_fim).toLocaleDateString('pt-BR')
                      : '—'}
                  </td>
                  <td style={styles.td}>{turma.curso?.nome || '—'}</td>
                  <td style={styles.tdAcoes}>
                  <div style={styles.iconesAcoes}>
                    <FaCog
                      style={styles.cogIcon}
                      onClick={() =>
                        navigate('/cadastro-turma', {
                          state: {
                            modo: 'edicao',
                            turma,
                          },
                        })
                      }
                    />
                  </div>
                </td>
                </tr>
              ))}
              {turmas.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', color: '#999', padding: '24px 0' }}>
                    Nenhuma turma cadastrada.
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

export default Turmas;

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
    padding: '14px',
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
    padding: '14px',
    fontWeight: 600,
    fontSize: '15px',
    color: '#222',
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  eyeIcon: {
    color: '#27AE60',
    fontSize: '18px',
    cursor: 'pointer',
  },
  cogIcon: {
    color: '#1F668E',
    fontSize: '18px',
    cursor: 'pointer',
  },
  botaoVoltar: {
    marginTop: '40px',
    backgroundColor: '#FD750D',
    color: '#fff',
    border: 'none',
    padding: '12px 40px',
    borderRadius: '8px',
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
  iconesAcoes: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
