import React, { useState } from 'react';
import Fundo from '../../components/fundo-nav';
import { useNavigate } from 'react-router-dom';
import instituicaoService from '../../services/instituicaoService';

export default function CadastroDisciplina() {
  const [form, setForm] = useState({
    nome: '',
    carga_horaria: '',
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
    const token = localStorage.getItem('token');
    const idInstituicao = localStorage.getItem('id_instituicao');
        if (!token || !idInstituicao) {
            alert('Token ou instituição não encontrado!');
            return;
        }

        const data = {
            nome: form.nome,
            carga_horaria: Number(form.carga_horaria),
        };

        try {
            await instituicaoService.cadastrarDisciplina(idInstituicao, data, token);
            alert('Disciplina cadastrada com sucesso!');
            setForm({
            nome: '',
            carga_horaria: '',
            });
        } catch (error) {
            if (error.response) {
            alert('Erro ao cadastrar disciplina: ' + (JSON.stringify(error.response.data) || error.message));
            } else if (error.request) {
            alert('Erro ao cadastrar disciplina: Nenhuma resposta do servidor.');
            } else {
            alert('Erro ao cadastrar disciplina: ' + error.message);
            }
        }
    };

  return (
    <Fundo>
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <div style={styles.tituloContainer}>
            <h2 style={styles.titulo}>Cadastro de Disciplina</h2>
          </div>
          <form style={styles.formulario} onSubmit={handleSubmit}>
            <input
              name="nome"
              style={{ ...styles.input, gridColumn: 'span 2' }}
              placeholder="Nome da Disciplina"
              value={form.nome}
              onChange={handleChange}
              required
            />
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
