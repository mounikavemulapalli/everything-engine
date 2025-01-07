import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import UserPanel from "./components/UserPanel";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/Admin' element={<AdminPanel />} />
          <Route path='/user' element={<UserPanel />} />
        </Routes>
      </Router>
    </>
  );
}
