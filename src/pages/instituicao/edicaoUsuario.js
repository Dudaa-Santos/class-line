import React, { useEffect, useState } from 'react';
import Fundo from '../../components/fundo-nav';
import { useNavigate, useParams } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Upload from '../../img/sem-preenchimento/upload-icon.png';
import instituicaoService from '../../services/instituicaoService';

function maskCPF(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}
function maskTelefone(value) {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/g, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 15);
}

function formatarDataISO(dataString) {
  if (!dataString) return '';
  return dataString.split('T')[0]; 
}


export default function EdicaoUsuario() {
  const navigate = useNavigate();
  const { tipo, id } = useParams(); 
  const [nomeArquivo, setNomeArquivo] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false); 
  const [cursos, setCursos] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [form, setForm] = useState({
    nome: '',
    email: '',
    cpf: '',
    dt_nascimento: '',
    genero: '',
    telefone: '',
    endereco: '',
    bairro: '',
    numero: '',
    cidade: '',
    senha: '',
    turno: '',            
    id_curso: '',
    id_turma: '',
    dt_inicio: '',
    formacao: '',
    area_atuacao: '',
    dt_admissao: '',
    diploma: '',
  });

  // Carrega cursos ao montar
  useEffect(() => {
    const token = localStorage.getItem('token');
    async function carregarCursos() {
      try {
        const idInstituicao = localStorage.getItem('id_instituicao');
        if (!idInstituicao) return;
        const cursosData = await instituicaoService.buscarCursos(idInstituicao, token);
        setCursos(cursosData);
      } catch (error) {
        alert('Não foi possível carregar cursos.');
      }
    }
    carregarCursos();
  }, []);

  // Carrega turmas quando id_curso muda
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!form.id_curso) {
      setTurmas([]);
      setForm((prev) => ({ ...prev, id_turma: '', turno: '' }));
      return;
    }
    async function carregarTurmas() {
      try {
        const turmasData = await instituicaoService.buscarTurmasPorCurso(form.id_curso, token);
        setTurmas(turmasData);
      } catch {
        setTurmas([]);
        setForm((prev) => ({ ...prev, id_turma: '', turno: '' }));
        alert('Não foi possível carregar turmas.');
      }
    }
    carregarTurmas();
  }, [form.id_curso]);

  // Busca usuário para edição
useEffect(() => {
  async function fetchUsuario() {
    const token = localStorage.getItem('token');
    console.log("ID recebido:", id);
    console.log("TIPO recebido:", tipo, "→ Normalizado:", tipo);

    if (tipo === 'aluno') {
      const aluno = await instituicaoService.buscarAlunoPorId(id, token);
      setForm({
        ...aluno,
        cpf: maskCPF(aluno.cpf || ''),
        telefone: maskTelefone(aluno.telefone || ''),
        endereco: aluno.logradouro || '',
        senha: '',
        dt_nascimento: formatarDataISO(aluno.dt_nascimento),
        dt_inicio: formatarDataISO(aluno.dt_inicio),
      });
    } else if (tipo === 'professor') {
      const prof = await instituicaoService.buscarProfessorPorId(id, token);
      setForm({
        ...prof,
        cpf: maskCPF(prof.cpf || ''),
        telefone: maskTelefone(prof.telefone || ''),
        endereco: prof.logradouro || '',
        senha: '',
        dt_nascimento: formatarDataISO(prof.dt_nascimento),
        dt_admissao: formatarDataISO(prof.dt_admissao),
      });
      setNomeArquivo(prof.diploma || '');
    }
  }

  fetchUsuario();
}, [tipo, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'id_turma') {
      const turmaSelecionada = turmas.find((t) => String(t.idTurma) === value);
      const turnoDaTurma = turmaSelecionada ? turmaSelecionada.turno : '';
      setForm((prev) => ({
        ...prev,
        [name]: value,
        turno: turnoDaTurma,
      }));
      return;
    }
    setForm((prev) => ({
      ...prev,
      [name]:
        name === 'cpf'
          ? maskCPF(value)
          : name === 'telefone'
          ? maskTelefone(value)
          : value,
    }));
  };

  const handleTelefone = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: maskTelefone(value),
    }));
  };

  const handleArquivoSelecionado = (e) => {
    if (e.target.files.length > 0) {
      setNomeArquivo(e.target.files[0].name);
      setForm((prev) => ({
        ...prev,
        diploma: e.target.files[0].name,
      }));
    } else {
      setNomeArquivo('');
      setForm((prev) => ({
        ...prev,
        diploma: '',
      }));
    }
  };

    const handleCancelar = () => {
    if (tipo === 'PROFESSOR') {
        navigate('/professores');
    } else if (tipo === 'ALUNO') {
        navigate('/alunos');
    } else {
        navigate('/home-instituicao');
    }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const idInstituicao = localStorage.getItem('id_instituicao');
    try {
      if (tipo === 'aluno') {

        const dataAluno = {
          ...form,
          logradouro: form.endereco,
          id_curso: form.id_curso,
          id_turma: form.id_turma,
          dt_inicio: form.dt_inicio,
          turno: form.turno,
        };
        await instituicaoService.editarAluno(id, dataAluno, token);
        alert('Aluno editado com sucesso!');
        navigate('/home-instituicao');
      } else if (tipo === 'PROFESSOR') {
        const dataProfessor = {
          ...form,
          logradouro: form.endereco,
          formacao: form.formacao,
          diploma: form.diploma || nomeArquivo,
          turno: form.turno,
        };
        await instituicaoService.editarProfessor(idInstituicao, id, dataProfessor, token);
        alert('Professor editado com sucesso!');
        navigate('/home-instituicao');
      }
    } catch (error) {
      alert('Erro ao editar usuário: ' + JSON.stringify(error.response?.data || error));
    }
  };

  return (
    <Fundo>
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <h2 style={styles.titulo}>Edição de Usuário</h2>
          <form style={styles.formulario} onSubmit={handleSubmit}>
            {/* ========== LINHA 1 ========== */}
            <input
              name="nome"
              style={{ ...styles.input, backgroundColor: '#f0f0f0', cursor: 'not-allowed' }}
              placeholder="Nome"
              value={form.nome}
              disabled
              readOnly
            />
            <input
              name="email"
              type="email"
              style={styles.input}
              placeholder="E-mail"
              value={form.email}
              onChange={handleChange}
            />
            <input
              name="cpf"
              style={{ ...styles.input, backgroundColor: '#f0f0f0', cursor: 'not-allowed' }}
              placeholder="CPF"
              value={form.cpf}
              maxLength={14}
              disabled
              readOnly
            />
            {/* ========== LINHA 2 ========== */}
            <input
              name="dt_nascimento"
              type="text"
              placeholder="Data de Nascimento"
              value={form.dt_nascimento}
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => {
                if (!e.target.value) e.target.type = 'text';
              }}
              style={{ ...styles.input, backgroundColor: '#f0f0f0', cursor: 'not-allowed' }}
              disabled
              readOnly
            />
            <select
              name="genero"
              style={styles.input}
              value={form.genero}
              onChange={handleChange}
            >
              <option value="">Gênero</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="O">Outro</option>
            </select>
            <input
              name="telefone"
              style={styles.input}
              placeholder="Telefone"
              value={form.telefone}
              maxLength={15}
              onChange={handleTelefone}
            />
            <input
              name="endereco"
              style={styles.input}
              placeholder="Endereço"
              value={form.endereco}
              onChange={handleChange}
            />
            {/* ========== LINHA 3 ========== */}
            <input
              name="bairro"
              style={styles.input}
              placeholder="Bairro"
              value={form.bairro}
              onChange={handleChange}
            />
            <input
              name="numero"
              style={styles.input}
              placeholder="Número"
              value={form.numero}
              onChange={handleChange}
            />
            <input
              name="cidade"
              style={styles.input}
              placeholder="Cidade"
              value={form.cidade}
              onChange={handleChange}
            />
            <div style={styles.senhaContainer}>
              <input
                name="senha"
                type={mostrarSenha ? 'text' : 'password'}
                style={styles.input}
                placeholder="Senha Padrão"
                value={form.senha}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setMostrarSenha((prev) => !prev)}
                style={styles.olhinhoButton}
                aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {mostrarSenha ? <FiEyeOff size={20} color="#787878" /> : <FiEye size={20} color="#787878" />}
              </button>
            </div>

            {/* ========== CAMPOS PARA ALUNO ========== */}
            {tipo === 'ALUNO' && (
              <>
                <input
                  name="dt_inicio"
                  type="text"
                  placeholder="Data da Matrícula"
                  value={form.dt_inicio}
                  onFocus={(e) => (e.target.type = 'date')}
                  onBlur={(e) => {
                    if (!e.target.value) e.target.type = 'text';
                  }}
                  onChange={handleChange}
                  style={styles.input}
                />
                <select
                  name="id_curso"
                  style={styles.input}
                  value={form.id_curso}
                  onChange={handleChange}
                >
                  <option value="">Selecione o Curso</option>
                  {cursos.map((curso) => (
                    <option key={curso.idCurso} value={curso.idCurso}>
                      {curso.nome}
                    </option>
                  ))}
                </select>
                <select
                  name="id_turma"
                  style={styles.input}
                  value={form.id_turma}
                  onChange={handleChange}
                  disabled={!form.id_curso}
                >
                  <option value="">Selecione a Turma</option>
                  {turmas.map((turma) => (
                    <option key={turma.idTurma} value={turma.idTurma}>
                      {turma.nome}
                    </option>
                  ))}
                </select>
                <input
                  name="turno"
                  style={{ ...styles.input, backgroundColor: '#f0f0f0', cursor: 'not-allowed' }}
                  value={form.turno}
                  disabled
                  placeholder="Turno"
                />
              </>
            )}

            {tipo === 'PROFESSOR' && (
              <>
                <select
                  name="turno"
                  style={styles.input}
                  value={form.turno}
                  onChange={handleChange}
                >
                  <option value="">Turno</option>
                  <option value="MANHA">Manhã</option>
                  <option value="TARDE">Tarde</option>
                  <option value="NOITE">Noite</option>
                  <option value="INTEGRAL">Integral</option>
                </select>
                <div style={styles.grid3}>
                  <select
                    name="formacao"
                    style={styles.input}
                    value={form.formacao}
                    onChange={handleChange}
                  >
                    <option value="">Formação</option>
                    <option value="TECNICO">Técnico</option>
                    <option value="BACHAREL">Bacharel</option>
                    <option value="MESTRE">Mestre</option>
                    <option value="DOUTOR">Doutor</option>
                    <option value="LICENCIATURA">Licenciatura</option>
                  </select>
                  <input
                    name="area_atuacao"
                    style={styles.input}
                    placeholder="Área de Atuação"
                    value={form.area_atuacao}
                    onChange={handleChange}
                  />
                  <input
                    name="dt_admissao"
                    type="text"
                    placeholder="Data de Admissão"
                    value={form.dt_admissao}
                    onFocus={(e) => (e.target.type = 'date')}
                    onBlur={(e) => {
                      if (!e.target.value) e.target.type = 'text';
                    }}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>
                <div style={styles.fullWidth}>
                  <input
                    id="diploma"
                    name="diploma"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleArquivoSelecionado}
                  />
                  <label htmlFor="diploma" style={styles.inputFileLabel}>
                    <span
                      style={{
                        color: '#787878',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: 'calc(100% - 26px)',
                        flexShrink: 1,
                        minWidth: 0,
                        display: 'block',
                      }}
                    >
                      {nomeArquivo || 'Selecionar Diploma'}
                    </span>
                    <img
                      src={Upload}
                      alt="Upload Icon"
                      style={{ width: 18, height: 18, marginLeft: 8 }}
                    />
                  </label>
                </div>
              </>
            )}

            <div style={styles.botoesContainer}>
              <button
                type="button"
                style={styles.botaoCancelar}
                onClick={handleCancelar}
              >
                Cancelar
              </button>
              <button type="submit" style={styles.botaoEditar}>
                Editar
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
    alignItems: 'flex-start',
    minHeight: 'auto',
    paddingTop: '40px',
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
  titulo: {
    textAlign: 'center',
    color: '#002B65',
    marginBottom: '30px',
    fontFamily: 'Lexend, sans-serif',
  },
  formulario: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
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
    gridColumn: 'span 4',
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
  botaoEditar: {
    backgroundColor: '#27AE60',
    color: '#fff',
    border: 'none',
    padding: '12px 40px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontFamily: 'Lexend, sans-serif',
  },
  grid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    gridColumn: 'span 3',
  },
  fullWidth: {
    gridColumn: '1 / -1',
  },
  inputFileLabel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px',
    border: '1px solid #D9D9D9',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: 'transparent',
    color: '#787878',
    fontFamily: 'Lexend, sans-serif',
    width: '100%',
    boxSizing: 'border-box',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'background-color 0.2s ease',
    minWidth: 0,
  },
  senhaContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  olhinhoButton: {
    position: 'absolute',
    right: '12px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
  },
};
