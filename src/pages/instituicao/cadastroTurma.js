import React, { useState } from 'react';
import Fundo from '../../components/fundo'; 
import { useNavigate } from 'react-router-dom'; 

export default function CadastroTurma() {
  const [turno, setTurno] = useState('');
  const [curso, setCurso] = useState('');
  const navigate = useNavigate();

  const handleCancelar = () => {
    navigate('/home-instituicao');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Turma cadastrada com sucesso!');
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
            <input name="nome" style={styles.input} placeholder="Nome da Turma" required />

            <input
                name="dataInicio"
                type="text"
                placeholder="Data início"
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => {
                    if (!e.target.value) e.target.type = 'text';
                }}
                style={styles.input}
                required
            />

            <input
                name="dataFim"
                type="text"
                placeholder="Data fim"
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => {
                    if (!e.target.value) e.target.type = 'text';
                }}
                style={styles.input}
                required
            />


            {/* LINHA 2 */}
            <input name="observacoes" style={styles.input} placeholder="Observações" />

            <select
              name="turno"
              style={styles.input}
              value={turno}
              onChange={(e) => setTurno(e.target.value)}
              required
            >
              <option value="">Turno</option>
              <option value="MANHA">Manhã</option>
              <option value="TARDE">Tarde</option>
              <option value="NOITE">Noite</option>
            </select>

            <select
              name="curso"
              style={styles.input}
              value={curso}
              onChange={(e) => setCurso(e.target.value)}
              required
            >
              <option value="">Curso</option>
              <option value="ADMINISTRACAO">Administração</option>
              <option value="ENFERMAGEM">Enfermagem</option>
              <option value="ENGENHARIA">Engenharia</option>
            </select>

            {/* BOTOES */}
            <div style={styles.botoesContainer}>
              <button type="button" style={styles.botaoCancelar} onClick={handleCancelar}>Cancelar</button>
              <button type="submit" style={styles.botaoCadastrar}>Cadastrar</button>
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
    gridTemplateColumns: '2fr 1fr 1fr', 
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
    backgroundColor: '#FF7900',
    color: '#fff',
    border: 'none',
    padding: '12px 40px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontFamily: 'Lexend, sans-serif',
  },
  botaoCadastrar: {
    backgroundColor: '#1DAA55',
    color: '#fff',
    border: 'none',
    padding: '12px 40px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontFamily: 'Lexend, sans-serif',
  },
};
