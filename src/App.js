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
  const basename = window.location.pathname.includes("/cool-uncool")
    ? "/cool-uncool"
    : "/";
  return (
    <Router basename={basename}>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/slides/2024/12/start" replace />}
        />
        <Route path="/slides/:year/:month/:slug" element={<SlideDeck />} />
        <Route path="*" element={<DebugRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
