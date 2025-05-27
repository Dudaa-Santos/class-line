import React from "react";

const AuthContext = React.createContext({
  isAutenticado: false,
  iniciarSessao: () => {},
  encerrarSessao: () => {},
});

export default AuthContext;
