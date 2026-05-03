import { useEffect, useRef } from 'react';
import type { Question } from '../data/questions';
import { ProgressBar } from './ProgressBar';

interface Team {
  name: string;
  score: number;
}

interface Props {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  teams: Team[];
  showHint: boolean;
  onReveal: () => void;
}

const TEAM_COLORS = [
  'var(--rose-deep)',
  'var(--sage)',
  '#7B6FA0',
  '#C47D3A',
  'var(--mauve-dark)',
  '#4A7A8A',
];

export function QuestionScreen({
  question,
  questionNumber,
  totalQuestions,
  teams,
  showHint,
  onReveal,
}: Props) {
  // Key changes trigger re-mount and re-animation
  const cardKey = question.id;
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showHint && hintRef.current) {
      hintRef.current.style.animation = 'none';
      void hintRef.current.offsetHeight; // reflow
      hintRef.current.style.animation = '';
    }
  }, [showHint]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '1.5rem 2rem',
        boxSizing: 'border-box',
      }}
    >
      {/* Top bar */}
      <div style={{ marginBottom: '1rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.6rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.1rem',
              color: 'var(--rose-deep)',
              fontWeight: 700,
              letterSpacing: '0.04em',
            }}
          >
            Question {questionNumber} of {totalQuestions}
          </span>

          {/* Mini score strip */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {teams.map((t, i) => (
              <div
                key={i}
                style={{
                  background: TEAM_COLORS[i % TEAM_COLORS.length],
                  color: 'var(--cream)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  padding: '0.3rem 0.7rem',
                  borderRadius: '20px',
                  whiteSpace: 'nowrap',
                }}
              >
                {t.name}: {t.score}
              </div>
            ))}
          </div>
        </div>
        <ProgressBar current={questionNumber - 1} total={totalQuestions} />
      </div>

      {/* Content area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          gap: '2rem',
          alignItems: 'flex-start',
        }}
      >
        {/* Question card */}
        <div
          key={cardKey}
          className="card-torn animate-slide-up"
          style={{
            flex: 1,
            background: 'var(--cream)',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-warm)',
            minHeight: '240px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
              color: 'var(--brown-warm)',
              lineHeight: 1.45,
              margin: 0,
            }}
          >
            {question.question}
          </p>
        </div>

        {/* Polaroid image (if present) */}
        {question.imageSrc && (
          <div
            className="animate-bounce-polaroid"
            style={{
              width: '220px',
              flexShrink: 0,
              background: 'white',
              padding: '12px 12px 40px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
              transform: 'rotate(-2deg)',
            }}
          >
            <img
              src={question.imageSrc}
              alt={question.imageAlt ?? ''}
              style={{ width: '100%', display: 'block', objectFit: 'cover', aspectRatio: '1/1' }}
            />
          </div>
        )}
      </div>

      {/* Hint area */}
      <div style={{ minHeight: '3rem', marginTop: '1rem' }}>
        {showHint && question.hint && (
          <div
            ref={hintRef}
            className="animate-hint"
            style={{
              background: 'var(--linen)',
              border: '1.5px solid var(--rose-light)',
              borderRadius: '8px',
              padding: '0.75rem 1.25rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '1.1rem',
              color: 'var(--rose-deep)',
              fontStyle: 'italic',
            }}
          >
            💡 {question.hint}
          </div>
        )}
      </div>

      {/* Reveal button */}
      <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        <button
          onClick={onReveal}
          style={{
            padding: '1rem 3rem',
            background: 'var(--rose-deep)',
            color: 'var(--cream)',
            fontFamily: 'var(--font-sans)',
            fontSize: '1.3rem',
            fontWeight: 700,
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-warm)',
            minHeight: '56px',
            letterSpacing: '0.06em',
            transition: 'background 0.2s, transform 0.1s',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--mauve-dark)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--rose-deep)'; }}
          onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.97)'; }}
          onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
        >
          Reveal Answer
        </button>
      </div>
    </div>
  );
}
