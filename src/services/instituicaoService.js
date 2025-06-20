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

const cadastrarDisciplina = async (idInstituicao, data, token) => {
  try {
  const response = await httpClient.post(
    `/disciplina/${idInstituicao}`,
    data,
    { 
      headers: { 
        Authorization: `Bearer ${token}` 
      } 
    }
  ); 
  return response.data;
  } catch (error) {
    console.log(error)
    throw error;
  }
};

const buscarCursos = async (idInstituicao, token) => {
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

const buscarTurmas = async (idInstituicao, token) => {
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

const buscarCursoPorId = async (idCurso, token) => {
  const response = await httpClient.get(
    `/curso/${idCurso}`,
    { 
      headers: { 
        Authorization: `Bearer ${token}` 
      } 
    }
  );
  console.log(response.data);
  return response.data;
};

const buscarDisciplina = async (idInstituicao, token) => {
  const response = await httpClient.get(
    `/disciplina/instituicao/${idInstituicao}`,
    { 
      headers: { 
        Authorization: `Bearer ${token}` 
      } 
    }
  );
  console.log(response.data);
  return response.data;
};

const buscarSemestres = async (idGrade, token) => {
  const response = await httpClient.get(
    `/semestre/${idGrade}`,
    { 
      headers: { 
        Authorization: `Bearer ${token}` 
      } 
    }
  );
  console.log(response.data);
  return response.data;
};

const buscarDisciplinasSemestres = async (idTurma, token) => {
  const response = await httpClient.get(
    `/disciplinasemestre/turma/${idTurma}`,
    { 
      headers: { 
        Authorization: `Bearer ${token}` 
      } 
    }
  );
  console.log(response.data);
  return response.data;
};

const cadastrarDisciplinaSemestre = async (idDisciplina, idSemestre, idProfessor, token) => {
  try {
    const response = await httpClient.post(
      `/disciplinasemestre/disciplina/${idDisciplina}/semestre/${idSemestre}/professor/${idProfessor}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deletarDisciplinaSemestre = async (idDisciplina, idSemestre, idProfessor, token) => {
  const response = await httpClient.delete(
    `/disciplinasemestre/disciplina/${idDisciplina}/semestre/${idSemestre}/professor/${idProfessor}/inativar`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  );
  return response.data;
};

const editarDisciplinaSemestre = async (idDisciplina, idSemestre, idProfessor, token) => {
  const response = await httpClient.put(
    `/disciplinasemestre/disciplina/${idDisciplina}/semestre/${idSemestre}/professor/${idProfessor}/inativar`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  );
  return response.data;
};

const buscarAlunoPorId = async (idAluno, token) => {
  try {
    const response = await httpClient.get(
      `/aluno/${idAluno}`,
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

const buscarProfessorPorId = async (idProfessor, token) => {
  try {
    const response = await httpClient.get(
      `/professor/${idProfessor}`,
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

const instituicaoService = {
  loginInstituicao,
  cadastrarProfessor,
  cadastrarCurso,
  buscarCursos,
  buscarCursoPorId,
  cadastrarTurma,
  buscarProfessores,
  buscarTurmasPorCurso,
  cadastrarAluno,
  buscarAluno,
  editarProfessor,
  editarAluno,
  buscarTurmas,
  buscarTurmaPorId,
  buscarAlunoPorId,
  buscarProfessorPorId,
  cadastrarDisciplina,
  buscarDisciplina,
  buscarSemestres,
  cadastrarDisciplinaSemestre,
  buscarDisciplinasSemestres,
  deletarDisciplinaSemestre,
  editarDisciplinaSemestre
};

export default instituicaoService;
