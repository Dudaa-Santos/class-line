import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginProfessor from "./pages/professor/loginProfessor";
import LoginInstituicao from "./pages/instituicao/loginInstituicao";
import HomeInstituicao from "./pages/instituicao/homeInstituicao";
import HomeProfessor from "./pages/professor/homeProfessor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login-professor" />} />
        <Route path="/login-professor" element={<LoginProfessor />} />
        <Route path="/login-instituicao" element={<LoginInstituicao />} />
        <Route path="/home-instituicao" element={<HomeInstituicao />} />
        <Route path="/home-professor" element={<HomeProfessor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
