import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { recipes } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';
import VideoModal from '../components/VideoModal';

const HERO_EMOJIS = [
  { char: '🍓', top: '12%', left: '6%',  size: '4.5rem', blur: '1px',   rot: '-15deg' },
  { char: '🥭', top: '60%', left: '10%', size: '3.5rem', blur: '2px',   rot: '10deg'  },
  { char: '🍑', top: '20%', left: '82%', size: '4rem',   blur: '1px',   rot: '20deg'  },
  { char: '🫐', top: '65%', left: '75%', size: '3.8rem', blur: '2px',   rot: '-8deg'  },
  { char: '🥝', top: '10%', left: '55%', size: '3rem',   blur: '2px',   rot: '12deg'  },
  { char: '🍉', top: '72%', left: '40%', size: '4rem',   blur: '1px',   rot: '-20deg' },
  { char: '🍋', top: '35%', left: '90%', size: '3.2rem', blur: '2px',   rot: '5deg'   },
  { char: '🍍', top: '5%',  left: '30%', size: '3.5rem', blur: '1.5px', rot: '-5deg'  },
  { char: '🍒', top: '50%', left: '2%',  size: '3rem',   blur: '2px',   rot: '15deg'  },
];

interface ModalState { videoId: string; title: string; emoji: string; }

export default function RecipesPage() {
  const navigate = useNavigate();
  const [modal, setModal] = useState<ModalState | null>(null);

  const openModal = (videoId: string, title: string, emoji: string) => {
    setModal({ videoId, title, emoji });
  };

  return (
    <div className="recipes-page">
      {/* ── Navbar ─────────────────────────── */}
      <nav className="rp-nav">
        <div className="rp-nav-inner">
          <button className="rp-nav-back" onClick={() => navigate('/')} aria-label="Go back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <div className="rp-nav-brand">
            <span className="rp-nav-logo">💕</span>
            <span className="rp-nav-name">Ayush &amp; Ishita</span>
          </div>
          <div className="rp-nav-spacer" />
        </div>
      </nav>

      {/* ── Hero Banner ────────────────────── */}
      <header className="rp-hero">
        <div className="rp-hero-bg" aria-hidden="true">
          {HERO_EMOJIS.map((e, i) => (
            <span
              key={i}
              className="hero-deco"
              style={{
                top: e.top, left: e.left,
                fontSize: e.size,
                filter: `blur(${e.blur})`,
                transform: `rotate(${e.rot})`,
              }}
            >
              {e.char}
            </span>
          ))}
        </div>
        <div className="rp-hero-overlay" />
        <div className="rp-hero-content">
          <p className="hero-eyebrow">Our Favourite</p>
          <h1 className="hero-title">RECIPES</h1>
          <p className="hero-tagline">Blend with love · Sip with joy</p>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#f8f5ff"/>
          </svg>
        </div>
      </header>

      {/* ── Recipes Section ────────────────── */}
      <main className="rp-main">
        <div className="rp-section-header">
          <h2 className="rp-section-title">BLEND ENDLESSLY</h2>
          <p className="rp-section-sub">Every smoothie tells a story — here are ours</p>
          <div className="title-divider">
            <span />
            <span className="divider-heart">💜</span>
            <span />
          </div>
        </div>

        <div className="rp-grid">
          {recipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              {...recipe}
              onClick={videoId => openModal(videoId, recipe.title, recipe.emoji)}
            />
          ))}
        </div>
      </main>

      {/* ── Footer ─────────────────────────── */}
      <footer className="rp-footer">
        <p className="footer-love">
          Made with <span className="footer-heart">❤️</span> by Ayush, only for Ishita
        </p>
        <p className="footer-date">Est. June 26, 2023 💍</p>
      </footer>

      {/* ── Video Modal ────────────────────── */}
      {modal && (
        <VideoModal
          videoId={modal.videoId}
          title={modal.title}
          emoji={modal.emoji}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
