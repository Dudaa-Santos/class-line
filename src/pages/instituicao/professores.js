import React, { useState /*, useEffect*/ } from 'react';
import Fundo from '../../components/fundo';
import { FaFilter, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Professores() {
  const [mostrarFiltro, setMostrarFiltro] = useState(false);
  // const [professores, setProfessores] = useState([]);
  // useEffect(() => {
  //   fetch('/api/professores')
  //     .then(res => res.json())
  //     .then(data => setProfessores(data));
  // }, []);

  // Dados fictícios temporários
  const professores = [
    { id: 1, nome: 'João Silva', area: 'Banco de Dados' },
    { id: 2, nome: 'Maria Oliveira', area: 'Front-End' },
    { id: 3, nome: 'Pedro Santos', area: 'Back-End' },
  ];
  const navigate = useNavigate();

  return (
    <Fundo>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <FaFilter
            style={styles.filterButton}
            onClick={() => setMostrarFiltro(!mostrarFiltro)}
          />
          <h2 style={styles.titulo}>Professores</h2>
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
                <th style={styles.th}>Código</th>
                <th style={styles.th}>Nome</th>
                <th style={styles.th}>Área de Atuação</th>
                <th style={styles.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {professores.map((prof) => (
                <tr key={prof.id}>
                  <td style={styles.td}>{prof.id}</td>
                  <td style={styles.td}>{prof.nome}</td>
                  <td style={styles.td}>{prof.area}</td>
                  <td style={styles.tdAcoes}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <FaEdit
                        style={styles.editIcon}
                        onClick={() =>
                          navigate('/cadastro-professor', {
                            state: {
                              modo: 'edicao',
                              professor: prof,
                            },
                          })
                        }
                      />
                    </div>
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

export default Professores;

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
    borderRadius: '10px',
    alignItems: 'center',
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
