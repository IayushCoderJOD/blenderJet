import { useState } from 'react';

// Extracts the YouTube video ID from any YouTube URL format:
//   https://youtube.com/shorts/ID?si=...
//   https://www.youtube.com/watch?v=ID
//   https://youtu.be/ID
//   bare ID
function extractVideoId(url: string): string | null {
  if (!url || url.startsWith('PASTE_')) return null;

  // Shorts: youtube.com/shorts/ID
  const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch) return shortsMatch[1];

  // Standard watch URL: ?v=ID
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];

  // Short URL: youtu.be/ID
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];

  // Bare 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;

  return null;
}

// Builds an AI-generated cute cartoon thumbnail from a prompt.
// Uses Pollinations.ai — free, no API key, returns an image directly.
function buildThumbnail(prompt: string, seed: number): string {
  const style =
    'cute kawaii cartoon illustration, vibrant pastel colors, soft shading, ' +
    'flat design, clean simple background, adorable, food illustration';
  const full = encodeURIComponent(`${prompt}, ${style}`);
  return `https://image.pollinations.ai/prompt/${full}?width=400&height=400&seed=${seed}&nologo=true`;
}

interface RecipeCardProps {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  emoji: string;
  imagePrompt: string;
  onClick: (videoId: string) => void;
}

export default function RecipeCard({ id, title, description, youtubeUrl, emoji, imagePrompt, onClick }: RecipeCardProps) {
  const videoId = extractVideoId(youtubeUrl);
  const seed = Number(id) || 1;
  const thumbnail = buildThumbnail(imagePrompt || title, seed);

  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleClick = () => {
    if (videoId) onClick(videoId);
  };

  return (
    <article
      className={`recipe-card ${videoId ? 'clickable' : ''}`}
      onClick={handleClick}
      role={videoId ? 'button' : undefined}
      tabIndex={videoId ? 0 : undefined}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
      aria-label={videoId ? `Play ${title}` : undefined}
    >
      <div className="card-video-wrapper">
        {/* Shimmer placeholder until the AI image loads */}
        {!loaded && !failed && <div className="card-shimmer" aria-hidden="true" />}

        {failed ? (
          // Graceful fallback so a card is never broken
          <div className="card-fallback" aria-hidden="true">
            <span className="fallback-emoji">{emoji}</span>
          </div>
        ) : (
          <img
            className={`card-thumb ${loaded ? 'is-loaded' : ''}`}
            src={thumbnail}
            alt={title}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        )}

        {videoId && (
          <div className="card-play-overlay" aria-hidden="true">
            <div className="play-btn">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="card-body">
        <div className="card-emoji-tag">
          <span>{emoji}</span>
          <span className="card-badge">Short</span>
        </div>
        <h3 className="card-title">{title}</h3>
        <p className="card-desc">{description}</p>
      </div>
    </article>
  );
}
