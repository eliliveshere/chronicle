import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Screens
import HomeScreen from './components/onboarding/HomeScreen';
import OriginBuilder from './components/onboarding/OriginBuilder';
import type { OriginData } from './components/onboarding/OriginBuilder';
import ConfirmationScreen from './components/onboarding/ConfirmationScreen';
import QuestFlow from './components/QuestFlow';

type AppState = 'HOME' | 'BUILDER' | 'CONFIRMATION' | 'QUEST';

export default function App() {
  const [appState, setAppState] = useState<AppState>('HOME');
  const [originData, setOriginData] = useState<OriginData | null>(null);

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
      <AnimatePresence mode="wait">

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
