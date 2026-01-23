# ONE CARD QUEST (MAX-POLISH)

A premium, ritualistic daily journaling game built with React, Framer Motion, and PWA capabilities.

## The Ritual
Every day, you receive exactly **ONE** card and **ONE** prompt.
- **Listen**: Ambient audio sets the mood.
- **Reflect**: The prompt asks a difficult question.
- **Answer**: Commit your choice to the Book of Days.
- **Seal**: Once submitted, your fate is locked until tomorrow.

## Architecture

- **React + TypeScript + Vite**: Core framework.
- **Framer Motion**: High-end animations (Tilt, Reveal, Seal).
- **IndexedDB**: Persistent local storage of your journey.
- **PWA**: Installable, offline-capable.
- **WebAudio**: Synthesized SFX and ambient controls.

## Project Structure

```
src/
├── components/       # UI Components (TiltCard, ParticlesBG, LogDrawer...)
├── lib/
│   ├── ai/           # Stubs for Prompt/Image/Audio generation
│   ├── story/        # Story Acts and Constraints
│   ├── storage.ts    # Database layer
│   └── audio.ts      # Audio Engine (Synthesis + Ducking)
├── App.tsx           # Main Game Loop
└── types.ts          # Core Types
```

## How to Extend

### Connecting Real AI
1. **Text**: Edit `src/lib/ai/index.ts` -> `generateNextPrompt`. Replace the deterministic mock with an LLM call.
2. **Images**: Edit `src/lib/ai/index.ts` -> `generateSoraImage`. Connect to DALL-E/Sora.
3. **Audio**: Edit `src/lib/audio.ts`.

### Assets
Place real audio files in `public/placeholders/` (`ambient.mp3`, `page.mp3`, `seal.mp3`) and the app will prioritize them over synthesis if configured.

## Install & Run

```bash
npm install
npm run dev
```

Build for production (PWA):
```bash
npm run build
```
