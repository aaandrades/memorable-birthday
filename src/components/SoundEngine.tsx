import { useRef, useCallback } from 'react';

let sharedCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  try {
    if (!sharedCtx) {
      sharedCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return sharedCtx;
  } catch {
    return null;
  }
}

function masterGain(ctx: AudioContext, volume: number): GainNode {
  const g = ctx.createGain();
  g.gain.value = (volume / 100) * 0.3;
  g.connect(ctx.destination);
  return g;
}

export interface SoundEngine {
  questionReveal: () => void;
  answerReveal: () => void;
  scoreAwarded: () => void;
  questionTransition: () => void;
  finalFanfare: () => void;
}

export function useSoundEngine(volume: number): SoundEngine {
  const volRef = useRef(volume);
  volRef.current = volume;

  const questionReveal = useCallback(() => {
    try {
      const ctx = getCtx();
      if (!ctx) return;
      const g = masterGain(ctx, volRef.current);
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(150, ctx.currentTime + 0.3);
      const env = ctx.createGain();
      env.gain.setValueAtTime(0.6, ctx.currentTime);
      env.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
      osc.connect(env);
      env.connect(g);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    } catch { /* silent */ }
  }, []);

  const answerReveal = useCallback(() => {
    try {
      const ctx = getCtx();
      if (!ctx) return;
      const g = masterGain(ctx, volRef.current);
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = 600;
      const env = ctx.createGain();
      env.gain.setValueAtTime(0.7, ctx.currentTime);
      env.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(env);
      env.connect(g);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } catch { /* silent */ }
  }, []);

  const scoreAwarded = useCallback(() => {
    try {
      const ctx = getCtx();
      if (!ctx) return;
      const g = masterGain(ctx, volRef.current);
      [400, 600].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const env = ctx.createGain();
        env.gain.setValueAtTime(0, ctx.currentTime);
        env.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.02 + i * 0.01);
        env.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.connect(env);
        env.connect(g);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.4);
      });
    } catch { /* silent */ }
  }, []);

  const questionTransition = useCallback(() => {
    try {
      const ctx = getCtx();
      if (!ctx) return;
      const g = masterGain(ctx, volRef.current);
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = 880;
      const env = ctx.createGain();
      env.gain.setValueAtTime(0.5, ctx.currentTime);
      env.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
      osc.connect(env);
      env.connect(g);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.6);
    } catch { /* silent */ }
  }, []);

  const finalFanfare = useCallback(() => {
    try {
      const ctx = getCtx();
      if (!ctx) return;
      const g = masterGain(ctx, volRef.current);
      // C4=261.63, E4=329.63, G4=392.00, C5=523.25
      [261.63, 329.63, 392.0, 523.25].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        const env = ctx.createGain();
        const t = ctx.currentTime + i * 0.1;
        env.gain.setValueAtTime(0.5, t);
        env.gain.linearRampToValueAtTime(0, t + 0.5);
        osc.connect(env);
        env.connect(g);
        osc.start(t);
        osc.stop(t + 0.5);
      });
    } catch { /* silent */ }
  }, []);

  return { questionReveal, answerReveal, scoreAwarded, questionTransition, finalFanfare };
}
