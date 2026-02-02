import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import introAudio from './assets/demo/intro-withmusic.mp3';

// Screens
import LandingScreen from './components/onboarding/LandingScreen';
import IntroSequence from './components/onboarding/IntroSequence';
import HomeScreen from './components/onboarding/HomeScreen';
import OriginBuilder from './components/onboarding/OriginBuilder';
import type { OriginData } from './components/onboarding/OriginBuilder';
import ConfirmationScreen from './components/onboarding/ConfirmationScreen';
import QuestFlow from './components/QuestFlow';

type AppState = 'LANDING' | 'INTRO' | 'HOME' | 'BUILDER' | 'CONFIRMATION' | 'QUEST';

export default function App() {
  const [appState, setAppState] = useState<AppState>('LANDING');
  const [originData, setOriginData] = useState<OriginData | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleLandingStart = () => {
    setAppState('INTRO');
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play failed", e));
    }
  };

  const handleIntroComplete = () => {
    setAppState('BUILDER');
  };

  const handleBegin = () => {
    setAppState('BUILDER');
  };

  const handleBuilderComplete = (data: OriginData) => {
    setOriginData(data);
    setAppState('CONFIRMATION');
  };

  const handleConfirm = () => {
    setAppState('QUEST');
  };

  return (
    <div className="app-container" style={{ overflow: 'hidden', height: '100vh', width: '100vw', background: '#000' }}>
      <audio ref={audioRef} src={introAudio} />
      <AnimatePresence mode="wait">

        {appState === 'LANDING' && (
          <motion.div
            key="landing"
            exit={{ opacity: 0, transition: { duration: 1 } }}
          >
            <LandingScreen onStart={handleLandingStart} />
          </motion.div>
        )}

        {appState === 'INTRO' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5 } }}
          >
            <IntroSequence onComplete={handleIntroComplete} />
          </motion.div>
        )}

        {appState === 'HOME' && (
          <motion.div
            key="home"
            exit={{ opacity: 0, transition: { duration: 1 } }}
          >
            <HomeScreen onBegin={handleBegin} />
          </motion.div>
        )}

        {appState === 'BUILDER' && (
          <motion.div
            key="builder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <OriginBuilder onComplete={handleBuilderComplete} />
          </motion.div>
        )}

        {appState === 'CONFIRMATION' && originData && (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <ConfirmationScreen data={originData} onConfirm={handleConfirm} />
          </motion.div>
        )}

        {appState === 'QUEST' && (
          <motion.div
            key="quest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <QuestFlow />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
