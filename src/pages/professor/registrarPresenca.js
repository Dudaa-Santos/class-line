import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Fundo from '../../components/fundo-nav';
import professorService from '../../services/professorService';

function RegistrarPresenca() {
  const { idTurma, idDisciplina } = useParams();
  const idProfessor = localStorage.getItem('id_professor');
  const [alunos, setAlunos] = useState([]);
  const [dataAula, setDataAula] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [presencas, setPresencas] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(false);  
  const navigate = useNavigate();

useEffect(() => {
  if (!dataAula) return;

  async function carregarAlunos() {
    const token = localStorage.getItem('token');
    setLoading(true); // começa a carregar

    try {
      const listaPresenca = await professorService.listaPresenca(idDisciplina, idProfessor, dataAula, token);
      const alunosComPresenca = listaPresenca.map((p) => ({
        idAluno: p.idAluno,
        nome: p.nomeAluno,
      }));

      setAlunos(alunosComPresenca);

      const mapPresencas = {};
      listaPresenca.forEach((p) => {
        mapPresencas[p.idAluno] = p.presente;
      });
      setPresencas(mapPresencas);
      setIsUpdating(true);
    } catch (err) {
      console.warn('Não foi possível carregar a lista de presença. Buscando alunos normalmente...');
      setAlunos([]);
      setPresencas({});
      try {
        const dados = await professorService.buscarAluno(idTurma, token);
        const alunosSemPresenca = dados.map((aluno) => ({
          idAluno: aluno.idAluno,
          nome: aluno.nome,
        }));

        setAlunos(alunosSemPresenca);

        const mapPresencas = {};
        dados.forEach((aluno) => {
          mapPresencas[aluno.id] = false;
        });
        setPresencas(mapPresencas);
        setIsUpdating(false);
      } catch (err2) {
        alert('Erro ao carregar alunos.');
        console.error(err2);
      }
    } finally {
      setLoading(false); // termina o carregamento
    }
  }

  carregarAlunos();
}, [dataAula, idDisciplina, idProfessor, idTurma]);

  const handleCheckboxChange = (idAluno) => {
    console.log(`Checkbox changed for aluno ID: ${idAluno}`);
    setPresencas((prev) => ({
      ...prev,
      [idAluno]: !prev[idAluno],
    }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');

    const payload = {
      aula: {
        data: dataAula,
        conteudo,
      },
      presencas: alunos.map((aluno) => ({
        idAluno: aluno.idAluno,
        presente: !!presencas[aluno.idAluno],
      })),
    };

    try {
      if (isUpdating) {
        await professorService.atualizarPresenca(idDisciplina, idProfessor, payload, token);
        alert('Presença atualizada com sucesso!');
      } else {
          await professorService.lancarPresenca(idDisciplina, idProfessor, payload, token);
          alert('Presença registrada com sucesso!');
      }
      navigate(`/disciplinas/${idTurma}`);
    } catch (error) {
      alert('Erro ao registrar presença.');
      console.error(error);
    }
  };

  return (
  <Fundo>
    <div style={styles.wrapper}>
      <h2 style={styles.titulo}>Registrar Presença</h2>

      <div style={styles.cabecalho}>
        <input
          type="date"
          value={dataAula}
          onChange={(e) => setDataAula(e.target.value)}
          style={styles.input}
          placeholder="Data da Aula"
        />
        <input
          type="text"
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
          style={{ ...styles.input, flex: 1 }}
          placeholder="Descrição do Conteúdo"
        />
      </div>

      <div style={styles.tabelaWrapper}>
        <div style={styles.tabelaContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Nome</th>
                <th style={styles.thCenter}>Presente</th>
              </tr>
            </thead>
            <tbody>
            {loading ? (
              <tr>
                <td colSpan="2" style={{ textAlign: 'center', padding: '20px' }}>
                  Carregando alunos...
                </td>
              </tr>
            ) : (
              alunos.map((aluno) => (
                <tr key={aluno.idAluno}>
                  <td style={styles.td}>{aluno.nome}</td>
                  <td style={styles.tdCheckbox}>
                    <input
                      type="checkbox"
                      checked={!!presencas[aluno.idAluno]}
                      onChange={() => handleCheckboxChange(aluno.idAluno)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
          </table>
        </div>
      </div>

      <div style={styles.botoes}>
        <button style={styles.botaoCancelar} onClick={() => navigate(-1)}>Cancelar</button>
        <button style={styles.botaoFinalizar} onClick={handleSubmit}>Finalizar</button>
      </div>
    </div>
  </Fundo>
);
}
export default RegistrarPresenca;

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
    gap: '20px',
    marginBottom: '30px',
    maxWidth: '700px',
    marginInline: 'auto',
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
};