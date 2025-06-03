import React, { useState } from 'react';
import Fundo from '../../components/fundo-nav';
import { useNavigate } from 'react-router-dom';
import instituicaoService from '../../services/instituicaoService';

export default function CadastroCurso() {
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    qtde_semestres: '',
    tipo: '',
  });
  const navigate = useNavigate();

  const handleCancelar = () => {
    navigate('/home-instituicao');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const idInstituicao = localStorage.getItem('id_instituicao');
    // const idInstituicao = usuario ? JSON.parse(usuario).id : null;
    const token = localStorage.getItem('token');

    if (!idInstituicao || !token) {
      alert('Instituição ou token não encontrado!');
      return;
    }

    const data = {
      nome: form.nome,
      descricao: form.descricao,
      qtde_semestres: Number(form.qtde_semestres),
      tipo: form.tipo,
    };

    try {
      const response = await instituicaoService.cadastrarCurso(idInstituicao, data, token)
      console.log(response);
      alert('Curso cadastrado com sucesso!');
      navigate('/home-instituicao');
    } catch (error) {
      alert('Erro ao cadastrar curso: ' + (JSON.stringify(error.response.data)));
    }
  };

  return (
    <Fundo>
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <div style={styles.tituloContainer}>
            <h2 style={styles.titulo}>Cadastro de Curso</h2>
          </div>

          <form style={styles.formulario} onSubmit={handleSubmit}>
            {/* Linha 1 - Nome e Descrição */}
            <input
              name="nome"
              style={{ ...styles.input, gridColumn: 'span 2' }}
              placeholder="Nome do Curso"
              value={form.nome}
              onChange={handleChange}
              required
            />
            <input
              name="descricao"
              style={{ ...styles.input, gridColumn: 'span 2' }}
              placeholder="Descrição do Curso"
              value={form.descricao}
              onChange={handleChange}
              required
            />

            {/* Linha 2 - Tipo e Qtde Semestres */}
            <select
              name="tipo"
              style={styles.input}
              value={form.tipo}
              onChange={handleChange}
              required
            >
              <option value="">Tipo de Curso</option>
              <option value="TECNICO">Técnico</option>
              <option value="BACHARELADO">Bacharelado</option>
              <option value="POSGRADUACAO">Pós-graduação</option>
              <option value="MESTRADO">Mestrado</option>
              <option value="DOUTORADO">Doutorado</option>
              <option value="LICENCIATURA">Licenciatura</option>
              <option value="EXTENSAO">Extensão</option>
            </select>
            
            <select
              name="qtde_semestres"
              style={styles.input}
              value={form.qtde_semestres}
              onChange={handleChange}
              required
            >
              <option value="">Qtd. de Semestres</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>

            {/* Botões */}
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
