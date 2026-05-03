import { useEffect } from 'react';

interface Props {
  onStart: () => void;
  onSetupTeams: () => void;
  onMount: () => void;
}

const botanicalStyle = (
  side: 'left' | 'right',
  top: string,
  delay: string,
  rotate: string,
): React.CSSProperties => ({
  position: 'absolute',
  top,
  [side]: '-20px',
  opacity: 0,
  animation: `${side === 'left' ? 'floatInLeft' : 'floatInRight'} 1.2s ease ${delay} forwards`,
  transform: `rotate(${rotate})`,
  pointerEvents: 'none',
  userSelect: 'none',
});

function Fern({ style }: { style: React.CSSProperties }) {
  return (
    <svg width="120" height="80" viewBox="0 0 120 80" style={style} aria-hidden="true">
      <path
        d="M60 75 C60 75 10 55 15 30 C20 5 45 15 60 40 C75 15 100 5 105 30 C110 55 60 75 60 75Z"
        fill="var(--sage)"
        opacity="0.6"
      />
      <path
        d="M60 75 L60 10"
        stroke="var(--brown-warm)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />
      {[20, 30, 40, 50, 60].map((y, i) => (
        <g key={y}>
          <path
            d={`M60 ${y} C${50 - i * 2} ${y - 8} ${40 - i * 3} ${y} ${35 - i * 3} ${y + 4}`}
            stroke="var(--sage)"
            strokeWidth="1"
            fill="none"
            opacity="0.5"
          />
          <path
            d={`M60 ${y} C${70 + i * 2} ${y - 8} ${80 + i * 3} ${y} ${85 + i * 3} ${y + 4}`}
            stroke="var(--sage)"
            strokeWidth="1"
            fill="none"
            opacity="0.5"
          />
        </g>
      ))}
    </svg>
  );
}

function Petal({ style }: { style: React.CSSProperties }) {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" style={style} aria-hidden="true">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse
          key={angle}
          cx="30"
          cy="30"
          rx="6"
          ry="14"
          fill="var(--rose-light)"
          opacity="0.7"
          transform={`rotate(${angle} 30 30) translate(0 -10)`}
        />
      ))}
      <circle cx="30" cy="30" r="5" fill="var(--rose-mid)" opacity="0.8" />
    </svg>
  );
}

// left%, delay, duration, rx (half-width), ry (half-height), color, opacity
const PETAL_CONFIGS: [string, string, string, number, number, string, number][] = [
  ['3%',  '0s',   '5.2s', 6,  6,  'var(--rose-light)', 0.8],
  ['8%',  '1.2s', '7s',   4,  11, 'var(--sage)',        0.7],
  ['14%', '0.4s', '6s',   7,  7,  'var(--rose-mid)',    0.75],
  ['20%', '2.1s', '5.5s', 5,  5,  'var(--rose-light)', 0.8],
  ['26%', '0.7s', '8s',   3,  10, 'var(--sage-light)', 0.65],
  ['33%', '1.8s', '6s',   8,  8,  'var(--rose-mid)',   0.7],
  ['39%', '3s',   '7.5s', 4,  4,  'var(--rose-light)', 0.85],
  ['45%', '0.3s', '5s',   4,  12, 'var(--sage)',        0.6],
  ['51%', '2.5s', '6.5s', 6,  6,  'var(--rose-deep)',  0.55],
  ['57%', '1s',   '4.5s', 4,  4,  'var(--rose-light)', 0.8],
  ['63%', '3.8s', '7s',   3,  9,  'var(--sage)',        0.7],
  ['69%', '0.6s', '5.5s', 7,  7,  'var(--rose-mid)',   0.75],
  ['75%', '2s',   '6s',   4,  4,  'var(--rose-light)', 0.8],
  ['81%', '4.2s', '8s',   4,  11, 'var(--sage-light)', 0.65],
  ['87%', '1.4s', '5s',   5,  5,  'var(--rose-mid)',   0.75],
  ['93%', '0.9s', '7.5s', 4,  4,  'var(--rose-light)', 0.8],
  ['10%', '4s',   '6s',   6,  6,  'var(--sage)',        0.6],
  ['22%', '5.5s', '5s',   4,  10, 'var(--rose-deep)',  0.5],
  ['35%', '4.7s', '7s',   6,  6,  'var(--rose-light)', 0.8],
  ['48%', '6s',   '5.5s', 3,  9,  'var(--sage)',        0.65],
  ['60%', '5s',   '6.5s', 6,  6,  'var(--rose-mid)',   0.7],
  ['72%', '3.5s', '4s',   4,  4,  'var(--rose-light)', 0.85],
  ['84%', '6.5s', '7s',   4,  10, 'var(--sage-light)', 0.6],
  ['17%', '7s',   '5s',   5,  5,  'var(--rose-mid)',   0.75],
  ['54%', '7.5s', '6s',   6,  6,  'var(--rose-light)', 0.8],
];

function FallingPetals() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      {PETAL_CONFIGS.map(([left, delay, dur, rx, ry, color, opacity], i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: '-4%',
            left,
            animation: `petalFall ${dur} ease-in ${delay} infinite`,
          }}
        >
          <svg
            width={rx * 2 + 2}
            height={ry * 2 + 2}
            viewBox={`0 0 ${rx * 2 + 2} ${ry * 2 + 2}`}
          >
            <ellipse
              cx={rx + 1}
              cy={ry + 1}
              rx={rx}
              ry={ry}
              fill={color}
              opacity={opacity}
            />
          </svg>
        </div>
      ))}
    </div>
  );
}

export function SplashScreen({ onStart, onSetupTeams, onMount }: Props) {
  useEffect(() => { onMount(); }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '2rem',
      }}
    >
      <FallingPetals />

      {/* Botanical decorations */}
      <Fern style={botanicalStyle('left', '10%', '0.2s', '-10deg')} />
      <Fern style={botanicalStyle('right', '15%', '0.4s', '10deg')} />
      <Petal style={botanicalStyle('left', '55%', '0.6s', '20deg')} />
      <Petal style={botanicalStyle('right', '60%', '0.3s', '-15deg')} />
      <Fern style={botanicalStyle('left', '75%', '0.8s', '5deg')} />
      <Petal style={botanicalStyle('right', '80%', '1s', '-25deg')} />

      {/* Main content */}
      <div
        style={{
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
          animation: 'floatInUp 1s ease 0.1s both',
        }}
      >
        {/* Giant 30 */}
        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(120px, 18vw, 200px)',
            fontWeight: 700,
            color: 'var(--rose-deep)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            animation: 'gentlePulse 2s ease-in-out infinite',
            textShadow: '0 8px 32px rgba(139,90,106,0.2)',
          }}
          aria-label="30"
        >
          30
        </div>

        {/* Subtitle */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            color: 'var(--brown-warm)',
            margin: '0.25rem 0 2rem',
            fontWeight: 400,
            letterSpacing: '0.05em',
          }}
        >
          Esperanza's Birthday Trivia
        </h1>

        {/* Decorative divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            justifyContent: 'center',
            marginBottom: '2.5rem',
          }}
        >
          <div style={{ height: '1px', width: '80px', background: 'var(--rose-mid)' }} />
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            <circle cx="10" cy="10" r="4" fill="var(--rose-mid)" />
            <circle cx="10" cy="10" r="2" fill="var(--cream)" />
          </svg>
          <div style={{ height: '1px', width: '80px', background: 'var(--rose-mid)' }} />
        </div>

        {/* Start button */}
        <button
          onClick={onStart}
          style={{
            display: 'block',
            width: '100%',
            maxWidth: '320px',
            margin: '0 auto 1rem',
            padding: '1rem 2.5rem',
            background: 'var(--rose-deep)',
            color: 'var(--cream)',
            fontFamily: 'var(--font-sans)',
            fontSize: '1.3rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-warm)',
            transition: 'background 0.2s, transform 0.1s',
            minHeight: '56px',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--mauve-dark)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--rose-deep)'; }}
          onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.97)'; }}
          onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
        >
          Start Game
        </button>

        {/* Setup link */}
        <button
          onClick={onSetupTeams}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--rose-deep)',
            fontFamily: 'var(--font-sans)',
            fontSize: '1rem',
            textDecoration: 'underline',
            cursor: 'pointer',
            padding: '0.5rem',
            minHeight: '48px',
            minWidth: '48px',
          }}
        >
          Setup Teams
        </button>
      </div>
    </div>
  );
}
