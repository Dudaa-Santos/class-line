import React, { useState } from 'react';
import Fundo from '../../components/fundo'; 
import { useNavigate } from 'react-router-dom'; 

export default function CadastroCurso() {
  const [tipoCurso, setTipoCurso] = useState('');
  const [turnos, setTurnos] = useState('');
  const [semestres, setSemestres] = useState('');
  const navigate = useNavigate();

  const handleCancelar = () => {
    navigate('/home-instituicao');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Curso cadastrado com sucesso!');
  };

  return (
    <Fundo>
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <div style={styles.tituloContainer}>
            <h2 style={styles.titulo}>Cadastro de Curso</h2>
          </div>

          <form style={styles.formulario} onSubmit={handleSubmit}>
            {/* Linha 1 - Nome */}
            <input
              name="nome"
              style={{ ...styles.input, gridColumn: 'span 3' }}
              placeholder="Nome do Curso"
              required
            />

            {/* Linha 2 - Tipo de Curso, Turnos, Semestres */}
            <select
              name="tipoCurso"
              style={styles.input}
              value={tipoCurso}
              onChange={(e) => setTipoCurso(e.target.value)}
              required
            >
              <option value="">Tipo de Curso</option>
              <option value="GRADUACAO">Graduação</option>
              <option value="POSGRADUACAO">Pós-graduação</option>
              <option value="TECNOLOGO">Tecnólogo</option>
            </select>

            <select
              name="turnos"
              style={styles.input}
              value={turnos}
              onChange={(e) => setTurnos(e.target.value)}
              required
            >
              <option value="">Turnos Disponíveis</option>
              <option value="MANHA">Manhã</option>
              <option value="TARDE">Tarde</option>
              <option value="NOITE">Noite</option>
              <option value="INTEGRAL">Integral</option>
            </select>

            <select
              name="semestres"
              style={styles.input}
              value={semestres}
              onChange={(e) => setSemestres(e.target.value)}
              required
            >
              <option value="">Quantidade de Semestres</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>

            {/* Linha 3 - Observações */}
            <input
              name="observacoes"
              style={{ ...styles.input, gridColumn: 'span 3' }}
              placeholder="Observações"
            />

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
    maxWidth: '800px',
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
    gridTemplateColumns: '1.8fr 2.5fr 2.5fr',
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
