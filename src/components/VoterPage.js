import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { subscribeToSession, subscribeToVote, castVote } from '../voting';

const generateUUID = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for non-secure contexts (http on local network)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
};

const getVoterId = () => {
  let id = localStorage.getItem('cu-voter-id');
  if (!id) {
    id = generateUUID();
    localStorage.setItem('cu-voter-id', id);
  }
  return id;
};

const VoterPage = () => {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [voteData, setVoteData] = useState({ cool: 0, uncool: 0, voters: {} });
  const [myVote, setMyVote] = useState(null);
  const [voting, setVoting] = useState(false);
  const [error, setError] = useState(null);
  const [prevSlug, setPrevSlug] = useState(null);
  const voterId = useRef(getVoterId());

  useEffect(() => {
    const unsub = subscribeToSession(sessionId, setSession);
    return unsub;
  }, [sessionId]);

  useEffect(() => {
    if (!session?.currentSlug) return;

    if (session.currentSlug !== prevSlug) {
      setPrevSlug(session.currentSlug);
      setMyVote(null);
    }

    const unsub = subscribeToVote(sessionId, session.currentSlug, (data) => {
      setVoteData(data);
      const existingVote = data.voters?.[voterId.current] || null;
      setMyVote((prev) => {
        if (prev) return prev;
        return existingVote;
      });
    });
    return unsub;
  }, [sessionId, session?.currentSlug, prevSlug]);

  const handleVote = async (choice) => {
    if (!session?.currentSlug || !session.votingOpen || myVote || voting) return;
    setError(null);
    setVoting(true);
    try {
      await castVote(sessionId, session.currentSlug, voterId.current, choice);
      setMyVote(choice);
    } catch (e) {
      if (e.message !== 'already-voted') {
        setError('Stemmen mislukt. Probeer opnieuw.');
      }
    } finally {
      setVoting(false);
    }
  };

  const total = (voteData.cool || 0) + (voteData.uncool || 0);
  const coolPct = total > 0 ? Math.round((voteData.cool / total) * 100) : 50;
  const uncoolPct = total > 0 ? 100 - coolPct : 50;

  const isOpen = session?.votingOpen;

  return (
    <div className="voter-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');

        .voter-page {
          position: fixed;
          inset: 0;
          background: #0a0a0a;
          display: flex;
          flex-direction: column;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
          -webkit-tap-highlight-color: transparent;
          user-select: none;
        }

        .voter-topbar {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 20px;
          background: rgba(255,255,255,0.04);
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        .voter-session-badge {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
        }

        .voter-live-dot {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #00c896;
        }

        .voter-live-dot::before {
          content: '';
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #00c896;
          animation: voter-pulse 1.4s ease-in-out infinite;
        }

        .voter-live-dot.closed {
          color: rgba(255,255,255,0.3);
        }

        .voter-live-dot.closed::before {
          background: rgba(255,255,255,0.3);
          animation: none;
        }

        @keyframes voter-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.75); }
        }

        .voter-main {
          flex: 1;
          display: flex;
          min-height: 0;
        }

        /* ── Split buttons ── */
        .voter-split {
          display: flex;
          width: 100%;
        }

        .voter-btn {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          transition: filter 0.15s, transform 0.15s;
          position: relative;
          overflow: hidden;
          gap: 12px;
          padding: 0;
        }

        .voter-btn:active {
          transform: scale(0.97);
        }

        .voter-btn.disabled {
          cursor: not-allowed;
          filter: grayscale(0.5) brightness(0.5);
        }

        .voter-btn-cool {
          background: linear-gradient(160deg, #00c896 0%, #009e78 100%);
          clip-path: polygon(0 0, 96% 0, 100% 100%, 0 100%);
        }

        .voter-btn-uncool {
          background: linear-gradient(160deg, #e84855 0%, #c63642 100%);
          clip-path: polygon(4% 0, 100% 0, 100% 100%, 0 100%);
        }

        .voter-btn-emoji {
          font-size: clamp(48px, 12vw, 80px);
          line-height: 1;
        }

        .voter-btn-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(52px, 16vw, 96px);
          line-height: 1;
          color: rgba(255,255,255,0.95);
          letter-spacing: 0.03em;
          text-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }

        .voter-btn-sublabel {
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          letter-spacing: 0.05em;
        }

        /* ── Already voted overlay ── */
        .voter-btn-voted-mark {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 64px;
          backdrop-filter: blur(2px);
          animation: voter-fade-in 0.3s ease;
        }

        @keyframes voter-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* ── Waiting state ── */
        .voter-waiting {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 24px;
          padding: 40px;
          text-align: center;
        }

        .voter-waiting-icon {
          font-size: 64px;
          animation: voter-float 3s ease-in-out infinite;
        }

        @keyframes voter-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        .voter-waiting-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 36px;
          color: rgba(255,255,255,0.7);
          letter-spacing: 0.05em;
        }

        .voter-waiting-sub {
          font-size: 14px;
          color: rgba(255,255,255,0.3);
          line-height: 1.6;
        }

        /* ── Results bar (bottom strip) ── */
        .voter-results {
          flex-shrink: 0;
          background: rgba(255,255,255,0.05);
          border-top: 1px solid rgba(255,255,255,0.07);
          padding: 14px 20px;
        }

        .voter-results-bar-track {
          height: 8px;
          border-radius: 4px;
          background: rgba(255,255,255,0.1);
          overflow: hidden;
          margin-bottom: 10px;
        }

        .voter-results-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #00c896 0%, #00c896 var(--cool-pct), #e84855 var(--cool-pct), #e84855 100%);
          border-radius: 4px;
          transition: --cool-pct 0.6s ease;
          width: 100%;
        }

        .voter-results-counts {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          font-weight: 700;
          color: rgba(255,255,255,0.5);
        }

        .voter-results-cool { color: #00c896; }
        .voter-results-uncool { color: #e84855; }

        .voter-confirm-msg {
          text-align: center;
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          margin-top: 6px;
        }

        /* ── Error ── */
        .voter-error {
          padding: 8px 20px;
          background: rgba(232, 72, 85, 0.15);
          border-top: 1px solid rgba(232, 72, 85, 0.3);
          color: #e84855;
          font-size: 13px;
          text-align: center;
        }

        /* ── Voting shimmer (loading) ── */
        .voter-btn.voting::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%);
          transform: translateX(-100%);
          animation: voter-shimmer 1s ease infinite;
        }

        @keyframes voter-shimmer {
          to { transform: translateX(100%); }
        }
      `}</style>

      {/* Top bar */}
      <div className="voter-topbar">
        <span className="voter-session-badge">Sessie {sessionId}</span>
        <span className={`voter-live-dot ${isOpen ? '' : 'closed'}`}>
          {isOpen ? 'Live' : 'Gesloten'}
        </span>
      </div>

      {/* Main area */}
      <div className="voter-main">
        {!isOpen ? (
          <div className="voter-waiting">
            <span className="voter-waiting-icon">🎬</span>
            <div className="voter-waiting-title">Wacht op de volgende vraag</div>
            <div className="voter-waiting-sub">
              De presentator opent stemmen<br />na de volgende video.
            </div>
          </div>
        ) : (
          <div className="voter-split">
            {/* COOL */}
            <button
              className={`voter-btn voter-btn-cool ${!isOpen || myVote || voting ? 'disabled' : ''} ${voting ? 'voting' : ''}`}
              onClick={() => handleVote('cool')}
              aria-label="Stem Cool"
            >
              <span className="voter-btn-emoji">👍</span>
              <span className="voter-btn-label">Cool</span>
              {!myVote && <span className="voter-btn-sublabel">Tik om te stemmen</span>}
              {myVote === 'cool' && (
                <div className="voter-btn-voted-mark">✓</div>
              )}
            </button>

            {/* UNCOOL */}
            <button
              className={`voter-btn voter-btn-uncool ${!isOpen || myVote || voting ? 'disabled' : ''} ${voting ? 'voting' : ''}`}
              onClick={() => handleVote('uncool')}
              aria-label="Stem Uncool"
            >
              <span className="voter-btn-emoji">👎</span>
              <span className="voter-btn-label">Uncool</span>
              {!myVote && <span className="voter-btn-sublabel">Tik om te stemmen</span>}
              {myVote === 'uncool' && (
                <div className="voter-btn-voted-mark">✓</div>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Results strip (shown after voting or when closed with results) */}
      {(myVote || !isOpen) && total > 0 && (
        <div className="voter-results">
          <div className="voter-results-bar-track">
            <div
              className="voter-results-bar-fill"
              style={{ '--cool-pct': `${coolPct}%` }}
            />
          </div>
          <div className="voter-results-counts">
            <span className="voter-results-cool">👍 {voteData.cool} cool</span>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>{total} stemmen</span>
            <span className="voter-results-uncool">{voteData.uncool} uncool 👎</span>
          </div>
          {myVote && (
            <div className="voter-confirm-msg">
              Jij stemde <strong style={{ color: myVote === 'cool' ? '#00c896' : '#e84855' }}>{myVote}</strong>
            </div>
          )}
        </div>
      )}

      {error && <div className="voter-error">{error}</div>}
    </div>
  );
};

export default VoterPage;
