import { httpClient } from './apiService';

const loginProfessor = async (cpf, senha) => {
  try {
    const response = await httpClient.post(
      '/professor/auth/login', 
    {
      cpf,
      senha
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const buscarProfessor = async (idProfessor, token) => {
  console.log(idProfessor)
  const response = await httpClient.get(
    `/professor/${idProfessor}`,
    { 
      headers: { 
        Authorization: `Bearer ${token}` 
      } 
    }
  );
  console.log(response.data);
  return response.data;
};

const buscarTurmaProfessor = async ( idProfessor, token) => {
  console.log( idProfessor)
  const response = await httpClient.get(
    `/turma/professor/${idProfessor}`,
    { 
      headers: { 
        Authorization: `Bearer ${token}` 
      } 
    }
  );
  console.log(response.data);
  return response.data;
};

const buscarDisciplinaTurma = async ( idTurma, token) => {
  const response = await httpClient.get(
    `/disciplina/turma/${idTurma}`,
    { 
      headers: { 
        Authorization: `Bearer ${token}` 
      } 
    }
  );
  console.log(response.data);
  return response.data;
};

const buscarDisciplinaProfessor = async ( idProfessor, token) => {
  const response = await httpClient.get(
    `/disciplina/professor/${idProfessor}`,
    { 
      headers: { 
        Authorization: `Bearer ${token}` 
      } 
    }
  );
  console.log(response.data);
  return response.data;
};

const buscarTurmaPorId = async (idTurma, token) => {
  const response = await httpClient.get(
    `/turma/${idTurma}`,
    { 
      headers: { 
        Authorization: `Bearer ${token}` 
      } 
    }
  );
  console.log(response.data);
  return response.data;
};

const buscarAlunoDisciplina = async (idDisciplina, token) => {
  try {
    const response = await httpClient.get(
      `/aluno/disciplina/${idDisciplina}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const lancarPresenca = async (idDisciplina, idProfessor, body, token) => {
  try {
    console.log("Lançando presença para disciplina:", idDisciplina, "e professor:", idProfessor);
    const response = await httpClient.post(
      `/frequencia/disciplina/${idDisciplina}/professor/${idProfessor}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const listaPresenca = async (idDisciplina, idProfessor, data, token) => {
  try {
    console.log("Dados:", {
        idDisciplina: idDisciplina,
        idProfessor: idProfessor,
        data: data,
        token: localStorage.getItem('token')
      });
    const response = await httpClient.get(
      `/frequencia/disciplina/${idDisciplina}/professor/${idProfessor}/data/${data}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const atualizarPresenca = async (idDisciplina, idProfessor, body, token) => {
  try {
    console.log("Lançando presença para disciplina:", idDisciplina, "e professor:", idProfessor, "e token:", token);
    const response = await httpClient.put(
      `/frequencia/disciplina/${idDisciplina}/professor/${idProfessor}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const buscarAluno = async (idTurma, token) => {
  try {
    const response = await httpClient.get(
      `/aluno/turma/${idTurma}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const inserirAvaliacao = async (idDisciplina, idProfessor, idTurma, body, token) => {
  try {
    const response = await httpClient.post(
      `/avaliacao/disciplina/${idDisciplina}/professor/${idProfessor}/turma/${idTurma}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const buscarAvaliacao = async (idDisciplina, idProfessor, idTurma, token) => {
  try {
    const response = await httpClient.get(
      `/avaliacao/disciplina/${idDisciplina}/professor/${idProfessor}/turma/${idTurma}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const lancarNotas = async (idAvaliacao, body, token) => {
  try {
    const response = await httpClient.post(
      `/nota/avaliacao/${idAvaliacao}/notas`,
      body,                                    
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const buscarNotas = async (idAvaliacao, token) => {
  try {
    const response = await httpClient.get(
      `/nota/avaliacao/${idAvaliacao}`,
      {
        headers: {  
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

const boletim = async (idAluno, token) => {
  try {
    const response = await httpClient.get(
      `/aluno/boletim/${idAluno}`,
      {
        headers: {  
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

const professorService = {
  loginProfessor,
  buscarProfessor,
  buscarTurmaProfessor,
  buscarDisciplinaTurma,
  buscarDisciplinaProfessor,
  buscarTurmaPorId,
  buscarAlunoDisciplina,
  lancarPresenca,
  listaPresenca,
  buscarAluno,
  atualizarPresenca,
  inserirAvaliacao,
  buscarAvaliacao,
  lancarNotas,
  buscarNotas,
  boletim
};

export default professorService;