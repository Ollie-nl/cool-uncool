import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import SlideDeck from "./components/SlideDeck";
import VoterPage from "./components/VoterPage";
import "./styles/index.css";

// Debugging component
function DebugRoute() {
  let location = useLocation();
  return <div>Route niet gevonden: {location.pathname}</div>;
}

// Redirects /vote to the current month's session
function VoteRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    navigate(`/vote/${year}-${month}`, { replace: true });
  }, [navigate]);
  return <div>Laden…</div>;
}

function StartRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    let isActive = true;
    const basePath = window.location.pathname.includes("/cool-uncool")
      ? "/cool-uncool"
      : "";

    const redirectToLatest = async () => {
      try {
        const response = await fetch(`${basePath}/data/available-months.json`);
        if (!response.ok) throw new Error("available-months.json niet gevonden");
        const data = await response.json();
        const sortedMonths = (data.months || [])
          .slice()
          .sort((a, b) => b.localeCompare(a));

        if (!isActive) return;

        if (sortedMonths.length > 0) {
          const [year, month] = sortedMonths[0].split("-");
          navigate(`/slides/${year}/${month}/start`, { replace: true });
        } else {
          navigate("/slides/2024/12/start", { replace: true });
        }
      } catch (error) {
        if (!isActive) return;
        navigate("/slides/2024/12/start", { replace: true });
      }
    };

    redirectToLatest();

    return () => {
      isActive = false;
    };
  }, [navigate]);

  return <div>Bezig met laden...</div>;
}

function App() {
  const basename = window.location.pathname.includes("/cool-uncool")
    ? "/cool-uncool"
    : "/";
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<StartRedirect />} />
        <Route path="/slides/:year/:month/:slug" element={<SlideDeck />} />
        <Route path="/vote" element={<VoteRedirect />} />
        <Route path="/vote/:sessionId" element={<VoterPage />} />
        <Route path="*" element={<DebugRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
