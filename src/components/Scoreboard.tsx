import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface Team {
  name: string;
  score: number;
}

interface Props {
  teams: Team[];
  isFinal: boolean;
  onNext: () => void;       // "Next Question" or "Play Again"
  nextLabel: string;
}

const TEAM_COLORS = [
  '#8B5A6A',
  '#8FA882',
  '#7B6FA0',
  '#C47D3A',
  '#5C3040',
  '#4A7A8A',
];

export function Scoreboard({ teams, isFinal, onNext, nextLabel }: Props) {
  const confettiFired = useRef(false);

  useEffect(() => {
    if (isFinal && !confettiFired.current) {
      confettiFired.current = true;
      const end = Date.now() + 3000;
      const colors = ['#E8C4C4', '#C9959A', '#8B5A6A', '#8FA882', '#D4E5C8', '#F5EFE0'];
      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors,
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  }, [isFinal]);

  const sorted = [...teams].sort((a, b) => b.score - a.score);
  const maxScore = Math.max(...teams.map((t) => t.score), 1);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
        animation: 'slideUpFade 0.45s ease both',
      }}
    >
      {isFinal ? (
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: 'var(--rose-deep)',
            marginBottom: '0.5rem',
          }}
        >
          🎉 Happy 30th Esperanza! 🎉
        </h1>
      ) : (
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            color: 'var(--brown-warm)',
            marginBottom: '0.5rem',
          }}
        >
          Scoreboard
        </h2>
      )}

      {/* Bar chart */}
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          margin: '2rem 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        {sorted.map((team, i) => {
          const originalIndex = teams.indexOf(team);
          const color = TEAM_COLORS[originalIndex % TEAM_COLORS.length];
          const pct = (team.score / maxScore) * 100;
          const isLeader = i === 0 && team.score > 0;

          return (
            <div key={i}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '4px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--brown-warm)',
                }}
              >
                <span>
                  {isLeader && <span style={{ marginRight: '4px' }}>👑</span>}
                  {team.name}
                </span>
                <span style={{ color }}>{team.score} pts</span>
              </div>
              <div
                style={{
                  height: '36px',
                  background: 'var(--rose-light)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
              >
                <div
                  className="scoreboard-bar"
                  style={{
                    height: '100%',
                    width: `${pct}%`,
                    background: color,
                    borderRadius: '8px',
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '0.8s',
                    animationFillMode: 'both',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={onNext}
        style={{
          padding: '1rem 2.5rem',
          background: 'var(--rose-deep)',
          color: 'var(--cream)',
          fontFamily: 'var(--font-sans)',
          fontSize: '1.2rem',
          fontWeight: 700,
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          boxShadow: 'var(--shadow-warm)',
          minHeight: '56px',
          transition: 'background 0.2s, transform 0.1s',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--mauve-dark)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--rose-deep)'; }}
        onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.97)'; }}
        onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
      >
        {nextLabel}
      </button>
    </div>
  );
}
