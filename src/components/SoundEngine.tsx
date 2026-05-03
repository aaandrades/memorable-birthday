import { useRef, useCallback } from 'react';

function makeAudio(src: string, loop = false): HTMLAudioElement {
  const a = new Audio(src);
  a.loop = loop;
  return a;
}

export interface SoundEngine {
  playHoaHoa: () => void;
  playQuestion: () => void;
  startProcess: () => void;
  stopProcess: () => void;
  playAnswer: () => void;
  playScore: () => void;
  playWinner: () => void;
}

export function useSoundEngine(): SoundEngine {
  const questionAudio = useRef<HTMLAudioElement | null>(null);
  const processAudio = useRef<HTMLAudioElement | null>(null);
  const answerAudio = useRef<HTMLAudioElement | null>(null);
  const winnerAudio = useRef<HTMLAudioElement | null>(null);
  const scoreAudio = useRef<HTMLAudioElement | null>(null);
  const hoaHoaAudio = useRef<HTMLAudioElement | null>(null);

  function getQuestion() {
    if (!questionAudio.current) questionAudio.current = makeAudio('/question.mp3');
    return questionAudio.current;
  }
  function getProcess() {
    if (!processAudio.current) processAudio.current = makeAudio('/process.mp3', true);
    return processAudio.current;
  }
  function getAnswer() {
    if (!answerAudio.current) answerAudio.current = makeAudio('/answer.mp3');
    return answerAudio.current;
  }
  function getWinner() {
    if (!winnerAudio.current) winnerAudio.current = makeAudio('/winner.mp3');
    return winnerAudio.current;
  }
  function getScore() {
    if (!scoreAudio.current) scoreAudio.current = makeAudio('/score.mp3');
    return scoreAudio.current;
  }
  function getHoaHoa() {
    if (!hoaHoaAudio.current) hoaHoaAudio.current = makeAudio('/hoa-hoa.mp3');
    return hoaHoaAudio.current;
  }

  function stopAll() {
    [questionAudio, processAudio, answerAudio, winnerAudio].forEach((ref) => {
      if (ref.current) {
        ref.current.pause();
        ref.current.currentTime = 0;
      }
    });
  }

  const playHoaHoa = useCallback(() => {
    const a = getHoaHoa();
    a.currentTime = 0;
    a.play().catch(() => { /* browser autoplay policy */ });
  }, []);

  const playQuestion = useCallback(() => {
    stopAll();
    const a = getQuestion();
    a.currentTime = 0;
    a.play().catch(() => { /* browser autoplay policy */ });
  }, []);

  const startProcess = useCallback(() => {
    const a = getProcess();
    a.currentTime = 0;
    a.play().catch(() => { /* browser autoplay policy */ });
  }, []);

  const stopProcess = useCallback(() => {
    const a = getProcess();
    a.pause();
    a.currentTime = 0;
  }, []);

  const playAnswer = useCallback(() => {
    stopAll();
    const a = getAnswer();
    a.currentTime = 0;
    a.play().catch(() => { /* browser autoplay policy */ });
  }, []);

  const playScore = useCallback(() => {
    const a = getScore();
    a.currentTime = 0;
    a.play().catch(() => { /* browser autoplay policy */ });
  }, []);

  const playWinner = useCallback(() => {
    stopAll();
    const a = getWinner();
    a.currentTime = 0;
    a.play().catch(() => { /* browser autoplay policy */ });
  }, []);

  return { playHoaHoa, playQuestion, startProcess, stopProcess, playAnswer, playScore, playWinner };
}
