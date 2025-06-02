import React from 'react';

function FiltroAlunos({ filtros, setFiltros, cursosDisponiveis }) {
  return (
    <div style={styles.container}>
      <h3 style={styles.titulo}>Filtros</h3>

      <input
        type="text"
        placeholder="Matrícula"
        value={filtros.matricula}
        onChange={(e) => setFiltros({ ...filtros, matricula: e.target.value })}
        style={styles.input}
      />

      <input
        type="text"
        placeholder="Nome"
        value={filtros.nome}
        onChange={(e) => setFiltros({ ...filtros, nome: e.target.value })}
        style={styles.input}
      />

      <select
        value={filtros.curso}
        onChange={(e) => setFiltros({ ...filtros, curso: e.target.value })}
        style={styles.input}
      >
        <option value="">Curso</option>
        {cursosDisponiveis.map((curso, idx) => (
          <option key={idx} value={curso}>
            {curso}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FiltroAlunos;

const styles = {
    container: {
      backgroundColor: '#D9D9D9',
      padding: '16px',
      borderRadius: '10px',
      maxWidth: '250px',
      marginTop: '16px',
    },
    titulo: {
      marginBottom: '12px',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#001d3d',
    },
    input: {
      width: '100%',
      marginBottom: '12px',
      padding: '8px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      fontSize: '14px',
      color: '#787878'
    },
  };
  