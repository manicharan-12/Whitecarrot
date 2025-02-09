import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Layout/Navbar";
import Login from "./components/Auth/Login";
import CalendarView from "./components/Calendar/CalendarView";
import PrivateRoute from "./components/Auth/PrivateRoute";
import { initializeAuth } from "./services/api";
import { ToastContainer, Bounce } from "react-toastify";

function App() {
  useEffect(() => {
    initializeAuth();
  }, []);
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <CalendarView />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
