import React, { useState } from 'react';
import Fundo from '../../components/fundo';

export default function CadastroUsuario() {
  const [tipoUsuario, setTipoUsuario] = useState('');

  return (
    <Fundo>
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <h2 style={styles.titulo}>Cadastro de Usuário</h2>
          <form style={styles.formulario}>
            <input style={styles.input} placeholder="Nome" />
            <input style={styles.input} placeholder="E-mail" />
            <input style={styles.input} placeholder="CPF" />

            <div style={styles.labelGroup}>
              <label style={styles.label}>Data de Nascimento</label>
              <input type="date" style={styles.input} />
            </div>
            <select style={styles.input}>
              <option value="">Gênero</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="O">Outro</option>
            </select>
            <input style={styles.input} placeholder="Telefone" />
            <input style={styles.input} placeholder="Endereço" />

            <input style={styles.input} placeholder="Bairro" />
            <input style={styles.input} placeholder="Número" />
            <input style={styles.input} placeholder="Cidade" />
            <input style={styles.input} placeholder="Senha Padrão" />

            <select
              style={styles.input}
              value={tipoUsuario}
              onChange={(e) => setTipoUsuario(e.target.value)}
            >
              <option value="">Tipo Usuário</option>
              <option value="ALUNO">Aluno</option>
              <option value="PROFESSOR">Professor</option>
            </select>

            <select style={styles.input}>
              <option>Turno</option>
            </select>

            {tipoUsuario === 'ALUNO' && (
              <>
                <select style={styles.input}>
                  <option>Curso</option>
                </select>
                <select style={styles.input}>
                  <option>Turma</option>
                </select>
              </>
            )}

            {tipoUsuario === 'PROFESSOR' && (
              <>
                <input style={styles.input} placeholder="Formação" />
                <input style={styles.input} placeholder="Área de Atuação" />
                <input type="file" style={styles.inputFile} />
              </>
            )}

            <div style={styles.botoesContainer}>
              <button type="button" style={styles.botaoCancelar}>Cancelar</button>
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
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: 'calc(100vh - 80px)',
    paddingTop: '40px',
  },
  container: {
    padding: '40px',
    width: '100%',
    maxWidth: '1200px',
    fontFamily: 'Lexend, sans-serif',
  },
  titulo: {
    textAlign: 'center',
    color: '#002B65',
    marginBottom: '30px',
    fontFamily: 'Lexend, sans-serif',
  },
  formulario: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    alignItems: 'center',
  },
  input: {
    padding: '14px',
    border: '1px solid #D9D9D9',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: 'transparent',
    color: '#787878',
    fontFamily: 'Lexend, sans-serif',
  },
  label: {
    fontSize: '14px',
    color: '#787878',
    fontFamily: 'Lexend, sans-serif',
    marginBottom: '4px',
  },
  labelGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputFile: {
    gridColumn: 'span 4',
    fontFamily: 'Lexend, sans-serif',
  },
  botoesContainer: {
    gridColumn: 'span 4',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '30px',
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
