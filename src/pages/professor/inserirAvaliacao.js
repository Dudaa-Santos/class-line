import React, { useState, useEffect } from 'react';
import Fundo from '../../components/fundo-nav';
import professorService from '../../services/professorService';
import { useParams } from 'react-router-dom';

function InserirAvaliacao() {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [form, setForm] = useState({
    tipo: '',
    nome: '',
    peso: '',
    data: '',
  });

  const { idTurma, idDisciplina } = useParams();
  const idProfessor = localStorage.getItem('id_professor');
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function carregarAvaliacoes() {
      try {
        console.log("Buscando avaliações com:");
        console.log("idTurma:", idTurma);
        console.log("idDisciplina:", idDisciplina);
        console.log("idProfessor:", idProfessor);
        console.log("token:", token);

        const avaliacoesAPI = await professorService.buscarAvaliacao(
          idDisciplina,
          idProfessor,
          idTurma,
          token
        );

        console.log("Avaliações recebidas:", avaliacoesAPI);
        setAvaliacoes(avaliacoesAPI || []);
      } catch (err) {
        console.error("Erro ao buscar avaliações:", err);
        alert("Erro ao carregar avaliações.");
      }
    }

    if (idTurma && idDisciplina && idProfessor && token) {
      carregarAvaliacoes();
    }
  }, [idTurma, idDisciplina, idProfessor, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdicionar = async (e) => {
    e.preventDefault();

    console.log("Dados do formulário:", form);
    console.log("idTurma:", idTurma);
    console.log("idDisciplina:", idDisciplina);
    console.log("idProfessor:", idProfessor);
    console.log("token:", token);

    if (!form.tipo || !form.nome || !form.peso || !form.data) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      const dadosParaEnviar = {
        ...form,
        idTurma,
        idDisciplina,
        idProfessor
      };

      await professorService.inserirAvaliacao(dadosParaEnviar);
      setAvaliacoes((prev) => [...prev, dadosParaEnviar]);
      setForm({ tipo: '', nome: '', peso: '', data: '' });
    } catch (error) {
      console.error('Erro ao inserir avaliação:', error);
      alert('Erro ao inserir avaliação!');
    }
  };

  const handleCancelar = () => {
    window.history.back();
  };

  const handleFinalizar = () => {
    alert('Avaliações salvas com sucesso!');
  };

  const formatarTipo = (tipo) => {
    switch (tipo) {
      case 'PROVA': return 'Prova';
      case 'TRABALHO': return 'Trabalho';
      case 'SIMULADO': return 'Simulado';
      default: return tipo;
    }
  };

  return (
    <Fundo>
      <div style={styles.wrapper}>
        <h2 style={styles.titulo}>Inserir Avaliação</h2>

        <form style={styles.formulario} onSubmit={handleAdicionar}>
          <select name="tipo" value={form.tipo} onChange={handleChange} style={styles.input} required>
            <option value="">Tipo Avaliação</option>
            <option value="PROVA">Prova</option>
            <option value="TRABALHO">Trabalho</option>
            <option value="SIMULADO">Simulado</option>
          </select>
          <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} style={styles.input} required />
          <input name="peso" placeholder="Peso" type="number" value={form.peso} onChange={handleChange} style={styles.input} required />
          <input name="data" type="date" value={form.data} onChange={handleChange} style={styles.input} required />
          <button type="submit" style={styles.botaoAdicionar}>+</button>
        </form>

        <div style={styles.tabelaContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Tipo Avaliação</th>
                <th style={styles.th}>Nome</th>
                <th style={styles.th}>Peso</th>
                <th style={styles.th}>Data Aplicação</th>
              </tr>
            </thead>
            <tbody>
              {avaliacoes.map((item, idx) => (
                <tr key={idx}>
                  <td style={styles.td}>{formatarTipo(item.tipo)}</td>
                  <td style={styles.td}>{item.nome}</td>
                  <td style={styles.td}>{item.peso}</td>
                  <td style={styles.td}>{item.data}</td>
                </tr>
              ))}
              {avaliacoes.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                    Nenhuma avaliação adicionada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div style={styles.botoesContainer}>
          <button style={styles.botaoCancelar} onClick={handleCancelar}>Cancelar</button>
          <button style={styles.botaoCadastrar} onClick={handleFinalizar}>Finalizar</button>
        </div>
      </div>
    </Fundo>
  );
}

export default InserirAvaliacao;

const styles = {
  wrapper: {
    minHeight: '100vh',
    padding: '30px 40px',
    fontFamily: 'Lexend, sans-serif',
    backgroundColor: '#f6f6f6',
  },
  titulo: {
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#002B65',
    marginBottom: '24px',
  },
  formulario: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr) auto',
    gap: '14px',
    marginBottom: '24px',
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
  },
  input: {
    padding: '14px',
    borderRadius: '8px',
    border: '1px solid #D9D9D9',
    fontSize: '14px',
  },
  botaoAdicionar: {
    backgroundColor: '#27AE60',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '42px',
    height: '42px',
    fontSize: '28px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  tabelaContainer: {
    maxHeight: '44vh',
    overflowY: 'auto',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 8px rgba(0,0,0,0.05)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: '#D9D9D9',
    padding: '14px',
    fontWeight: 600,
    fontSize: '15px',
  },
  td: {
    padding: '14px',
    fontSize: '14px',
    borderTop: '1px solid #eee',
  },
  botoesContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '24px',
    marginTop: '32px',
  },
  botaoCancelar: {
    backgroundColor: '#FD750D',
    color: '#fff',
    border: 'none',
    padding: '12px 40px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  botaoCadastrar: {
    backgroundColor: '#27AE60',
    color: '#fff',
    border: 'none',
    padding: '12px 40px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};
