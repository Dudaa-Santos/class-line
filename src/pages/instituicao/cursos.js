import React, { useEffect, useState } from 'react';
import Fundo from '../../components/fundo-nav';
import { useNavigate } from 'react-router-dom';
import instituicaoService from '../../services/instituicaoService';

function Cursos() {
  const [cursos, setCursos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarCursos() {
      try {
        const idInstituicao = localStorage.getItem('id_instituicao');
        const token = localStorage.getItem('token');
        if (!idInstituicao) return;

        const cursosData = await instituicaoService.buscarCursos(idInstituicao, token);
        setCursos(cursosData);
      } catch (error) {
        console.error('Erro ao buscar cursos:', error);
        setCursos([]);
        alert('Erro ao buscar dados dos cursos.');
      }
    }
    carregarCursos();
  }, []);

  return (
    <Fundo>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <h2 style={styles.titulo}>Cursos</h2>
        </div>

        <div style={styles.tabelaContainer}>
          <table style={styles.table}>
            <thead>
            <tr>
              <th style={styles.th}>Nome</th>
              <th style={styles.th}>Descrição</th>
              <th style={styles.th}>Qtde. Semestres</th>  
              <th style={styles.th}>Tipo</th>             
            </tr>
          </thead>
          <tbody>
            {cursos.map((curso) => (
              <tr key={curso.id}>
                <td style={styles.td}>{curso.nome}</td>
                <td style={styles.td}>{curso.descricao}</td>
                <td style={styles.td}>{curso.qtde_semestres ?? '-'}</td> 
                <td style={styles.td}>{curso.tipo ?? '-'}</td>         
              </tr>
            ))}
            {cursos.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', color: '#999', padding: '24px 0' }}>
                  Nenhum curso cadastrado.
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

export default Cursos;

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
  titulo: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#002B65',
  },
  tabelaContainer: {
    width: '80%',
    margin: '0 auto',
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