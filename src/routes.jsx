import React from "react";
import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import Layout from "./pages/private/_layout";
import Usuarios from "./pages/private/usuarios";
import Facturas from "./pages/private/facturas";
import Login from "./pages/public/login";
import Bloques from "./pages/private/bloque";
const RoutesComponents = () => {
  return (
    <Routes>
      <Route path={ROUTES.INDEX} element={<Login />} />
      <Route path={ROUTES.HOME} element={<Layout />}>
        <Route path={ROUTES.USERS} element={<Usuarios />} />
        <Route path={ROUTES.BLOQUES} element={<Bloques />} />
        <Route path={ROUTES.FACTURAS} element={<Facturas />} />
      </Route>
    </Routes>
  );
};

export default RoutesComponents;
