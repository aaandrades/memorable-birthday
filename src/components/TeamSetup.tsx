import { useState } from 'react';

interface Team {
  name: string;
  score: number;
}

interface Props {
  initialTeams: Team[];
  onBegin: (teams: Team[]) => void;
  onBack: () => void;
}

const btnBase: React.CSSProperties = {
  padding: '0.6rem 1.2rem',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontFamily: 'var(--font-sans)',
  fontSize: '1rem',
  fontWeight: 600,
  minHeight: '48px',
  minWidth: '48px',
  transition: 'background 0.15s, transform 0.1s',
};

export function TeamSetup({ initialTeams, onBegin, onBack }: Props) {
  const [teams, setTeams] = useState<Team[]>(
    initialTeams.length >= 2 ? initialTeams : [
      { name: 'Team 1', score: 0 },
      { name: 'Team 2', score: 0 },
    ]
  );

  const addTeam = () => {
    if (teams.length < 8) {
      setTeams([...teams, { name: `Team ${teams.length + 1}`, score: 0 }]);
    }
  };

  const removeTeam = (i: number) => {
    if (teams.length > 2) {
      setTeams(teams.filter((_, idx) => idx !== i));
    }
  };

  const rename = (i: number, name: string) => {
    setTeams(teams.map((t, idx) => idx === i ? { ...t, name } : t));
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        animation: 'slideUpFade 0.4s ease both',
      }}
    >
      <div
        style={{
          background: 'var(--linen)',
          borderRadius: '16px',
          padding: '2.5rem',
          width: '100%',
          maxWidth: '540px',
          boxShadow: 'var(--shadow-warm)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '2rem',
            color: 'var(--brown-warm)',
            marginTop: 0,
            marginBottom: '1.75rem',
            textAlign: 'center',
          }}
        >
          Setup Teams
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {teams.map((team, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <input
                type="text"
                value={team.name}
                onChange={(e) => rename(i, e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.75rem 1rem',
                  background: 'var(--cream)',
                  border: '1.5px solid var(--rose-light)',
                  borderRadius: '8px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.1rem',
                  color: 'var(--brown-warm)',
                  outline: 'none',
                  minHeight: '48px',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--rose-mid)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--rose-light)'; }}
                aria-label={`Team ${i + 1} name`}
              />
              <button
                onClick={() => removeTeam(i)}
                disabled={teams.length <= 2}
                style={{
                  ...btnBase,
                  background: teams.length <= 2 ? 'var(--rose-light)' : 'var(--rose-mid)',
                  color: 'var(--cream)',
                  opacity: teams.length <= 2 ? 0.5 : 1,
                  padding: '0.6rem 0.9rem',
                  fontSize: '1.2rem',
                }}
                aria-label={`Remove ${team.name}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Add team */}
        {teams.length < 8 && (
          <button
            onClick={addTeam}
            style={{
              ...btnBase,
              width: '100%',
              background: 'var(--cream)',
              color: 'var(--rose-deep)',
              border: '2px dashed var(--rose-mid)',
              marginBottom: '1.5rem',
              fontSize: '1rem',
            }}
          >
            + Add Team
          </button>
        )}

        {/* Action row */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={onBack}
            style={{
              ...btnBase,
              flex: 1,
              background: 'var(--cream)',
              color: 'var(--brown-warm)',
              border: '1.5px solid var(--rose-light)',
            }}
          >
            ← Back
          </button>
          <button
            onClick={() => onBegin(teams)}
            style={{
              ...btnBase,
              flex: 2,
              background: 'var(--rose-deep)',
              color: 'var(--cream)',
              fontSize: '1.2rem',
              boxShadow: 'var(--shadow-warm)',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--mauve-dark)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--rose-deep)'; }}
          >
            Begin! 🎉
          </button>
        </div>
      </div>
    </div>
  );
}
