import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
  } from "react-router-dom";
import Login from "../pages/Login";
import Clients from "../pages/Clients";

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" >
        <Route index element={<Login />} />
        <Route path="clientes" element={<Clients />} />

      </Route>
    )
  );
  