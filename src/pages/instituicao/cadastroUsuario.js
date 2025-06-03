import React, { useEffect, useState } from 'react';
import Fundo from '../../components/fundo-nav';
import { useNavigate } from 'react-router-dom';
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

export default function CadastroUsuario() {
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [nomeArquivo, setNomeArquivo] = useState('');
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
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  useEffect(() => {
    async function carregarCursos() {
      try {
        const idInstituicao = localStorage.getItem('id_instituicao');
        
        if (!idInstituicao) return;

        const cursosData = await instituicaoService.buscarCursos(idInstituicao, token);
        setCursos(cursosData);

      } catch (error) {
        console.error('Erro ao buscar listas de cursos:', error);
        alert('Não foi possível carregar cursos.');
      }
    }
    carregarCursos();
  }, []);

  useEffect(() => {
    if (!form.id_curso) {
      setTurmas([]);
      setForm((prev) => ({ ...prev, id_turma: "" }));
      return;
    }

    async function carregarTurmas() {
      try {
        const turmasData = await instituicaoService.buscarTurmas(form.id_curso, token);
        setTurmas(turmasData);
      } catch (error) {
        setTurmas([]);
        setForm((prev) => ({ ...prev, id_turma: "" }));
        alert("Não foi possível carregar turmas.");
      }
    }
    carregarTurmas();
  }, [form.id_curso]);

  const handleChange = (e) => {
    const { name, value } = e.target;
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

  const handleCPF = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'cpf' ? maskCPF(value) : value,
    }));
  };

  const handleTelefone = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'telefone' ? maskTelefone(value) : value,
    }));
  };

  const handleTipoUsuario = (e) => {
    setTipoUsuario(e.target.value);
    // Limpar campos específicos ao trocar de tipo
    setForm((prev) => ({
      ...prev,
      id_curso: '',
      id_turma: '',
      dt_inicio: '',
      formacao: '',
      area_atuacao: '',
      dt_admissao: '',
      diploma: '',
    }));
    setNomeArquivo('');
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
    navigate('/home-instituicao');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const idInstituicao = localStorage.getItem('id_instituicao');
    const token = localStorage.getItem('token');
    if (!idInstituicao) {
      alert('Instituição não encontrada!');
      return;
    }

    // Validação mínima de campos comuns
    if (!form.nome || !form.email || !form.cpf) {
      alert('Preencha pelo menos Nome, Email e CPF.');
      return;
    }

    if (tipoUsuario === 'ALUNO') {
      if (!form.id_curso) {
        alert('Selecione um curso.');
        return;
      }
      if (!form.id_turma) {
        alert('Selecione uma turma.');
        return;
      }
      if (!form.dt_inicio) {
        alert('Informe a data de matrícula.');
        return;
      }

      const dataAluno = {
        nome: form.nome,
        email: form.email,
        cpf: form.cpf,
        dt_nascimento: form.dt_nascimento,
        genero: form.genero,
        telefone: form.telefone,
        logradouro: form.endereco,
        bairro: form.bairro,
        numero: form.numero,
        cidade: form.cidade,
        senha: form.senha,
        turno: form.turno,
        id_curso: form.id_curso,           
        id_turma: form.id_turma,           
        dt_inicio: form.dt_inicio,
      };

      try {
        await instituicaoService.cadastrarAluno(idInstituicao, dataAluno, token);
        alert('Aluno cadastrado com sucesso!');
        navigate('/home-instituicao');
      } catch (error) {
        console.error('Erro ao cadastrar aluno:', error.response || error);
        alert('Erro ao cadastrar aluno: ' + JSON.stringify(error.response?.data || error));
      }
      return;
    }

    if (tipoUsuario === 'PROFESSOR') {
      if (!form.formacao || !form.area_atuacao || !form.dt_admissao) {
        alert('Preencha Formação, Área de Atuação e Data de Admissão.');
        return;
      }

      const dataProfessor = {
        nome: form.nome,
        email: form.email,
        cpf: form.cpf,
        dt_nascimento: form.dt_nascimento,
        genero: form.genero,
        telefone: form.telefone,
        logradouro: form.endereco,
        bairro: form.bairro,
        numero: form.numero,
        cidade: form.cidade,
        senha: form.senha,
        turno: form.turno,
        formacao: form.formacao,
        diploma: form.diploma || 'nenhum arquivo selecionado',
        dt_admissao: form.dt_admissao,
        area_atuacao: form.area_atuacao,
      };

      try {
        await instituicaoService.cadastrarProfessor(idInstituicao, dataProfessor, token);
        alert('Professor cadastrado com sucesso!');
        navigate('/home-instituicao');
      } catch (error) {
        console.error('Erro ao cadastrar professor:', error.response || error);
        alert('Erro ao cadastrar professor: ' + JSON.stringify(error.response?.data || error));
      }
      return;
    }

    alert('Selecione um tipo de usuário (Aluno ou Professor).');
  };

  return (
    <Fundo>
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <h2 style={styles.titulo}>Cadastro de Usuário</h2>
          <form style={styles.formulario} onSubmit={handleSubmit}>
            {/* ============== LINHA 1 ============== */}
            <input
              name="nome"
              style={styles.input}
              placeholder="Nome"
              value={form.nome}
              onChange={handleChange}
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
              style={styles.input}
              placeholder="CPF"
              value={form.cpf}
              maxLength={14}
              onChange={handleCPF}
            />

            {/* ============== LINHA 2 ============== */}
            <input
              name="dt_nascimento"
              type="text"
              placeholder="Data de Nascimento"
              value={form.dt_nascimento}
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => {
                if (!e.target.value) e.target.type = 'text';
              }}
              onChange={handleChange}
              style={styles.input}
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

            {/* ============== LINHA 3 ============== */}
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
            <input
              name="senha"
              type="password"
              style={styles.input}
              placeholder="Senha Padrão"
              value={form.senha}
              onChange={handleChange}
            />

            {/* ============== LINHA 4 ============== */}
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
            <select
              name="tipoUsuario"
              style={styles.input}
              value={tipoUsuario}
              onChange={handleTipoUsuario}
            >
              <option value="">Tipo Usuário</option>
              <option value="ALUNO">Aluno</option>
              <option value="PROFESSOR">Professor</option>
            </select>

            {tipoUsuario === 'ALUNO' && (
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
                  disabled={form.id_curso === ''} 
                >
                  <option value="">Selecione a Turma</option>
                  {turmas.map((turma) => (
                    <option key={turma.idTurma} value={turma.idTurma}>
                      {turma.nome}
                    </option>
                  ))}
                </select>

              </>
            )}

            {tipoUsuario === 'PROFESSOR' && (
              <>
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
};
