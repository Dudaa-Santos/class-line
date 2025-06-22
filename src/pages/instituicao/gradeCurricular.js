import React, { useEffect, useState } from 'react';
import Fundo from '../../components/fundo-nav';
import { useNavigate, useParams } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import instituicaoService from '../../services/instituicaoService';

function GerenciarGradesCurriculares() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [semestres, setSemestres] = useState([]);
  const [turma, setTurma] = useState({});
  const [itens, setItens] = useState([]);
  const [form, setForm] = useState({
    disciplina: '',
    professor: '',
    semestre: '',
    carga_horaria: '',
  });

  const { idTurma } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarDados() {
      const token = localStorage.getItem('token');
      const idInstituicao = localStorage.getItem('id_instituicao');
      try {
        const turmaResp = await instituicaoService.buscarTurmaPorId(idTurma, token);
        setTurma(turmaResp);
        const listaDisciplinas = await instituicaoService.buscarDisciplina(idInstituicao, token);
        const disciplinasNormalizadas = (listaDisciplinas || []).map(d => ({
          idDisciplina: d.idDisciplina ?? d.id_disciplina ?? d.id,
          nome: d.nome ?? d.nome_disciplina ?? d.nomeDisciplina,
          carga_horaria: d.carga_horaria ?? d.cargaHoraria,
        }));
        setDisciplinas(disciplinasNormalizadas);
        const listaProfessores = await instituicaoService.buscarProfessores(idInstituicao, token);
        const professoresNormalizados = (listaProfessores || []).map(p => ({
          idProfessor: p.idProfessor ?? p.id_professor ?? p.id,
          nome: p.nome ?? p.nome_professor ?? p.nomeProfessor,
        }));
        setProfessores(professoresNormalizados);
      } catch (error) {
        alert("Erro ao carregar dados. Verifique sua conexão ou tente novamente.");
      }
    }
    carregarDados();
  }, [idTurma]);

  useEffect(() => {
    async function buscarSemestres() {
      const token = localStorage.getItem('token');
      if (turma.idGrade) {
        try {
          const listaSemestres = await instituicaoService.buscarSemestres(turma.idGrade, token);
          const semestresNormalizados = (listaSemestres || []).map(s => ({
            idSemestre: s.idSemestre ?? s.id_semestre ?? s.id,
            semestre: s.semestre ?? s.nome ?? s.nome_semestre,
          }));
          setSemestres(semestresNormalizados);
        } catch {}
      }
    }
    buscarSemestres();
  }, [turma.idGrade]);

  useEffect(() => {
    async function carregarDisciplinasExistentes() {
      const token = localStorage.getItem('token');
      if (idTurma && token) {
        try {
          const disciplinasDaTurma = await instituicaoService.buscarDisciplinasSemestres(idTurma, token);
          const itensFormatados = (disciplinasDaTurma || []).map(item => ({
            disciplina: { idDisciplina: item.id_disciplina ?? item.idDisciplina, nome: item.nome_disciplina ?? item.nomeDisciplina },
            professor: { idProfessor: item.id_professor ?? item.idProfessor, nome: item.nome_professor ?? item.nomeProfessor },
            semestre: item.nome_semestre ?? item.semestre ?? item.nome,
            idDisciplina: item.id_disciplina ?? item.idDisciplina,
            idProfessor: item.id_professor ?? item.idProfessor,
            idSemestre: item.id_semestre ?? item.idSemestre,
            carga_horaria: item.carga_horaria ?? item.cargaHoraria,
          }));
          setItens(itensFormatados);
        } catch {
          alert('Erro ao carregar disciplinas existentes. Tente novamente.');
        }
      }
    }
    carregarDisciplinasExistentes();
  }, [idTurma]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'disciplina') {
      const disciplinaSelecionada = disciplinas.find((d) => String(d.idDisciplina) === value);
      setForm((prev) => ({
        ...prev,
        disciplina: value,
        carga_horaria: disciplinaSelecionada ? disciplinaSelecionada.carga_horaria : '',
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAdicionar = async (e) => {
    e.preventDefault();
    if (!form.disciplina || !form.professor || !form.semestre) {
      alert('Preencha todos os campos!');
      return;
    }
    const disciplinaObj = disciplinas.find((d) => String(d.idDisciplina) === form.disciplina);
    const professorObj = professores.find((p) => String(p.idProfessor) === form.professor);
    const semestreObj = semestres.find((s) => String(s.idSemestre) === form.semestre);
    if (!disciplinaObj || !professorObj || !semestreObj) {
      alert('Erro: Disciplina, Professor ou Semestre selecionados são inválidos. Tente novamente.');
      return;
    }
    const token = localStorage.getItem('token');
    
    const itemExistente = itens.find(item =>
      item.idDisciplina === disciplinaObj.idDisciplina &&
      item.idSemestre === semestreObj.idSemestre
    );
    if (itemExistente) {
      alert('Esta disciplina já foi adicionada para este semestre!');
      return;
    }
    try {
      console.log("Enviando:", {
        idDisciplina: disciplinaObj.idDisciplina,
        idSemestre: semestreObj.idSemestre,
        idProfessor: professorObj.idProfessor,
      });
      await instituicaoService.cadastrarDisciplinaSemestre(
        disciplinaObj.idDisciplina,
        semestreObj.idSemestre,
        professorObj.idProfessor,
        token
      );

      alert('Disciplina adicionada com sucesso!');
      setItens((prev) => [
        ...prev,
        {
          disciplina: disciplinaObj,
          professor: professorObj,
          semestre: semestreObj?.semestre || form.semestre,
          idDisciplina: disciplinaObj?.idDisciplina,
          idProfessor: professorObj?.idProfessor,
          idSemestre: semestreObj?.idSemestre,
          carga_horaria: form.carga_horaria,
        },
      ]);
    } catch (err) {
      alert(`Erro ao adicionar disciplina: ${err.message || 'Erro desconhecido'}\nDetalhes: ${err.response?.data?.message || 'Nenhum detalhe adicional.'}`);
    }
    setForm({ disciplina: '', professor: '', semestre: '', carga_horaria: '' });
  };

  const handleRemover = async (idx) => {
    const item = itens[idx];
    const token = localStorage.getItem('token');
    if (!window.confirm(`Tem certeza que deseja remover a disciplina "${item.disciplina?.nome}" do semestre "${item.semestre}"?`)) {
      return;
    }
    try {
      await instituicaoService.deletarDisciplinaSemestre(
        item.idDisciplina,
        item.idSemestre,
        item.idProfessor,
        token
      );
      setItens((prev) => prev.filter((_, i) => i !== idx));
      alert('Disciplina removida com sucesso!');
    } catch (err) {
      alert(`Erro ao remover disciplina: ${err.message || 'Erro desconhecido'}\nDetalhes: ${err.response?.data?.message || 'Nenhum detalhe adicional.'}`);
    }
  };

  const handleEditar = (item) => {
    console.log("Editar item:", item);
    navigate(`/disciplinasemestre/trocar-professor/${idTurma}/${item.idDisciplina}/${item.idSemestre}`);
  };

  const handleCancelar = () => {
    navigate('/turmas');
  };

  const handleFinalizar = async () => {
    alert('Operação de finalizar (se houver) já foi realizada disciplina por disciplina. Redirecionando...');
    navigate('/turmas');
  };

  return (
    <Fundo>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <h2 style={styles.titulo}>Gerenciar Grades Curriculares</h2>
        </div>
        <form style={styles.formulario} onSubmit={handleAdicionar}>
          <select
            name="disciplina"
            style={styles.input}
            value={form.disciplina}
            onChange={handleChange}
            required
          >
            <option value="">Nome da Disciplina</option>
            {disciplinas.map((d) => (
              <option key={d.idDisciplina} value={d.idDisciplina}>
                {d.nome
                  ?? d.nome_disciplina
                  ?? (d.disciplina?.nome)
                  ?? (d.disciplina?.nome_disciplina)
                  ?? '---'}
              </option>
            ))}
          </select>
          <select
            name="professor"
            style={styles.input}
            value={form.professor}
            onChange={handleChange}
            required
          >
            <option value="">Professor</option>
            {professores.map((p) => (
              <option key={p.idProfessor} value={p.idProfessor}>{p.nome}</option>
            ))}
          </select>
          <select
            name="semestre"
            style={styles.input}
            value={form.semestre}
            onChange={handleChange}
            required
            disabled={semestres.length === 0}
          >
            <option value="">Semestre</option>
            {semestres.map((s) => (
              <option key={s.idSemestre} value={s.idSemestre}>{s.semestre}</option>
            ))}
          </select>
          <input
            name="carga_horaria"
            style={{
              ...styles.input,
              backgroundColor: '#f5f5f5',
              cursor: 'not-allowed',
            }}
            placeholder="Carga Horária"
            value={form.carga_horaria}
            disabled
          />
          <button type="submit" style={styles.botaoAdicionar}>
            +
          </button>
        </form>
        <div style={styles.tabelaContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Nome da Disciplina</th>
                <th style={styles.th}>Professor</th>
                <th style={styles.th}>Semestre</th>
                <th style={styles.th}>Carga Horária</th>
                <th style={styles.thAcoes}>Ações</th>
              </tr>
            </thead>
            <tbody>
            {itens
              .filter(item =>
                !(
                  item.disciplina?.status &&
                  item.disciplina.status.toString().toUpperCase() === 'INATIVO'
                )
              )
              .map((item, idx) => (
                <tr key={idx}>
                  <td style={styles.td}>{item.disciplina?.nome}</td>
                  <td style={styles.td}>{item.professor?.nome}</td>
                  <td style={styles.td}>{item.semestre}</td>
                  <td style={styles.td}>{item.carga_horaria}</td>
                  <td style={styles.tdAcoes}>
                    <FaEdit
                      style={{ ...styles.iconeAcao, color: '#FFB703' }}
                      size={22}
                      onClick={() => handleEditar(item)}
                      title="Editar"
                    />
                    <FaTrash
                      style={{ ...styles.iconeAcao, color: '#ff0000' }}
                      size={22}
                      onClick={() => handleRemover(idx)}
                      title="Excluir"
                    />
                  </td>
                </tr>
              ))
            }
            {
              itens.filter(item =>
                !(item.disciplina?.status &&
                  item.disciplina.status.toString().toUpperCase() === 'INATIVO')
              ).length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', color: '#999', padding: '24px 0' }}>
                    Nenhuma disciplina adicionada.
                  </td>
                </tr>
              )
            }
          </tbody>
          </table>
        </div>
        <div style={styles.botoesContainer}>
          <button type="button" style={styles.botaoCancelar} onClick={handleCancelar}>
            Cancelar
          </button>
          <button type="button" style={styles.botaoCadastrar} onClick={handleFinalizar}>
            Finalizar
          </button>
        </div>
      </div>
    </Fundo>
  );
}

export default GerenciarGradesCurriculares;

const styles = {
  wrapper: {
    minHeight: '100vh',
    padding: '30px 40px',
    fontFamily: 'Lexend, sans-serif',
    position: 'relative',
    backgroundColor: '#f6f6f6',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    position: 'relative',
  },
  titulo: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#002B65',
    margin: 0,
  },
  filtroOverlay: {
    position: 'absolute',
    top: '60px',
    left: '30px',
    zIndex: 10,
  },
  tabelaContainer: {
    maxHeight: '44vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 0 8px rgba(0,0,0,0.05)',
    marginTop: '24px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
  },
  th: {
    textAlign: 'left',
    backgroundColor: '#D9D9D9',
    padding: '14px',
    fontWeight: 600,
    fontSize: '15px',
    color: '#222',
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  td: {
    padding: '14px 16px',
    fontSize: '14px',
    color: '#333',
    borderTop: '1px solid #eee',
  },
  tdAcoes: {
    padding: '14px 16px',
    fontSize: '14px',
    color: '#333',
    borderTop: '1px solid #eee',
    textAlign: 'center',
  },
  thAcoes: {
    textAlign: 'center',
    backgroundColor: '#D9D9D9',
    padding: '14px',
    fontWeight: 600,
    fontSize: '15px',
    color: '#222',
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  iconeAcao: {
    cursor: 'pointer',
    margin: '0 5px',
    verticalAlign: 'middle',
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
    fontFamily: 'Lexend, sans-serif',
  },
  botaoCadastrar: {
    backgroundColor: '#27AE60',
    color: '#fff',
    border: 'none',
    padding: '12px 40px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontFamily: 'Lexend, sans-serif',
  },
  formulario: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr) auto',
    gap: '14px',
    alignItems: 'center',
    maxWidth: '90%',
    margin: '0 auto 24px auto',
    background: '#fff',
    borderRadius: '10px',
    padding: '18px 24px',
    boxShadow: '0 0 8px rgba(0,0,0,0.04)',
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
    alignSelf: 'center',
    justifySelf: 'center',
  },
};