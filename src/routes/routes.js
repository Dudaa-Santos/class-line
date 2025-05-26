import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginProfessor from "../pages/professor/loginProfessor";
import LoginInstituicao from "../pages/instituicao/loginInstituicao";
import HomeInstituicao from "../pages/instituicao/homeInstituicao";
import HomeProfessor from "../pages/professor/homeProfessor";
import CadastroUsuario from "../pages/instituicao/cadastroUsuario";

import PrivateRoute from "./privateRoutes";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirecionamento padrão para o login de professor */}
        <Route path="/" element={<Navigate to="/login-professor" />} />

        {/* Rotas públicas */}
        <Route path="/login-professor" element={<LoginProfessor />} />
        <Route path="/login-instituicao" element={<LoginInstituicao />} />

        {/* Rotas privadas */}
        <Route element={<PrivateRoute />}>
          <Route path="/home-instituicao" element={<HomeInstituicao />} />
          <Route path="/home-professor" element={<HomeProfessor />} />
          <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
