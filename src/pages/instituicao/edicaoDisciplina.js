import React, { useEffect, useState } from 'react';
import Fundo from '../../components/fundo-nav';
import { useNavigate, useParams } from 'react-router-dom';
import instituicaoService from '../../services/instituicaoService';

export default function EdicaoDisciplina() {
  const [form, setForm] = useState({
    carga_horaria: '',
    idProfessor: '',
  });
  const [professores, setProfessores] = useState([]);
  const navigate = useNavigate();
  const { idTurma, idDisciplina, idSemestre } = useParams();

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
      } catch (err) {
        alert("Erro ao carregar professores.");
      }
    }
    carregarDados();
  }, []);

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

    try {
      await instituicaoService.editarDisciplinaSemestre(
        idDisciplina,
        idSemestre,
        idTurma,
        {
          carga_horaria: Number(form.carga_horaria),
          idProfessor: Number(form.idProfessor),
        },
        token
      );
      alert('Disciplina editada com sucesso!');
      navigate(`/gerenciar-grades/${idTurma}`);
    } catch (error) {
      const msg =
        error?.response?.data?.message || error?.message || 'Erro desconhecido';
      alert('Erro ao editar disciplina: ' + msg);
    }
  };

  const handleCancelar = () => {
    navigate(`/gerenciar-grades/${idTurma}`);
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
              name="carga_horaria"
              type="number"
              min="1"
              style={{ ...styles.input, gridColumn: 'span 2' }}
              placeholder="Carga Horária (em horas)"
              value={form.carga_horaria}
              onChange={handleChange}
              required
            />

            <select
              name="idProfessor"
              style={{ ...styles.input, gridColumn: 'span 2' }}
              value={form.idProfessor}
              onChange={handleChange}
              required
            >
              <option value="">Selecione o Professor</option>
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
