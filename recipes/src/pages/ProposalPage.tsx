import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const HEARTS = ['💕', '💗', '❤️', '💖', '🌸', '💓', '🌺', '✨'];
const MUSIC_ID = '_trU-Wt9ucI';

export default function ProposalPage() {
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [musicStarted, setMusicStarted] = useState(false);

  // YouTube IFrame Player API — the only reliable way to play audio on mobile.
  // We pre-create a hidden player, then call playVideo() synchronously inside
  // the first user gesture (tap/click/key) so the browser allows the sound.
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const wantsPlayRef = useRef(false);
  const startedRef = useRef(false);

  useEffect(() => {
    const w = window as any;
    let cancelled = false;

    const createPlayer = () => {
      if (playerRef.current || cancelled || !hostRef.current) return;
      // Give YouTube a throwaway child to replace — NOT a React-managed node.
      // This avoids React's removeChild crash on unmount.
      const mount = document.createElement('div');
      hostRef.current.appendChild(mount);
      playerRef.current = new w.YT.Player(mount, {
        videoId: MUSIC_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          playsinline: 1, // iOS: don't force fullscreen
          loop: 1,
          playlist: MUSIC_ID,
          start: 20,
        },
        events: {
          onReady: (e: any) => {
            // If the user already tapped before the API finished loading
            if (wantsPlayRef.current) {
              try { e.target.unMute(); e.target.playVideo(); } catch { /* ignore */ }
            }
          },
        },
      });
    };

    if (w.YT && w.YT.Player) {
      createPlayer();
    } else {
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
      }
      const prev = w.onYouTubeIframeAPIReady;
      w.onYouTubeIframeAPIReady = () => { prev?.(); createPlayer(); };
    }

    return () => {
      cancelled = true;
      try { playerRef.current?.destroy?.(); } catch { /* ignore */ }
      playerRef.current = null;
    };
  }, []);

  // Start music on the first user gesture (required by mobile autoplay policies).
  useEffect(() => {
    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      wantsPlayRef.current = true;
      const p = playerRef.current;
      if (p?.playVideo) {
        try { p.unMute(); p.playVideo(); } catch { /* ignore */ }
      }
      setMusicStarted(true);
    };
    window.addEventListener('pointerdown', start);
    window.addEventListener('touchend', start);
    window.addEventListener('click', start);
    window.addEventListener('keydown', start);
    return () => {
      window.removeEventListener('pointerdown', start);
      window.removeEventListener('touchend', start);
      window.removeEventListener('click', start);
      window.removeEventListener('keydown', start);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date === '2023-06-26') {
      setSuccess(true);
      setError('');
      setTimeout(() => navigate('/recipes'), 2200);
    } else {
      const msgs = [
        "Hmm, not quite right... think deeper 💭",
        "So close! But that's not the date 🤔",
        "You'll get it — it's unforgettable 💕",
        "Love gives infinite chances 🌸",
      ];
      setError(msgs[attempts % msgs.length]);
      setAttempts(a => a + 1);
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };


  return (
    <>
      {/* Hidden YouTube player (API-controlled). Destroyed on unmount → music stops. */}
      <div
        ref={hostRef}
        style={{
          position: 'fixed',
          opacity: 0,
          width: '1px',
          height: '1px',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />

      <div className="proposal-page">
        {/* Floating hearts */}
        <div className="hearts-bg" aria-hidden="true">
          {Array.from({ length: 18 }, (_, i) => (
            <span
              key={i}
              className="floating-heart"
              style={{
                left: `${(i * 6 + 2) % 98}%`,
                animationDelay: `${(i * 0.38) % 6}s`,
                animationDuration: `${5 + (i % 5)}s`,
                fontSize: `${10 + (i % 4) * 7}px`,
              }}
            >
              {HEARTS[i % HEARTS.length]}
            </span>
          ))}
        </div>

        <div className="orb orb-1" aria-hidden="true" />
        <div className="orb orb-2" aria-hidden="true" />
        <div className="orb orb-3" aria-hidden="true" />

        {/* Music indicator — hint before first tap, then "now playing" */}
        {musicStarted ? (
          <div className="music-indicator" aria-label="Music playing">
            <span className="music-bars">
              <span /><span /><span /><span />
            </span>
            <span>Playing for you</span>
          </div>
        ) : (
          <div className="music-indicator music-hint" aria-label="Tap to play music">
            <span>🎵</span>
            <span>Tap anywhere to play our song</span>
          </div>
        )}

        <div className={`proposal-card ${shake ? 'shake' : ''} ${success ? 'success-state' : ''}`}>
          {success ? (
            <div className="success-body">
              <div className="success-ring">🌸</div>
              <h1 className="success-title">That's the day!</h1>
              <p className="success-sub">Opening your special memories...</p>
              <div className="burst-row">
                {['💕', '💖', '💗', '💓', '💞', '✨'].map((h, i) => (
                  <span key={i} className="burst-heart" style={{ animationDelay: `${i * 0.08}s` }}>
                    {h}
                  </span>
                ))}
              </div>
              <div className="loading-bar">
                <div className="loading-fill" />
              </div>
            </div>
          ) : (
            <>
              <div className="proposal-icon-wrap">
                <span className="proposal-icon">💌</span>
                <div className="icon-ring" />
              </div>

              <p className="proposal-eyebrow">Ishita, a little question...</p>
              <h1 className="proposal-heading">
                When did Ayush<br />Propose to You?
              </h1>

              <form onSubmit={handleSubmit} className="proposal-form">
                <div className={`input-wrap ${error ? 'has-error' : ''}`}>
                  <label htmlFor="the-date">The special date</label>
                  <div className="input-inner">
                    <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <input
                      id="the-date"
                      type="date"
                      value={date}
                      onChange={e => { setDate(e.target.value); setError(''); }}
                      required
                      min="2020-01-01"
                      max="2024-12-31"
                    />
                  </div>
                </div>

                {error && (
                  <div className="error-msg" role="alert">
                    {error}
                  </div>
                )}

                <button type="submit" className="proposal-btn">
                  <span>Unlock the Surprise</span>
                  <span className="btn-sparkle">✨</span>
                </button>
              </form>

              <p className="card-credit">Made with ❤️ by Ayush, only for Ishita</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
