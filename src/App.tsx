import { useRef, useState } from 'react'; // useEffect removed if not used, but cleaned up
import { motion, AnimatePresence } from 'framer-motion';
import ParticlesBG from './components/ParticlesBG';

// Hardcoded Assets
const ASSETS = {
  image: '/20260123_1203_Image Generation_simple_compose_01kfmg9ekqexn886868e4pmcqf.png',
  narration: '/ElevenLabs_2026-01-23T03_57_42_Myrrdin - Wise and Magical Narrator_pvc_sp100_s0_sb100_v3.mp3',
  ambient: '/Subtle_cavern_ambien_#1-1769140835320.mp3'
};

const PROMPT_TEXT = "You wake beneath a blackened sky,\nyour name already forgotten by the world.\n\nA symbol burns faintly on your palm—\nproof of a vow you do not remember making.\n\nIn the distance,\nsomething ancient has noticed you.";

type QuestState = 'A_ART_REVEAL' | 'B_NARRATION' | 'C_CHOICE_PROMPT' | 'D_RESPONSE';

export default function App() {
  const [questState, setQuestState] = useState<QuestState>('A_ART_REVEAL');
  const [response, setResponse] = useState('');
  const [isSealed, setIsSealed] = useState(false);
  const [audioError, setAudioError] = useState('');

  // Audio Refs (standard DOM elements)
  const ambientRef = useRef<HTMLAudioElement | null>(null);
  const narrationRef = useRef<HTMLAudioElement | null>(null);

  // 1. Play Chronicle (Ambient Loop + Narration Auto-Play)
  const handlePlayChronicle = () => {
    setQuestState('B_NARRATION'); // Advance UI

    // Start Ambient
    if (ambientRef.current) {
      ambientRef.current.volume = 0.2;
      ambientRef.current.play().catch(err => {
        console.error("Ambient play failed", err);
        setAudioError("Check audio permissions");
      });
    }

    // Start Narration Automatically
    playNarration();
  };

  // Helper for Narration
  const playNarration = () => {
    if (isSealed) return;
    if (narrationRef.current) {
      narrationRef.current.currentTime = 0;
      narrationRef.current.play().catch(err => {
        console.error("Narration play failed", err);
      });
    }
  };

  // 2. Replay (Manual Trigger)
  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    playNarration();
  };

  // 3. Handle End of Narration to Advance Flow
  const handleNarrationEnded = () => {
    // Reveal the choice prompt when narration finishes
    if (questState === 'B_NARRATION') {
      setQuestState('C_CHOICE_PROMPT');
    }
  };

  const handleOpenResponse = () => {
    setQuestState('D_RESPONSE');
  };

  const handleSubmit = () => {
    if (!response.trim()) return;
    setIsSealed(true);

    // Stop all audio permanently
    if (ambientRef.current) {
      ambientRef.current.pause();
      ambientRef.current.currentTime = 0;
    }
    if (narrationRef.current) {
      narrationRef.current.pause();
      narrationRef.current.currentTime = 0;
    }
  };

  return (
    <>
      <audio
        ref={ambientRef}
        src={ASSETS.ambient}
        loop
        preload="auto"
        playsInline
      />
      <audio
        ref={narrationRef}
        src={ASSETS.narration}
        preload="auto"
        playsInline
        onEnded={handleNarrationEnded}
      />

      <ParticlesBG />

      {/* GLOBAL CONTAINER: FIXED, NO SCROLL */}
      <div style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        background: '#000',
        fontFamily: 'Inter, sans-serif'
      }}>

        {/* 1. PERSISTENT BACKGROUND ART */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0
        }}>
          <img
            src={ASSETS.image}
            alt="Quest Background"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.8
            }}
          />
          {/* Base Vignette */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 40%, #000 100%)' }} />
        </div>


        {/* 2. OVERLAYS (Z-INDEX 10+) */}
        <AnimatePresence mode="wait">

          {/* STATE A: ART REVEAL BUTTON */}
          {questState === 'A_ART_REVEAL' && (
            <motion.div
              key="state-a"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute',
                bottom: '15%',
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                zIndex: 20
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <button
                  onClick={handlePlayChronicle}
                  style={{
                    padding: '1rem 2rem',
                    background: 'rgba(0,0,0,0.6)',
                    border: '1px solid #cfb53b',
                    color: '#cfb53b',
                    fontFamily: 'Cinzel, serif',
                    fontSize: '1rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    backdropFilter: 'blur(4px)',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    boxShadow: '0 0 20px rgba(207, 181, 59, 0.2)'
                  }}
                >
                  Play Chronicle
                </button>
                {audioError && <span style={{ color: '#ff6b6b', fontSize: '0.8rem', fontFamily: 'Inter' }}>{audioError}</span>}
              </div>
            </motion.div>
          )}

          {/* STATE B & C: DRAGGABLE BOTTOM SHEET */}
          {(questState === 'B_NARRATION' || questState === 'C_CHOICE_PROMPT') && (
            <motion.div
              key="state-bc"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 200 }}
              dragElastic={0.2}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '55%',
                background: 'linear-gradient(to top, #000 10%, rgba(0,0,0,0.95) 60%, transparent 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '0 1.5rem 3rem 1.5rem',
                zIndex: 20
              }}
            >
              {/* Drag Handle */}
              <div style={{
                width: '40px',
                height: '4px',
                background: 'rgba(255,255,255,0.3)',
                borderRadius: '2px',
                margin: '0 auto 1rem auto',
                flexShrink: 0
              }} />

              <div style={{ textAlign: 'center', marginBottom: 'auto', marginTop: '1rem', overflowY: 'auto' }}>
                <span style={{
                  fontFamily: 'Cinzel, serif',
                  color: '#666',
                  fontSize: '0.75rem',
                  letterSpacing: '0.2em',
                  display: 'block',
                  marginBottom: '1rem'
                }}>
                  ONE CARD QUEST
                </span>

                <p style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  color: '#e0e0e0',
                  textShadow: '0 2px 10px rgba(0,0,0,1)',
                  whiteSpace: 'pre-wrap',
                  maxWidth: '32ch',
                  margin: '0 auto'
                }}>
                  {PROMPT_TEXT}
                </p>

                {/* Replay Control */}
                <button
                  onClick={handleReplay}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#666',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.75rem',
                    marginTop: '1rem',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  Replay
                </button>
              </div>

              {/* STATE C ACTION */}
              {questState === 'C_CHOICE_PROMPT' && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleOpenResponse}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: '#cfb53b',
                    color: '#000',
                    border: 'none',
                    fontFamily: 'Cinzel, serif',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '1rem',
                    letterSpacing: '0.1em',
                    flexShrink: 0
                  }}
                >
                  WHAT DO YOU DO?
                </motion.button>
              )}
            </motion.div>
          )}

          {/* STATE D: DRAGGABLE RESPONSE SHEET */}
          {questState === 'D_RESPONSE' && (
            <motion.div
              key="state-d"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 250 }}
              dragElastic={0.2}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '60%',
                background: '#0a0a0a',
                borderTop: '1px solid #333',
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px',
                boxShadow: '0 -10px 50px rgba(0,0,0,0.8)',
                padding: '1rem 2rem 2rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 30,
                gap: '1rem'
              }}
            >
              {/* Drag Handle */}
              <div style={{
                width: '40px',
                height: '4px',
                background: '#333', // Darker handle on light/dark sheet
                borderRadius: '2px',
                margin: '0 auto',
                flexShrink: 0
              }} />

              {isSealed ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ textAlign: 'center', marginTop: '2rem' }}
                >
                  <div style={{
                    padding: '1rem',
                    borderLeft: '2px solid #333',
                    textAlign: 'left',
                    marginBottom: '2rem',
                    fontStyle: 'italic',
                    color: '#888'
                  }}>
                    "{response}"
                  </div>
                  <h3 style={{ fontFamily: 'Cinzel, serif', color: '#cfb53b', marginBottom: '0.5rem' }}>
                    FATE SEALED
                  </h3>
                  <p style={{ color: '#555', fontSize: '0.9rem' }}>Return tomorrow.</p>
                </motion.div>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{
                      fontFamily: 'Cinzel, serif',
                      color: '#aaa',
                      fontSize: '0.9rem',
                      margin: 0
                    }}>
                      The ancient thing waits...
                    </p>

                    <button
                      onClick={handleReplay}
                      style={{
                        background: 'transparent',
                        border: '1px solid #333',
                        borderRadius: '4px',
                        color: '#666',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.7rem',
                        padding: '0.2rem 0.5rem',
                        cursor: 'pointer',
                        textTransform: 'uppercase'
                      }}
                    >
                      Replay
                    </button>
                  </div>

                  <textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="What do you do?"
                    maxLength={600}
                    style={{
                      width: '100%',
                      flex: 1,
                      background: '#111',
                      border: '1px solid #333',
                      borderRadius: '8px',
                      padding: '1rem',
                      color: '#eee',
                      fontSize: '1rem',
                      fontFamily: 'Inter, sans-serif',
                      resize: 'none',
                      outline: 'none'
                    }}
                  />

                  <button
                    onClick={handleSubmit}
                    disabled={!response.trim()}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: response.trim() ? '#cfb53b' : '#222',
                      color: response.trim() ? '#000' : '#444',
                      border: 'none',
                      borderRadius: '4px',
                      fontFamily: 'Cinzel, serif',
                      fontWeight: 'bold',
                      cursor: response.trim() ? 'pointer' : 'default',
                      transition: 'all 0.3s'
                    }}
                  >
                    SEAL FATE
                  </button>
                </>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div >
    </>
  );
}
