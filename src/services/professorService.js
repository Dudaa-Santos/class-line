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
  console.log( idTurma)
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

const professorService = {
  loginProfessor,
  buscarProfessor,
  buscarTurmaProfessor,
  buscarDisciplinaTurma,
  buscarTurmaPorId
};

export default professorService;