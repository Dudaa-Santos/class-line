import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Função para descobrir o tipo pelo localStorage
function getTipoUsuario() {
  if (localStorage.getItem("id_instituicao")) return "instituicao";
  if (localStorage.getItem("id_professor")) return "professor";
  return null;
}

const isAuthenticated = () =>
  !!(localStorage.getItem("id_instituicao") || localStorage.getItem("id_professor"));

export default function PrivateRoute({ tipoPermitido }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login-professor" />;
  }
  if (tipoPermitido && getTipoUsuario() !== tipoPermitido) {
    // Redireciona se tentar acessar rota de outro perfil
    return <Navigate to="/login-professor" />;
  }
  return <Outlet />;
}
