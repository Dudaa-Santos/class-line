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

const instituicaoService = {
  loginInstituicao
};

export default instituicaoService;
