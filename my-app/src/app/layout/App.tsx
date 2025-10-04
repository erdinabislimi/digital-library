import React, { Fragment, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from "../../ProtectedRoute";

import NavBar from "../../features/nav/navbar";
import HomePage from "../../features/home/HomePage";
import Librat from "../../features/librat/dashboard/Librat";
import Kategorite from "../../features/kategorite/dashboard/Kategorite";
import Autoret from "../../features/autoret/dashboard/Autoret";
import Login from "../../features/registration/Login";
import Registration from "../../features/registration/Register";
import LibriDetails from "../../features/librat/details/LibriDetails";
import Profili from "../../features/profili/Profili";
import Lexuesit from "../../features/lexuesit/dashboard/Lexuesit";
import Rezervimet from "../../features/rezervimet/dashboard/Rezervimet";
import Huazimet from "../../features/huazimet/dashboard/Huazimet";
import Dashboard from "../../dashboard/Dashboard";
import Footer from "../../features/footer/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin]     = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    const role = localStorage.getItem("role");
    setIsAdmin(role === "admin");
  }, []);

  // paths on which we hide the footer
  const noFooterPaths = ["/", "/register"];

  return (
    <Fragment>
      <ToastContainer position="top-right" autoClose={3000} />
      {isLoggedIn && <NavBar />}

      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/home" replace /> : <Login />
          }
        />
        <Route
          path="/register"
          element={
            isLoggedIn ? <Navigate to="/home" replace /> : <Registration />
          }
        />

        {/* All private routes go under this guard */}
        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/details/:libriIsbn" element={<LibriDetails />} />
          <Route path="/profili" element={<Profili />} />

          {/* Admin-only pages */}
          {isAdmin && (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/librat" element={<Librat />} />
              <Route path="/kategorite" element={<Kategorite />} />
              <Route path="/autoret" element={<Autoret />} />
              <Route path="/lexuesit" element={<Lexuesit />} />
              <Route path="/rezervimet" element={<Rezervimet />} />
              <Route path="/huazimet" element={<Huazimet />} />
            </>
          )}

          {/* catch-all for logged-in users */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>

      {/* Footer on all routes except login/register */}
      {!noFooterPaths.includes(location.pathname) && <Footer />}
    </Fragment>
  );
};

export default App;
