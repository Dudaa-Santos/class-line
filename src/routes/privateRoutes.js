import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/authContext";

export default function PrivateRoute() {
  const { isAutenticado, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Carregando...</div>; 
  }

  return isAutenticado ? <Outlet /> : <Navigate to="/login-professor" />;
}
