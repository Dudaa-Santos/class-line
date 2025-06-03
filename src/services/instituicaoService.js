import { httpClient } from './apiService';

const loginInstituicao = async (email, senha) => {
  try {
    const response = await httpClient.post('/instituicao/auth/login', {
      email,
      senha
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const cadastrarProfessor = async (idInstituicao, data, token) => {
  try {
    const response = await httpClient.post(
      `/professor/${idInstituicao}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const cadastrarCurso = async (idInstituicao, data, token) => {
  try {
    console.log(idInstituicao, data, token);
    const response = await httpClient.post(
      `/curso/${idInstituicao}`,
      data,
      { 
        headers: { 
          Authorization: `Bearer ${token}` 
        } 
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const buscarCursos = async (idInstituicao, token) => {
    console.log('ID Instituição:', idInstituicao);

  const response = await httpClient.get(
    `/curso/instituicao/${idInstituicao}`,
    { 
      headers: { 
        Authorization: `Bearer ${token}` 
      } 
    }
  );
  console.log(response.data);
  return response.data;
};

const cadastrarTurma = async (idCurso, data, token) => {
  console.log(idCurso, data, token);
  const response = await httpClient.post(
    `/turma/${idCurso}`,
    data,
    { 
      headers: { 
        Authorization: `Bearer ${token}` 
      } 
    }
  );
  return response.data;
};

const buscarProfessores = async (idInstituicao, token) => {
  const response = await httpClient.get(
    `/professor/instituicao/${idInstituicao}`,
    { 
      headers: { 
        Authorization: `Bearer ${token}` 
      } 
    }
  );
  return response.data; 
};

const buscarTurmasPorCurso = async (idCurso, token) => {
  console.log(idCurso)
  const response = await httpClient.get(
    `/turma/curso/${idCurso}`,
    { 
      headers: { 
        Authorization: `Bearer ${token}` 
      } 
    }
  );
  console.log(response.data);
  return response.data;
};

const cadastrarAluno = async (idInstituicao, data, token) => {
  try {
    const response = await httpClient.post(
      `/aluno`,
      data,
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

const buscarAluno = async (idInstituicao, token) => {
  try {
    const response = await httpClient.get(
      `/aluno/instituicao/${idInstituicao}`,
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

const editarProfessor = async (idProfessor, idInstituicao, data, token) => {
  try {
    const response = await httpClient.put(
      `/professor/${idInstituicao}/${idProfessor}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const editarAluno = async (idAluno, data, token) => {
  try {
    const response = await httpClient.put(
      `/aluno/${idAluno}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const buscarTurmas = async (idInstituicao, token) => {
  console.log(idInstituicao)
  const response = await httpClient.get(
    `/turma/instituicao/${idInstituicao}`,
    { 
      headers: { 
        Authorization: `Bearer ${token}` 
      } 
    }
  );
  console.log(response.data);
  return response.data;
};


const instituicaoService = {
  loginInstituicao,
  cadastrarProfessor,
  cadastrarCurso,
  buscarCursos,
  cadastrarTurma,
  buscarProfessores,
  buscarTurmasPorCurso,
  cadastrarAluno,
  buscarAluno,
  editarProfessor,
  editarAluno,
  buscarTurmas
};

export default instituicaoService;
