import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Fundo from '../../components/fundo-nav';
import professorService from '../../services/professorService';

function ListaPresenca() {
  const { idDisciplina } = useParams();
  const idProfessor = localStorage.getItem('id_professor');
  const [data, setData] = useState('');
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

useEffect(() => {
  if (!data) return;

  const buscarPresenca = async () => {
    const token = localStorage.getItem('token');
    setLoading(true);
    try {
      const resultado = await professorService.listaPresenca(
        idDisciplina,
        idProfessor,
        data,
        token
      );
      setLista(resultado);
    } catch (error) {
      console.error('Erro ao buscar lista de presença:', error);
      alert('Erro ao buscar lista de presença.');
    } finally {
      setLoading(false);
    }
  };

  buscarPresenca();
}, [data, idDisciplina, idProfessor]);

  return (
    <Fundo>
      <div style={styles.wrapper}>
        <h2 style={styles.titulo}>Lista de Presença</h2>

        <div style={styles.cabecalho}>
          <label htmlFor="dataInput" style={styles.label}>Selecione a data da aula:</label>
          <input
            id="dataInput"
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            style={styles.inputDate}
          />
        </div>

        <div style={styles.tabelaWrapper}>
          <div style={styles.tabelaContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Nome</th>
                  <th style={styles.thCenter}>Presença</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="2" style={{ textAlign: 'center', padding: '20px' }}>
                      Carregando alunos...
                    </td>
                  </tr>
                ) : lista.length === 0 ? (
                  <tr>
                    <td colSpan="2" style={styles.semDados}>
                      Nenhuma presença registrada nesta data.
                    </td>
                  </tr>
                ) : (
                  lista.map((item, index) => (
                    <tr key={index}>
                      <td style={styles.td}>{item.nome || item.nomeAluno || 'Sem nome'}</td>
                      <td style={styles.tdCheckbox}>
                        {item.presente ? '✅' : '❌'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div style={styles.botoes}>
          <button style={styles.botaoCancelar} onClick={() => navigate(-1)}>Voltar</button>
        </div>
      </div>
    </Fundo>
  );
}

export default ListaPresenca;

const styles = {
  wrapper: {
    padding: '30px 40px',
    fontFamily: 'Lexend, sans-serif',
    backgroundColor: '#f6f6f6',
    minHeight: '100vh',
  },
  titulo: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#002B65',
    textAlign: 'center',
    marginBottom: '24px',
  },
  cabecalho: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '30px',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '15px',
    minWidth: '180px',
  },
  tabelaWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  tabelaContainer: {
    width: '100%',
    maxWidth: '700px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 0 8px rgba(0,0,0,0.05)',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: '#D9D9D9',
    padding: '16px',
    fontWeight: 600,
    fontSize: '15px',
    color: '#222',
    textAlign: 'left',
  },
  thCenter: {
    backgroundColor: '#D9D9D9',
    padding: '16px',
    fontWeight: 600,
    fontSize: '15px',
    color: '#222',
    textAlign: 'center',
    width: '120px',
  },
  td: {
    padding: '14px 16px',
    fontSize: '14px',
    color: '#333',
    borderTop: '1px solid #eee',
  },
  tdCheckbox: {
    textAlign: 'center',
    borderTop: '1px solid #eee',
    verticalAlign: 'middle',
  },
  botoes: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    marginTop: '40px',
  },
  botaoCancelar: {
    backgroundColor: '#FD750D',
    color: '#fff',
    border: 'none',
    padding: '12px 40px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  botaoFinalizar: {
    backgroundColor: '#27AE60',
    color: '#fff',
    border: 'none',
    padding: '12px 40px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  label: {
  fontSize: '16px',
  color: '#333',
  marginRight: '8px',
  alignSelf: 'center',
},

inputDate: {
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #bbb',
  fontSize: '15px',
  minWidth: '200px',
  backgroundColor: '#fff',
  boxShadow: '0 0 4px rgba(0,0,0,0.1)',
},
semDados: {
  padding: '20px',
  textAlign: 'center',
  color: '#999',
},

};