import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SlideDeck from "./components/SlideDeck";
import "./styles/index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/slide/start" replace />} />
        <Route path="/slide/:slug" element={<SlideDeck />} />
        <Route path="*" element={<div>Pagina niet gevonden</div>} />
      </Routes>
    </Router>
  );
}

export default App;
