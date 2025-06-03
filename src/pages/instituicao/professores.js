import React, { useEffect, useState } from 'react';
import Fundo from '../../components/fundo-nav';
import { FaFilter, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import instituicaoService from '../../services/instituicaoService';

function Professores() {
  const [mostrarFiltro, setMostrarFiltro] = useState(false);
  const [professores, setProfessores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarProfessores() {
      try {
        const idInstituicao = localStorage.getItem('id_instituicao');
        const token = localStorage.getItem('token');
        const data = await instituicaoService.buscarProfessores(idInstituicao, token);
        setProfessores(data);
      } catch (error) {
        alert('Erro ao buscar professores');
      }
    }
    carregarProfessores();
  }, []);

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
          <div style={styles.tabelaScroll}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={{ ...styles.th, width: '20%' }}>Nome</th>
                  <th style={{ ...styles.th, width: '20%' }}>Email</th>
                  <th style={{ ...styles.th, width: '20%' }}>Área de Atuação</th>
                  <th style={{ ...styles.th, width: '20%' }}>Turno</th>
                  <th style={{ ...styles.thAcoes, width: '20%' }}>Ações</th>
                </tr>
              </thead>
              <tbody style={styles.tabelaScroll}>
                {professores.map((prof) => (
                  <tr key={prof.id}>
                    <td style={styles.td}>{prof.nome}</td>
                    <td style={styles.td}>{prof.email}</td>
                    <td style={styles.td}>{prof.area_atuacao}</td>
                    <td style={styles.td}>{prof.turno}</td>
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

                {professores.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', color: '#999', padding: '24px 0' }}>
                      Nenhum professor cadastrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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
    borderRadius: '16px',
    backgroundColor: '#fff',
    boxShadow: '0 0 12px rgba(0,0,0,0.07)',
    overflow: 'hidden',
    margin: '0 auto',
    maxWidth: '1500px',
    marginBottom: '40px',
  },
  tabelaScroll: {
    maxHeight: 'calc(65vh - 60px)', 
    overflowY: 'auto',
    width: '100%',
    background: '#fff',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    tableLayout: 'fixed',
    marginTop: 0,
  },
  th: {
    textAlign: 'left',
    backgroundColor: '#D9D9D9',
    padding: '18px 16px',
    fontWeight: 600,
    fontSize: '16px',
    color: '#222',
  },
  td: {
    textAlign: 'left',
    padding: '16px 16px',
    fontSize: '15px',
    color: '#333',
    borderTop: '1px solid #eee',
    background: '#fff',
    wordWrap: 'break-word',
  },
  thAcoes: {
    backgroundColor: '#D9D9D9',
    padding: '16px 16px',
    fontWeight: 600,
    fontSize: '16px',
    color: '#222',
  },
  editIcon: {
    color: '#FFB703',
    cursor: 'pointer',
    fontSize: '18px',
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
