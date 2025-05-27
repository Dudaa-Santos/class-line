import React, { useState } from 'react';
import Fundo from '../../components/fundo'; 
import { useNavigate } from 'react-router-dom'; 
import Upload from '../../img/sem-preenchimento/upload-icon.png';

export default function CadastroUsuario() {
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [nomeArquivo, setNomeArquivo] = useState('');
  const navigate = useNavigate();

  const handleCancelar = () => {
    navigate('/home-instituicao');
  };

  const handleArquivoSelecionado = (e) => {
    if (e.target.files.length > 0) {
      setNomeArquivo(e.target.files[0].name);
    } else {
      setNomeArquivo('');
    }
  };

  return (
    <Fundo>
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <h2 style={styles.titulo}>Cadastro de Usuário</h2>
          <form style={styles.formulario}>
            {/* LINHA 1 */}
            <input name="nome" style={styles.input} placeholder="Nome" />
            <input name="email" style={styles.input} placeholder="E-mail" />
            <input name="cpf" style={styles.input} placeholder="CPF" />

            {/* LINHA 2 */}
            <input
              name="dataNascimento"
              type="text"
              placeholder="Data de Nascimento"
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => {
                if (!e.target.value) e.target.type = 'text';
              }}
              style={styles.input}
            />
            <select name="genero" style={styles.input}>
              <option value="">Gênero</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="O">Outro</option>
            </select>
            <input name="telefone" style={styles.input} placeholder="Telefone" />
            <input name="endereco" style={styles.input} placeholder="Endereço" />

            {/* LINHA 3 */}
            <input name="bairro" style={styles.input} placeholder="Bairro" />
            <input name="numero" style={styles.input} placeholder="Número" />
            <input name="cidade" style={styles.input} placeholder="Cidade" />
            <input name="senhaPadrao" style={styles.input} placeholder="Senha Padrão" />

            {/* LINHA 4 */}
            <select name="turno" style={styles.input}>
              <option>Turno</option>
            </select>

            <select
              name="tipoUsuario"
              style={styles.input}
              value={tipoUsuario}
              onChange={(e) => setTipoUsuario(e.target.value)}
            >
              <option value="">Tipo Usuário</option>
              <option value="ALUNO">Aluno</option>
              <option value="PROFESSOR">Professor</option>
            </select>

            {tipoUsuario === 'ALUNO' && (
              <div style={styles.grid2}> 
                <select name="curso" style={styles.input}>
                  <option>Curso</option>
                </select>
                <select name="turma" style={styles.input}>
                  <option>Turma</option>
                </select>
              </div>
            )}

            {tipoUsuario === 'PROFESSOR' && (
              <div style={styles.grid3}>
                <input name="formacao" style={styles.input} placeholder="Formação" />
                <input name="areaAtuacao" style={styles.input} placeholder="Área de Atuação" />
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
                  <img src={Upload} alt="Upload Icon" style={{ width: 18, height: 18, marginLeft: 8 }} />
                </label>
              </div>
            )}

            <div style={styles.botoesContainer}>
              <button type="button" style={styles.botaoCancelar} onClick={handleCancelar}> Cancelar </button>
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
  inputFile: {
    gridColumn: 'span 4',
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
  grid2: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    gridColumn: 'span 3',
  },
  grid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    gridColumn: 'span 3',
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
