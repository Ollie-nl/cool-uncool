import { db } from './firebase';
import { ref, onValue, update, runTransaction } from 'firebase/database';

const sessionRef = (sessionId) => ref(db, `sessions/${sessionId}`);
const voteRef = (sessionId, slideSlug) =>
  ref(db, `sessions/${sessionId}/votes/${slideSlug}`);

export const openVoting = async (sessionId, slideSlug) => {
  await update(sessionRef(sessionId), {
    currentSlug: slideSlug,
    votingOpen: true,
    updatedAt: Date.now(),
  });
};

export const closeVoting = async (sessionId) => {
  await update(sessionRef(sessionId), {
    votingOpen: false,
    updatedAt: Date.now(),
  });
};

export const castVote = async (sessionId, slideSlug, voterId, choice) => {
  const vRef = voteRef(sessionId, slideSlug);
  let alreadyVoted = false;

  await runTransaction(vRef, (current) => {
    if (current?.voters?.[voterId]) {
      alreadyVoted = true;
      return; // abort — no change
    }
    const data = current || { cool: 0, uncool: 0, voters: {} };
    return {
      cool: (data.cool || 0) + (choice === 'cool' ? 1 : 0),
      uncool: (data.uncool || 0) + (choice === 'uncool' ? 1 : 0),
      voters: { ...(data.voters || {}), [voterId]: choice },
    };
  });

  if (alreadyVoted) throw new Error('already-voted');
};

export const subscribeToSession = (sessionId, callback) => {
  const sRef = sessionRef(sessionId);
  const unsub = onValue(sRef, (snap) => {
    callback(snap.exists() ? snap.val() : null);
  });
  return unsub;
};

export const subscribeToVote = (sessionId, slideSlug, callback) => {
  const vRef = voteRef(sessionId, slideSlug);
  const unsub = onValue(vRef, (snap) => {
    callback(
      snap.exists() ? snap.val() : { cool: 0, uncool: 0, voters: {} }
    );
  });
  return unsub;
};
