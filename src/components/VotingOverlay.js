import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { subscribeToVote, openVoting, closeVoting } from '../voting';

const getVoterUrl = (sessionId) => {
  const basePath =
    process.env.NODE_ENV === 'production' ? '/cool-uncool' : '';
  return `${window.location.origin}${basePath}/vote/${sessionId}`;
};

const VotingOverlay = ({ sessionId, slideSlug, votingOpen, onClose, isDarkMode }) => {
  const [voteData, setVoteData] = useState({ cool: 0, uncool: 0, voters: {} });
  const [syncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState(null);

  const voterUrl = getVoterUrl(sessionId);
  const total = (voteData.cool || 0) + (voteData.uncool || 0);
  const coolPct = total > 0 ? (voteData.cool / total) * 100 : 0;
  const uncoolPct = total > 0 ? (voteData.uncool / total) * 100 : 0;

  // Open voting in Firestore when the overlay mounts
  useEffect(() => {
    if (!sessionId || !slideSlug) return;
    setSyncing(true);
    setSyncError(null);
    openVoting(sessionId, slideSlug)
      .then(() => console.log('[Voting] Session opened:', sessionId, slideSlug))
      .catch((err) => {
        console.error('[Voting] Failed to open session:', err);
        setSyncError(err.message || 'Firestore verbinding mislukt');
      })
      .finally(() => setSyncing(false));
  }, [sessionId, slideSlug]);

  // Subscribe to live vote counts
  useEffect(() => {
    if (!sessionId || !slideSlug) return;
    const unsub = subscribeToVote(sessionId, slideSlug, setVoteData);
    return unsub;
  }, [sessionId, slideSlug]);

  const handleClose = async () => {
    await closeVoting(sessionId);
    onClose();
  };

  return (
    <div className={`vo-backdrop ${votingOpen ? 'vo-open' : ''}`} aria-live="polite">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,400;0,700;1,400&display=swap');

        .vo-backdrop {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: flex-end;
          pointer-events: none;
        }

        .vo-backdrop.vo-open {
          pointer-events: auto;
        }

        .vo-panel {
          width: 100%;
          background: rgba(10, 10, 15, 0.88);
          backdrop-filter: blur(24px) saturate(1.4);
          -webkit-backdrop-filter: blur(24px) saturate(1.4);
          border-top: 1px solid rgba(255,255,255,0.1);
          padding: 28px 32px 32px;
          transform: translateY(100%);
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          font-family: 'DM Sans', sans-serif;
          color: #fff;
          box-shadow: 0 -20px 60px rgba(0,0,0,0.4);
        }

        .vo-backdrop.vo-open .vo-panel {
          transform: translateY(0);
        }

        .vo-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: auto auto;
          gap: 20px 40px;
          align-items: start;
        }

        /* ── Header ── */
        .vo-header {
          display: flex;
          align-items: center;
          gap: 16px;
          grid-column: 1;
          grid-row: 1;
        }

        .vo-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(28px, 4vw, 44px);
          letter-spacing: 0.04em;
          color: #fff;
          line-height: 1;
        }

        .vo-live-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(0, 200, 150, 0.15);
          border: 1px solid rgba(0, 200, 150, 0.4);
          border-radius: 20px;
          padding: 5px 12px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #00c896;
        }

        .vo-live-badge::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00c896;
          animation: vo-pulse 1.4s ease-in-out infinite;
        }

        @keyframes vo-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .vo-close-btn {
          margin-left: auto;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.7);
          border-radius: 8px;
          padding: 8px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
          white-space: nowrap;
        }

        .vo-close-btn:hover {
          background: rgba(255,255,255,0.15);
          color: #fff;
        }

        /* ── Bars section ── */
        .vo-bars-section {
          grid-column: 1;
          grid-row: 2;
        }

        .vo-total-count {
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          margin-bottom: 12px;
          font-weight: 500;
        }

        .vo-bar-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 10px;
        }

        .vo-bar-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(18px, 2.5vw, 26px);
          letter-spacing: 0.04em;
          width: 110px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .vo-bar-label-cool { color: #00c896; }
        .vo-bar-label-uncool { color: #e84855; }

        .vo-bar-track {
          flex: 1;
          height: 22px;
          border-radius: 4px;
          background: rgba(255,255,255,0.08);
          overflow: hidden;
          position: relative;
        }

        .vo-bar-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .vo-bar-fill-cool {
          background: linear-gradient(90deg, #00c896, #00e0aa);
        }

        .vo-bar-fill-uncool {
          background: linear-gradient(90deg, #c63642, #e84855);
        }

        .vo-bar-count {
          width: 52px;
          text-align: right;
          font-size: clamp(20px, 2.8vw, 30px);
          font-weight: 700;
          color: rgba(255,255,255,0.9);
          flex-shrink: 0;
          font-variant-numeric: tabular-nums;
        }

        .vo-bar-pct {
          width: 44px;
          text-align: right;
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          flex-shrink: 0;
          font-variant-numeric: tabular-nums;
        }

        /* ── QR section ── */
        .vo-qr-section {
          grid-column: 2;
          grid-row: 1 / 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .vo-qr-wrapper {
          background: #fff;
          border-radius: 12px;
          padding: 12px;
          line-height: 0;
        }

        .vo-qr-hint {
          font-size: 11px;
          color: rgba(255,255,255,0.35);
          text-align: center;
          letter-spacing: 0.04em;
        }

        .vo-qr-url {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          text-align: center;
          word-break: break-all;
          max-width: 160px;
          font-weight: 500;
        }

        /* ── Keyboard hint ── */
        .vo-kbd-hint {
          margin-top: 12px;
          font-size: 11px;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.04em;
          grid-column: 1;
        }

        kbd {
          display: inline-block;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 4px;
          padding: 1px 6px;
          font-size: 10px;
          font-family: monospace;
          color: rgba(255,255,255,0.4);
        }

        .vo-error {
          grid-column: 1 / 3;
          background: rgba(232, 72, 85, 0.15);
          border: 1px solid rgba(232, 72, 85, 0.4);
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 13px;
          color: #e84855;
          line-height: 1.5;
        }

        .vo-error strong { display: block; margin-bottom: 2px; }

        .vo-syncing {
          font-size: 12px;
          color: rgba(255,255,255,0.35);
          grid-column: 1;
          font-style: italic;
        }
      `}</style>

      <div className="vo-panel">
        <div className="vo-inner">
          {/* Header */}
          <div className="vo-header">
            <span className="vo-title">Cool of Uncool?</span>
            <span className="vo-live-badge">LIVE</span>
            <button className="vo-close-btn" onClick={handleClose}>
              Sluiten ✕
            </button>
          </div>

          {/* Error / syncing state */}
          {syncError && (
            <div className="vo-error">
              <strong>Firebase verbindingsfout</strong>
              {syncError} — controleer of Firestore is aangemaakt in de Firebase Console en of de regels schrijven toestaan.
            </div>
          )}
          {syncing && !syncError && (
            <div className="vo-syncing">Verbinden met Firebase…</div>
          )}

          {/* Vote bars */}
          <div className="vo-bars-section">
            <div className="vo-total-count">
              {total === 0
                ? 'Wachten op stemmen…'
                : `${total} stem${total !== 1 ? 'men' : ''}`}
            </div>

            {/* Cool bar */}
            <div className="vo-bar-row">
              <span className="vo-bar-label vo-bar-label-cool">👍 Cool</span>
              <div className="vo-bar-track">
                <div
                  className="vo-bar-fill vo-bar-fill-cool"
                  style={{ width: `${coolPct}%` }}
                />
              </div>
              <span className="vo-bar-count">{voteData.cool || 0}</span>
              <span className="vo-bar-pct">
                {total > 0 ? `${Math.round(coolPct)}%` : '—'}
              </span>
            </div>

            {/* Uncool bar */}
            <div className="vo-bar-row">
              <span className="vo-bar-label vo-bar-label-uncool">👎 Uncool</span>
              <div className="vo-bar-track">
                <div
                  className="vo-bar-fill vo-bar-fill-uncool"
                  style={{ width: `${uncoolPct}%` }}
                />
              </div>
              <span className="vo-bar-count">{voteData.uncool || 0}</span>
              <span className="vo-bar-pct">
                {total > 0 ? `${Math.round(uncoolPct)}%` : '—'}
              </span>
            </div>

            <div className="vo-kbd-hint">
              Druk <kbd>V</kbd> om stemmen te sluiten
            </div>
          </div>

          {/* QR code */}
          <div className="vo-qr-section">
            <div className="vo-qr-wrapper">
              <QRCode value={voterUrl} size={130} />
            </div>
            <div className="vo-qr-hint">Scan om te stemmen</div>
            <div className="vo-qr-url">{voterUrl}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingOverlay;
