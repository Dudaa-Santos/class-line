import React, { useState /*, useEffect*/ } from 'react';
import Fundo from '../../components/fundo';
import FiltroAlunos from '../../components/filtro';
import { FaFilter, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Alunos() {
  const [mostrarFiltro, setMostrarFiltro] = useState(false);
  // const [alunos, setAlunos] = useState([]);
  // useEffect(() => {
  //   fetch('/api/alunos')
  //     .then(res => res.json())
  //     .then(data => setAlunos(data));
  // }, []);

  // Dados fictícios temporários
  const alunos = [
    { id: 1, matricula: '2023001', nome: 'Ana Souza', curso: 'Análise e Desenvolvimento de Sistemas' },
    { id: 2, matricula: '2023002', nome: 'Carlos Lima', curso: 'Ciências da Computação' },
    { id: 3, matricula: '2023003', nome: 'Fernanda Alves', curso: 'Engenharia de Software' },
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
          <h2 style={styles.titulo}>Alunos</h2>
        </div>

        {mostrarFiltro && (
          <div style={styles.filtroOverlay}>
            <FiltroAlunos
              filtros={{}}
              setFiltros={() => {}}
              cursosDisponiveis={[]}
            />
          </div>
        )}

        <div style={styles.tabelaContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Matrícula</th>
                <th style={styles.th}>Nome</th>
                <th style={styles.th}>Curso</th>
                <th style={styles.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map((aluno) => (
                <tr key={aluno.id}>
                  <td style={styles.td}>{aluno.matricula}</td>
                  <td style={styles.td}>{aluno.nome}</td>
                  <td style={styles.td}>{aluno.curso}</td>
                  <td style={styles.tdAcoes}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <FaEdit
                        style={styles.editIcon}
                        onClick={() => navigate('/cadastro-aluno', {
                          state: {
                            modo: 'edicao',
                            aluno,
                          },
                        })}
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
    top: '40px',
    left: '30px',
    zIndex: 10,
  },
};
