import React from "react";
import Fundo from "../../components/fundo-nav";

function Home() {
  const turmas = [
    { nome: "ADS-2025-1", cor: "#4B9EFF" },
    { nome: "ADS-2025-2", cor: "#36B76C" },
    { nome: "SI - 2025", cor: "#F4B43E" },
    { nome: "ENG - SOFT 2025", cor: "#A186E8" },
    { nome: "CT-DS - 2025", cor: "#28C3B4" },
  ];

  return (
    <Fundo>
      <div style={styles.content}>
        <h2 style={styles.saudacao}>Olá, Professor Usuário!</h2>
        <span style={styles.programacao}>Programação</span>
        <h2 style={styles.tituloTurmas}>Minhas Turmas</h2>
        <div style={styles.turmasContainer}>
          {turmas.map((turma, idx) => (
            <div
              key={idx}
              style={{
                ...styles.turmaCard,
                background: `linear-gradient(0deg, #fff 65%, ${turma.cor} 35%)`,
              }}
            >
              <div
                style={{
                  ...styles.turmaNome,
                  background: turma.cor,
                  color: "#fff",
                }}
              >
                {turma.nome}
              </div>
              <button style={styles.botaoVerMais}>Ver Mais</button>
            </div>
          ))}
        </div>
      </div>
    </Fundo>
  );
}

export default Home;


const styles = {
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 24px 0 24px',
  },
  saudacao: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#092851',
    marginBottom: 0,
    marginTop: '24px',
  },
  programacao: {
    fontSize: '1.1rem',
    color: '#466190',
    marginTop: '8px',
    display: 'inline-block',
    marginBottom: '30px',
  },
  tituloTurmas: {
    marginTop: '48px',
    marginBottom: '24px',
    fontSize: '1.6rem',
    color: '#092851',
    fontWeight: 'bold',
  },
  turmasContainer: {
    display: 'flex',
    gap: '28px',
    flexWrap: 'wrap',
  },
  turmaCard: {
    width: '200px',
    minHeight: '160px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px #0001',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    background: '#fff',
    transition: 'transform 0.2s',
    marginBottom: '24px',
  },
  turmaNome: {
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.35rem',
    padding: '24px 0 22px 0',
    borderRadius: '12px 12px 0 0',
    letterSpacing: 0.5,
  },
  botaoVerMais: {
    margin: '20px 0 18px 0',
    border: '1px solid #bbb',
    background: 'white',
    color: '#14213d',
    fontSize: '1rem',
    padding: '8px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.2s, color 0.2s',
    boxShadow: '0 2px 6px #0001',
  },
};
