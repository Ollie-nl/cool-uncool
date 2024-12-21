import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import SlideDeck from "./components/SlideDeck";
import "./styles/index.css";

// Debugging component
function DebugRoute() {
  let location = useLocation();
  return <div>Route niet gevonden: {location.pathname}</div>;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root naar een standaard slide */}
        <Route
          path="/"
          element={<Navigate to="/slides/2024/12/start" replace />}
        />

        {/* Gebruik aparte year en month params */}
        <Route path="/slides/:year/:month/:slug" element={<SlideDeck />} />

        {/* Fallback route voor niet-bestaande pagina's */}
        <Route path="*" element={<DebugRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
