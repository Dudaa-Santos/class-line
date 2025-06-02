import React, { useState } from 'react';
import Fundo from '../../components/fundo';
import { FaFilter, FaEye, FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Turmas() {
  const [mostrarFiltro, setMostrarFiltro] = useState(false);
  const navigate = useNavigate();

  // Dados fictícios temporários
  const turmas = [
    { id: 1, nome: 'Turma A', curso: 'ADS' },
    { id: 2, nome: 'Turma B', curso: 'Engenharia de Software' },
    { id: 3, nome: 'Turma C', curso: 'Ciência da Computação' },
    { id: 4, nome: 'Turma D', curso: 'Sistemas de Informação' },
  ];

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
                <th style={styles.th}>Curso</th>
                <th style={styles.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {turmas.map((turma) => (
                <tr key={turma.id}>
                  <td style={styles.td}>{turma.nome}</td>
                  <td style={styles.td}>{turma.curso}</td>
                  <td style={styles.tdAcoes}>
                    <FaEye style={styles.eyeIcon} />
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
                  </td>
                </tr>
              ))}
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
    backgroundColor: '#fff',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    marginBottom: '20px',
  },
  filterButton: {
    fontSize: '26px',
    color: '#FD750D',
    cursor: 'pointer',
    marginRight: '20px',
  },
  titulo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#002B65',
    margin: '0 auto',
  },
  tabelaContainer: {
    borderRadius: '10px',
    overflow: 'hidden',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0,0,0,0.05)',
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
    color: '#222',
    borderBottom: '1px solid #ccc',
    textAlign: 'left',
  },
  td: {
    padding: '12px 14px',
    fontSize: '14px',
    color: '#333',
    borderBottom: '1px solid #eee',
  },
  tdAcoes: {
    padding: '12px 14px',
    textAlign: 'center',
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '1px solid #eee',
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
};
