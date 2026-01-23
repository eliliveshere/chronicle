import { useState } from 'react';

// Singletons for audio context to avoid overlay
let audioCtx: AudioContext | null = null;
let ambientSource: AudioBufferSourceNode | null = null;
let ambientGain: GainNode | null = null;

const getCtx = () => {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioCtx;
};

// Simple synthesis for SFX if files missing, or load from URL
export const playSound = async (type: 'page' | 'seal') => {
    const ctx = getCtx();
    if (ctx.state === 'suspended') await ctx.resume();

    // Duck ambient if playing
    if (ambientGain) {
        ambientGain.gain.setTargetAtTime(0.1, ctx.currentTime, 0.1);
        setTimeout(() => {
            ambientGain?.gain.setTargetAtTime(0.5, ctx.currentTime + 0.5, 0.5);
        }, 1000); // Resume after 1s
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'page') {
        // Rustling noise-ish
        // WebAudio noise buffer is better, but simple osc sweep for placeholder
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'seal') {
        // Low impact thud
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(80, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + 0.5);
        gain.gain.setValueAtTime(0.5, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
    }
};

export const AudioController = () => {
    const [playing, setPlaying] = useState(false);

    const toggleAmbient = async () => {
        const ctx = getCtx();
        if (ctx.state === 'suspended') await ctx.resume();

        if (playing) {
            ambientSource?.stop();
            ambientSource = null;
            setPlaying(false);
        } else {
            // Create white noise buffer for ambient wind
            const bufferSize = ctx.sampleRate * 2; // 2 seconds
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }

            const noise = ctx.createBufferSource();
            noise.buffer = buffer;
            noise.loop = true;

            // Filter to make it sound like low wind
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 400;

            ambientGain = ctx.createGain();
            ambientGain.gain.value = 0.05; // Quiet

            noise.connect(filter);
            filter.connect(ambientGain);
            ambientGain.connect(ctx.destination);

            noise.start();
            ambientSource = noise;
            setPlaying(true);
        }
    };

    return { playing, toggleAmbient };
};
