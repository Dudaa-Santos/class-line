import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isAutenticado: false,
  loading: true,
  iniciarSessao: () => {},
  encerrarSessao: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAutenticado, setIsAutenticado] = useState(false);
  const [loading, setLoading] = useState(true);

  // Verifica se há token salvo ao iniciar a aplicação
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAutenticado(!!token);
    setLoading(false);
  }, []);

  const iniciarSessao = (token) => {
    localStorage.setItem("token", token);
    setIsAutenticado(true);
  };

  const encerrarSessao = () => {
    localStorage.removeItem("token");
    setIsAutenticado(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAutenticado,
        loading,
        iniciarSessao,
        encerrarSessao,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
