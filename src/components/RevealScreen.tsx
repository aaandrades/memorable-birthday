import { useCallback } from 'react';
import type { Question } from '../data/questions';

interface Team {
  name: string;
  score: number;
}

interface Props {
  question: Question;
  teams: Team[];
  isLastQuestion: boolean;
  onScore: (teamIndex: number) => void;
  onUndoScore: () => void;
  onNext: () => void;
  canUndo: boolean;
}

const TEAM_COLORS = [
  '#8B5A6A',
  '#8FA882',
  '#7B6FA0',
  '#C47D3A',
  '#5C3040',
  '#4A7A8A',
];

function spawnScorePop(btn: HTMLButtonElement) {
  const rect = btn.getBoundingClientRect();
  const pop = document.createElement('div');
  pop.textContent = '+100!';
  pop.className = 'score-pop';
  pop.style.left = `${rect.left + rect.width / 2 - 28}px`;
  pop.style.top = `${rect.top - 10}px`;
  pop.style.position = 'fixed';
  document.body.appendChild(pop);
  setTimeout(() => pop.remove(), 1000);
}

interface ScoreButtonProps {
  team: Team;
  index: number;
  onClick: (i: number, btn: HTMLButtonElement) => void;
}

function ScoreButton({ team, index, onClick }: ScoreButtonProps) {
  const color = TEAM_COLORS[index % TEAM_COLORS.length];

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    spawnScorePop(btn);
    // Brief sage-light pulse via class swap
    btn.style.background = 'var(--sage-light)';
    btn.style.color = 'var(--brown-warm)';
    setTimeout(() => {
      btn.style.background = color;
      btn.style.color = 'var(--cream)';
    }, 350);
    onClick(index, btn);
  }, [index, color, onClick]);

  return (
    <button
      onClick={handleClick}
      style={{
        position: 'relative',
        padding: '0.9rem 1.4rem',
        background: color,
        color: 'var(--cream)',
        fontFamily: 'var(--font-sans)',
        fontSize: '1.1rem',
        fontWeight: 700,
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        boxShadow: 'var(--shadow-warm)',
        minHeight: '56px',
        minWidth: '130px',
        transition: 'background 0.15s, transform 0.1s',
        textAlign: 'left',
        letterSpacing: '0.02em',
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1.12)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.filter = ''; }}
      onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.95)'; }}
      onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
      aria-label={`Award 100 points to ${team.name}`}
    >
      <span style={{ fontSize: '0.8rem', opacity: 0.85, display: 'block', marginBottom: '2px' }}>+100</span>
      {team.name}
    </button>
  );
}

export function RevealScreen({
  question,
  teams,
  isLastQuestion,
  onScore,
  onUndoScore,
  onNext,
  canUndo,
}: Props) {
  const handleScore = useCallback(
    (i: number, _btn: HTMLButtonElement) => { onScore(i); },
    [onScore]
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        gap: '2rem',
      }}
    >
      {/* Answer */}
      <div
        className="animate-scale-reveal"
        style={{
          background: 'var(--linen)',
          borderRadius: '16px',
          padding: '2rem 3rem',
          boxShadow: 'var(--shadow-warm)',
          textAlign: 'center',
          maxWidth: '700px',
          width: '100%',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
            color: 'var(--rose-mid)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
          }}
        >
          Answer
        </div>
        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            color: 'var(--rose-deep)',
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          {question.answer}
        </div>
        {question.question && (
          <div
            style={{
              marginTop: '1rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: 'var(--brown-warm)',
              opacity: 0.7,
              fontStyle: 'italic',
            }}
          >
            {question.question}
          </div>
        )}
      </div>

      {/* Score buttons */}
      <div>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1rem',
            color: 'var(--brown-warm)',
            textAlign: 'center',
            marginBottom: '0.75rem',
            letterSpacing: '0.04em',
          }}
        >
          Award points:
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            justifyContent: 'center',
            maxWidth: '800px',
          }}
        >
          {teams.map((team, i) => (
            <ScoreButton key={i} team={team} index={i} onClick={handleScore} />
          ))}
        </div>
      </div>

      {/* Bottom actions */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
        {canUndo && (
          <button
            onClick={onUndoScore}
            style={{
              padding: '0.6rem 1.2rem',
              background: 'none',
              border: '1.5px solid var(--rose-mid)',
              borderRadius: '6px',
              color: 'var(--rose-deep)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.95rem',
              cursor: 'pointer',
              minHeight: '48px',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--rose-light)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'none'; }}
          >
            ↩ Undo Last Score
          </button>
        )}
        <button
          onClick={onNext}
          style={{
            padding: '0.9rem 2.5rem',
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
          {isLastQuestion ? 'See Final Scores →' : 'Next Question →'}
        </button>
      </div>
    </div>
  );
}
