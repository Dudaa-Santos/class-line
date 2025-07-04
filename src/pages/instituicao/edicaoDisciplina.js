import React, { useEffect, useState } from 'react';
import Fundo from '../../components/fundo-nav';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import instituicaoService from '../../services/instituicaoService';

export default function EdicaoDisciplina() {
  const [form, setForm] = useState({
    nome: '',
    carga_horaria: '',
    idProfessor: '',
    nomeProfessorAntigo: '',
  });

  const [professores, setProfessores] = useState([]);
  const [idProfessorAntigo, setIdProfessorAntigo] = useState('');
  const navigate = useNavigate();
  const { idTurma, idDisciplina, idSemestre } = useParams();
  const location = useLocation();

  const nomeProfessor = location.state?.nomeProfessor || '';
  const idProfessor = location.state?.idProfessor || '';

  useEffect(() => {
    async function carregarDados() {
      const token = localStorage.getItem('token');
      const idInstituicao = localStorage.getItem('id_instituicao');

      try {
        const lista = await instituicaoService.buscarProfessores(idInstituicao, token);
        const professoresNormalizados = lista.map(p => ({
          id: p.idProfessor ?? p.id,
          nome: p.nome,
        }));
        setProfessores(professoresNormalizados);

        const dadosDisciplina = await instituicaoService.buscarDisciplinaPorId(idDisciplina, token);
        
        setForm({
          nome: dadosDisciplina.nome || '',
          carga_horaria: dadosDisciplina.carga_horaria || '',
          idProfessor: '',
          nomeProfessorAntigo: nomeProfessor,
        });

        setIdProfessorAntigo(idProfessor);

      } catch (err) {
        alert("Erro ao carregar dados.");
        console.error(err);
      }
    }

    carregarDados();
  }, [idDisciplina, idSemestre, idTurma, nomeProfessor, idProfessor]); // ✅ Inclui as dependências corretas

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const body = {
      idDisciplina: Number(idDisciplina),
      idSemestre: Number(idSemestre),
      idProfessorAntigo,
      idProfessorNovo: String(form.idProfessor),
    };

    try {
      await instituicaoService.editarDisciplinaSemestre(body, token);
      alert('Professor alterado com sucesso!');
      navigate(`/grade-curricular/${idTurma}`);
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message || 'Erro desconhecido';
      alert('Erro ao editar disciplina: ' + msg);
    }
  };

  const handleCancelar = () => {
    navigate(`/grade-curricular/${idTurma}`);
  };

  return (
    <Fundo>
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <div style={styles.tituloContainer}>
            <h2 style={styles.titulo}>Edição de Disciplina</h2>
          </div>
          <form style={styles.formulario} onSubmit={handleSubmit}>
            <input
              type="text"
              style={{ ...styles.input, gridColumn: 'span 2', backgroundColor: '#f0f0f0', color: '#777', cursor: 'not-allowed' }}
              value={form.nome}
              disabled
              placeholder="Nome da Disciplina"
            />
            <input
              type="text"
              style={{ ...styles.input, gridColumn: 'span 2', backgroundColor: '#f0f0f0', color: '#777', cursor: 'not-allowed' }}
              value={form.nomeProfessorAntigo}
              disabled
              placeholder="Professor Atual"
            />
            <input
              name="carga_horaria"
              type="number"
              style={{ ...styles.input, gridColumn: 'span 2', backgroundColor: '#f0f0f0', color: '#777', cursor: 'not-allowed' }}
              value={form.carga_horaria}
              placeholder="Carga Horária"
              disabled
            />
            <select
              name="idProfessor"
              style={{ ...styles.input, gridColumn: 'span 2' }}
              value={form.idProfessor}
              onChange={handleChange}
              required
            >
              <option value="">Selecione o Novo Professor</option>
              {professores.map((p) => (
                <option key={p.id} value={p.id}>{p.nome}</option>
              ))}
            </select>
            <div style={styles.botoesContainer}>
              <button type="button" style={styles.botaoCancelar} onClick={handleCancelar}>
                Cancelar
              </button>
              <button type="submit" style={styles.botaoCadastrar}>
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fundo>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 64px)',
    paddingTop: '0px',
    paddingLeft: '20px',
    paddingRight: '20px',
    boxSizing: 'border-box',
  },
  container: {
    padding: '40px',
    width: '100%',
    maxWidth: '900px',
    fontFamily: 'Lexend, sans-serif',
    boxSizing: 'border-box',
    overflowX: 'hidden',
  },
  tituloContainer: {
    marginBottom: '30px',
    textAlign: 'center',
  },
  titulo: {
    color: '#002B65',
    fontFamily: 'Lexend, sans-serif',
  },
  formulario: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    padding: '14px',
    border: '1px solid #D9D9D9',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: 'transparent',
    color: '#787878',
    fontFamily: 'Lexend, sans-serif',
    width: '100%',
    boxSizing: 'border-box',
  },
  botoesContainer: {
    gridColumn: 'span 2',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '30px',
  },
  botaoCancelar: {
    backgroundColor: '#FD750D',
    color: '#fff',
    border: 'none',
    padding: '12px 40px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontFamily: 'Lexend, sans-serif',
  },
  botaoCadastrar: {
    backgroundColor: '#27AE60',
    color: '#fff',
    border: 'none',
    padding: '12px 40px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontFamily: 'Lexend, sans-serif',
  },
};
