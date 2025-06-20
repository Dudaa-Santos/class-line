import React, { useEffect, useState } from 'react';
import Fundo from '../../components/fundo-nav';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import instituicaoService from '../../services/instituicaoService';

function Professores() {
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
          <h2 style={styles.titulo}>Professores</h2>
        </div>
        <div style={styles.tabelaContainer}>
          <div style={styles.tabelaScroll}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={{ ...styles.th, width: '20%' }}>Nome</th>
                  <th style={{ ...styles.th, width: '20%' }}>Email</th>
                  <th style={{ ...styles.th, width: '20%' }}>Área de Atuação</th>
                  <th style={{ ...styles.th, width: '20%' }}>Turno</th>
                  <th style={{ ...styles.th, width: '20%' }}>Status</th>
                  <th style={{ ...styles.thAcoes, width: '20%' }}>Ações</th>
                </tr>
              </thead>
              <tbody style={styles.tabelaScroll}>
                {professores.map((prof) => (
                  <tr key={prof.idProfessor}>
                    <td style={styles.td}>{prof.nome}</td>
                    <td style={styles.td}>{prof.email}</td>
                    <td style={styles.td}>{prof.area_atuacao}</td>
                    <td style={styles.td}>{prof.turno}</td>
                    <td style={styles.td}>{prof.status}</td>
                    <td style={styles.tdAcoes}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <FaEdit
                        style={styles.editIcon}
                        onClick={() => navigate(`/edicao-usuario/professor/${prof.idProfessor}`)}
                        title="Editar"
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
};
