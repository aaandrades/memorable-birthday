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

  const hintTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sounds = useSoundEngine();

  useEffect(() => {
    return () => {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    };
  }, []);

  const startHintTimer = useCallback(() => {
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    setShowHint(false);
    hintTimerRef.current = setTimeout(() => setShowHint(true), 5_000);
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
      sounds.playQuestion();
      sounds.startProcess();
      setScreen('question');
      startHintTimer();
    },
    [sounds, startHintTimer]
  );

  const handleReveal = useCallback(() => {
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    sounds.playAnswer();
    setScreen('reveal');
  }, [sounds]);

  const handleScore = useCallback(
    (teamIndex: number) => {
      sounds.playScore();
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
      sounds.playWinner();
      setScreen('scoreboard');
    } else {
      setCurrentIndex(nextIndex);
      setShowHint(false);
      sounds.playQuestion();
      sounds.startProcess();
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
