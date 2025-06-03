import React, { useEffect, useState } from 'react';
import Fundo from '../../components/fundo-nav';
import { useNavigate } from 'react-router-dom';
import instituicaoService from '../../services/instituicaoService';

export default function CadastroTurma() {
  const [form, setForm] = useState({
    nome: '',
    observacao: '',
    turno: '',
    dt_inicio: '',
    dt_fim: '',
    id_curso: '', 
  });
  const [cursos, setCursos] = useState([]);
  const navigate = useNavigate();

  // Busca cursos do banco ao carregar o componente
  useEffect(() => {
    async function carregarCursos() {
      try {
        const idInstituicao = localStorage.getItem('id_instituicao');
        const token = localStorage.getItem('token');
        const data = await instituicaoService.buscarCursos(idInstituicao, token);
        setCursos(data);
      } catch (error) {
        alert('Erro ao buscar cursos');
      }
    }
    carregarCursos();
  }, []);

  useEffect(() => {
    console.log('Cursos carregados:', cursos);
  }, [cursos]);

  // Atualiza campos do form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancelar = () => {
    navigate('/home-instituicao');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const idInstituicao = localStorage.getItem('id_instituicao');
    const token = localStorage.getItem('token');

    if (!idInstituicao || !token) {
      alert('Instituição ou token não encontrado!');
      return;
    }

    const data = {
      nome: form.nome,
      observacao: form.observacao,
      turno: form.turno,
      dt_inicio: form.dt_inicio,
      dt_fim: form.dt_fim,
    };

    const curso = form.curso
    try {
      await instituicaoService.cadastrarTurma(curso, data, token);
      alert('Turma cadastrada com sucesso!');
      navigate('/home-instituicao');
    } catch (error) {
      alert('Erro ao cadastrar turma: ' + (JSON.stringify(error.response.data)));
      // console.error('Erro ao cadastrar turma:', error);
    }
  };

  return (
    <Fundo>
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <div style={styles.tituloContainer}>
            <h2 style={styles.titulo}>Cadastrar Turma</h2>
          </div>
          <form style={styles.formulario} onSubmit={handleSubmit}>
            {/* LINHA 1 */}
            <input
              name="nome"
              style={styles.input}
              placeholder="Nome da Turma"
              value={form.nome}
              onChange={handleChange}
              required
            />

            <input
              name="dt_inicio"
              type="text"
              placeholder="Data início"
              value={form.dt_inicio}
              onFocus={e => (e.target.type = 'date')}
              onBlur={e => {
                if (!e.target.value) e.target.type = 'text';
              }}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <input
              name="dt_fim"
              type="text"
              placeholder="Data fim"
              value={form.dt_fim}
              onFocus={e => (e.target.type = 'date')}
              onBlur={e => {
                if (!e.target.value) e.target.type = 'text';
              }}
              onChange={handleChange}
              style={styles.input}
              required
            />

            {/* LINHA 2 */}
            <input
              name="observacao"
              style={styles.input}
              placeholder="Observações"
              value={form.observacao}
              onChange={handleChange}
            />

            <select
              name="turno"
              style={styles.input}
              value={form.turno}
              onChange={handleChange}
              required
            >
              <option value="">Turno</option>
              <option value="MANHA">Manhã</option>
              <option value="TARDE">Tarde</option>
              <option value="NOITE">Noite</option>
              <option value="INTEGRAL">Integral</option>
            </select>

            <select
              name="curso"
              style={styles.input}
              value={form.curso}
              onChange={handleChange}
              required
            >
              <option value="">Curso</option>
              {cursos.map((curso) => (
                <option key={curso.idCurso} value={curso.idCurso}>
                  {curso.nome}
                </option>
              ))}
            </select>

            <div style={styles.botoesContainer}>
              <button type="button" style={styles.botaoCancelar} onClick={handleCancelar}>
                Cancelar
              </button>
              <button type="submit" style={styles.botaoCadastrar}>
                Cadastrar
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 60px)',
    paddingLeft: '20px',
    paddingRight: '20px',
    boxSizing: 'border-box',
  },
  container: {
    padding: '40px',
    width: '100%',
    maxWidth: '1200px',
    fontFamily: 'Lexend, sans-serif',
    boxSizing: 'border-box',
    overflowX: 'hidden',
  },
  tituloContainer: {
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  titulo: {
    textAlign: 'center',
    color: '#002B65',
    fontFamily: 'Lexend, sans-serif',
    margin: 0,
  },
  formulario: {
    display: 'grid',
    gridTemplateColumns: '2.5fr 2fr 2fr',
    gap: '20px',
    alignItems: 'center',
    width: '100%',
    marginBottom: '20px',
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
    gridColumn: 'span 3',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '50px',
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
