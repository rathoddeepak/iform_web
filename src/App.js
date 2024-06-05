/**
 * App.js
 * Main Entry point point for all routes
 */
import React from "react";

// React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Other Components
import PrivateRoute from "./components/route/PrivateRoute";
import { Toaster } from "react-hot-toast";

// Screens
import SubmissionScreen from "./screens/submission/";
import AuthScreen from "./screens/auth/";
import HomeScreen from "./screens/home/";
import FormScreen from "./screens/form/";
import SplashScreen from "./screens/splash/";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<SplashScreen />} />
          <Route path="/auth" element={<AuthScreen />} />
          <Route path="/submission/:formCode" element={<SubmissionScreen />} />          
          <Route
            path="/home"
            element={<PrivateRoute component={HomeScreen} />}
          />
          <Route
            path="/form/:formId"
            element={<PrivateRoute component={FormScreen} />}
          />
          <Route
            path="/form/:userFormId/response/:responseId"
            element={<PrivateRoute component={SubmissionScreen} />}
          />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;