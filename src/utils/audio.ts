// Web Audio API Synthesizer for Automotive Sounds
// Zero external assets required, 100% reliable, zero latency

let audioCtx: AudioContext | null = null;
let isAudioMuted = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const toggleAudioMute = (): boolean => {
  isAudioMuted = !isAudioMuted;
  return isAudioMuted;
};

export const getAudioMutedState = (): boolean => isAudioMuted;

// Engine Start & Rev
export const playEngineStart = () => {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  
  // Starter crank noise
  const bufferSize = ctx.sampleRate * 0.4;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.08));
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = 'bandpass';
  noiseFilter.frequency.setValueAtTime(150, now);
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.2, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start(now);

  // Engine ignition roar
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  osc1.type = 'sawtooth';
  osc2.type = 'triangle';

  // Pitch ramp up (revving up)
  osc1.frequency.setValueAtTime(55, now + 0.2);
  osc1.frequency.exponentialRampToValueAtTime(180, now + 0.5);
  osc1.frequency.exponentialRampToValueAtTime(80, now + 1.1);

  osc2.frequency.setValueAtTime(110, now + 0.2);
  osc2.frequency.exponentialRampToValueAtTime(360, now + 0.5);
  osc2.frequency.exponentialRampToValueAtTime(160, now + 1.1);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.22, now + 0.4);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

  const lowpass = ctx.createBiquadFilter();
  lowpass.type = 'lowpass';
  lowpass.frequency.setValueAtTime(400, now);
  lowpass.frequency.linearRampToValueAtTime(1200, now + 0.5);
  lowpass.frequency.linearRampToValueAtTime(500, now + 1.1);

  osc1.connect(lowpass);
  osc2.connect(lowpass);
  lowpass.connect(gain);
  gain.connect(ctx.destination);

  osc1.start(now + 0.2);
  osc2.start(now + 0.2);
  osc1.stop(now + 1.25);
  osc2.stop(now + 1.25);
};

// Dual-tone Automotive Car Horn
export const playCarHorn = () => {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  // Classic dual-tone frequencies: 400Hz and 500Hz
  osc1.type = 'sawtooth';
  osc2.type = 'sawtooth';
  osc1.frequency.setValueAtTime(380, now);
  osc2.frequency.setValueAtTime(475, now);

  gain.gain.setValueAtTime(0.01, now);
  gain.gain.linearRampToValueAtTime(0.18, now + 0.02);
  gain.gain.setValueAtTime(0.18, now + 0.22);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1800, now);

  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + 0.35);
  osc2.stop(now + 0.35);
};

// Subtle UI Click Feedback
export const playUiClick = () => {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

  gain.gain.setValueAtTime(0.06, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.05);
};
