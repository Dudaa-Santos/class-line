import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginProfessor from "../pages/professor/loginProfessor";
import LoginInstituicao from "../pages/instituicao/loginInstituicao";

import HomeInstituicao from "../pages/instituicao/homeInstituicao";
import HomeProfessor from "../pages/professor/homeProfessor";

import CadastroUsuario from "../pages/instituicao/cadastroUsuario";
// import EdicaoUsuario from "../pages/instituicao/edicaoUsuario";
import CadastroTurma from "../pages/instituicao/cadastroTurma";
import CadastroCurso from "../pages/instituicao/cadastroCurso";
import CadastroDiscplina from "../pages/instituicao/cadastroDisciplina";

import Disciplinas from "../pages/professor/disciplinas";

import GradeCurricular from "../pages/instituicao/gradeCurricular";
import Alunos from "../pages/instituicao/alunos";
import Professores from "../pages/instituicao/professores";
import Turmas from "../pages/instituicao/turmas";
import Cursos from "../pages/instituicao/cursos";
import PrivateRoute from "./privateRoutes";

const Rotas = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login-professor" />} />

        <Route path="/login-professor" element={<LoginProfessor />} />
        <Route path="/login-instituicao" element={<LoginInstituicao />} />

        <Route element={<PrivateRoute tipoPermitido="instituicao" />}>
          <Route path="/home-instituicao" element={<HomeInstituicao />} />
          <Route path="/cadastro-usuarios" element={<CadastroUsuario />} />
          {/* <Route path="/edicao-usuario/professor/{id_professor}" element={<EdicaoUsuario />} />
          <Route path="/edicao-usuario/aluno/{id_aluno}" element={<EdicaoUsuario />} /> */}
          <Route path="/cadastro-turma" element={<CadastroTurma />} />
          <Route path="/cadastro-curso" element={<CadastroCurso />} />
          <Route path="/cadastro-disciplina" element={<CadastroDiscplina />} />
          <Route path="/grade-curricular/:idTurma" element={<GradeCurricular />} />
          <Route path="/alunos" element={<Alunos />} />
          <Route path="/professores" element={<Professores />} />
          <Route path="/turmas" element={<Turmas />} />
          <Route path="/cursos" element={<Cursos />} />
        </Route>

        <Route element={<PrivateRoute tipoPermitido="professor" />}>
          <Route path="/home-professor" element={<HomeProfessor />} />
          <Route path="/disciplinas/:id" element={<Disciplinas />} />
        </Route>

        <Route path="*" element={<Navigate to="/login-professor" />} />
      </Routes>
    </HashRouter>
  );
};

export default Rotas;
