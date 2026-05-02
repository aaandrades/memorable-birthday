import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect, useRef, useCallback } from 'react';
import { ALL_QUESTIONS } from '../data/questions';
import { useSoundEngine } from '../components/SoundEngine';
import { SplashScreen } from '../components/SplashScreen';
import { TeamSetup } from '../components/TeamSetup';
import { QuestionScreen } from '../components/QuestionScreen';
import { RevealScreen } from '../components/RevealScreen';
import { Scoreboard } from '../components/Scoreboard';
import '../styles/game.css';

export const Route = createFileRoute('/')({ component: TriviaGame });

type Screen = 'splash' | 'teamsetup' | 'question' | 'reveal' | 'scoreboard';

interface Team {
  name: string;
  score: number;
}

interface ScoreEvent {
  teamIndex: number;
  amount: number;
}

function fisherYates(len: number): number[] {
  const arr = Array.from({ length: len }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function SettingsPanel({
  volume,
  muted,
  onVolumeChange,
  onMuteToggle,
}: {
  volume: number;
  muted: boolean;
  onVolumeChange: (v: number) => void;
  onMuteToggle: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 1000 }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Settings"
        style={{
          background: 'var(--linen)',
          border: '1.5px solid var(--rose-light)',
          borderRadius: '50%',
          width: '44px',
          height: '44px',
          cursor: 'pointer',
          fontSize: '1.2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-warm)',
        }}
      >
        ⚙️
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: '52px',
            right: 0,
            background: 'var(--linen)',
            border: '1.5px solid var(--rose-light)',
            borderRadius: '12px',
            padding: '1rem 1.25rem',
            minWidth: '200px',
            boxShadow: 'var(--shadow-warm)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              color: 'var(--brown-warm)',
              marginBottom: '0.5rem',
              fontWeight: 600,
            }}
          >
            Volume
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button
              type="button"
              onClick={onMuteToggle}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.2rem',
                cursor: 'pointer',
                padding: '0.25rem',
                minWidth: '32px',
                minHeight: '32px',
              }}
              aria-label={muted ? 'Unmute' : 'Mute'}
            >
              {muted ? '🔇' : '🔊'}
            </button>
            <input
              type="range"
              min={0}
              max={100}
              value={muted ? 0 : volume}
              onChange={(e) => onVolumeChange(Number(e.target.value))}
              style={{ flex: 1 }}
              aria-label="Volume"
            />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                color: 'var(--brown-warm)',
                minWidth: '28px',
              }}
            >
              {muted ? 0 : volume}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function TriviaGame() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [questionOrder, setQuestionOrder] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [teams, setTeams] = useState<Team[]>([
    { name: 'Team 1', score: 0 },
    { name: 'Team 2', score: 0 },
  ]);
  const [showHint, setShowHint] = useState(false);
  const [scoreHistory, setScoreHistory] = useState<ScoreEvent[]>([]);
  const [volume, setVolume] = useState(60);
  const [muted, setMuted] = useState(false);

  const hintTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const effectiveVolume = muted ? 0 : volume;
  const sounds = useSoundEngine(effectiveVolume);

  useEffect(() => {
    return () => {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    };
  }, []);

  const startHintTimer = useCallback(() => {
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    setShowHint(false);
    hintTimerRef.current = setTimeout(() => setShowHint(true), 10_000);
  }, []);

  const handleStartGame = useCallback(() => {
    setScreen('teamsetup');
  }, []);

  const handleBegin = useCallback(
    (newTeams: Team[]) => {
      setTeams(newTeams.map((t) => ({ ...t, score: 0 })));
      setQuestionOrder(fisherYates(ALL_QUESTIONS.length));
      setCurrentIndex(0);
      setScoreHistory([]);
      setShowHint(false);
      sounds.questionTransition();
      setScreen('question');
      startHintTimer();
    },
    [sounds, startHintTimer]
  );

  const handleReveal = useCallback(() => {
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    sounds.answerReveal();
    setScreen('reveal');
  }, [sounds]);

  const handleScore = useCallback(
    (teamIndex: number) => {
      sounds.scoreAwarded();
      setTeams((prev) =>
        prev.map((t, i) => (i === teamIndex ? { ...t, score: t.score + 100 } : t))
      );
      setScoreHistory((prev) => [...prev, { teamIndex, amount: 100 }]);
    },
    [sounds]
  );

  const handleUndoScore = useCallback(() => {
    setScoreHistory((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      setTeams((ts) =>
        ts.map((t, i) =>
          i === last.teamIndex ? { ...t, score: Math.max(0, t.score - last.amount) } : t
        )
      );
      return prev.slice(0, -1);
    });
  }, []);

  const handleNextQuestion = useCallback(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= ALL_QUESTIONS.length) {
      sounds.finalFanfare();
      setScreen('scoreboard');
    } else {
      sounds.questionTransition();
      setCurrentIndex(nextIndex);
      setShowHint(false);
      setScreen('question');
      startHintTimer();
    }
  }, [currentIndex, sounds, startHintTimer]);

  const handlePlayAgain = useCallback(() => {
    setTeams((prev) => prev.map((t) => ({ ...t, score: 0 })));
    setQuestionOrder(fisherYates(ALL_QUESTIONS.length));
    setCurrentIndex(0);
    setScoreHistory([]);
    setShowHint(false);
    setScreen('splash');
  }, []);

  const currentQuestion =
    questionOrder.length > 0 ? ALL_QUESTIONS[questionOrder[currentIndex]] : ALL_QUESTIONS[0];

  const isFinal = currentIndex >= ALL_QUESTIONS.length - 1;

  return (
    <>
      <SettingsPanel
        volume={volume}
        muted={muted}
        onVolumeChange={setVolume}
        onMuteToggle={() => setMuted((m) => !m)}
      />

      {screen === 'splash' && (
        <SplashScreen onStart={handleStartGame} onSetupTeams={handleStartGame} />
      )}

      {screen === 'teamsetup' && (
        <TeamSetup
          initialTeams={teams}
          onBegin={handleBegin}
          onBack={() => setScreen('splash')}
        />
      )}

      {screen === 'question' && currentQuestion && (
        <QuestionScreen
          question={currentQuestion}
          questionNumber={currentIndex + 1}
          totalQuestions={ALL_QUESTIONS.length}
          teams={teams}
          showHint={showHint}
          onReveal={handleReveal}
        />
      )}

      {screen === 'reveal' && currentQuestion && (
        <RevealScreen
          question={currentQuestion}
          teams={teams}
          isLastQuestion={isFinal}
          onScore={handleScore}
          onUndoScore={handleUndoScore}
          onNext={handleNextQuestion}
          canUndo={scoreHistory.length > 0}
        />
      )}

      {screen === 'scoreboard' && (
        <Scoreboard
          teams={teams}
          isFinal={isFinal}
          onNext={handlePlayAgain}
          nextLabel={isFinal ? 'Play Again' : 'Next Question →'}
        />
      )}
    </>
  );
}
