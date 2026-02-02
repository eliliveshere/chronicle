import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticlesBG from './ParticlesBG';

// Import Assets
import card1 from '../assets/demo/card1.png';
import card2 from '../assets/demo/card2.png';
import card3 from '../assets/demo/card3.png';
import card4 from '../assets/demo/card4.png';

import voice1 from '../assets/demo/voice1.mp3';
import voice2 from '../assets/demo/voice2.mp3';
import voice3 from '../assets/demo/voice3.mp3';
import voice4 from '../assets/demo/voice4.mp3';

import bg1 from '../assets/demo/bg1.mp3';
import bg2 from '../assets/demo/bg2.mp3';
import bg3 from '../assets/demo/bg3.mp3';
import bg4 from '../assets/demo/bg4.mp3';

// --- DEMO CONTENT CONFIG ---
const QUEST_STEPS = [
    {
        id: 1,
        title: "THE AWAKENED ONE",
        image: card1,
        narration: voice1,
        ambient: bg1,
        prompt: "You wake beneath a blackened sky,\nyour name already forgotten by the world.\n\nA symbol burns faintly on your palm—\nproof of a vow you do not remember making.\n\nIn the distance,\nsomething ancient has noticed you."
    },
    {
        id: 2,
        title: "THE SHAPE IN THE DARK",
        image: card2,
        narration: voice2,
        ambient: bg2,
        prompt: "Your grip tightens around the hilt as the darkness answers at last.\n\nA massive shape stirs, its breath slow and heavy, rolling through the cavern like distant thunder.\nScales catch the faintest trace of light.\n\nYou are no longer alone."
    },
    {
        id: 3,
        title: "FIRE ANSWERS WORDS",
        image: card3,
        narration: voice3,
        ambient: bg3,
        prompt: "Your challenge breaks the silence — and the silence breaks in return.\n\nFlame erupts from the darkness, a roaring tide of heat and fury.\nYou raise your shield as fire crashes against it, the force driving you to one knee.\n\nThe mark on your palm burns white-hot."
    },
    {
        id: 4,
        title: "WILL AGAINST FLAME",
        image: card4,
        narration: voice4,
        ambient: bg4,
        prompt: "You stand your ground as power surges through the symbol you bear.\n\nBlue light tears from your grasp, meeting the dragon’s fire head-on.\nMagic and flame collide, shaking the cavern in a clash older than memory.\n\nThe world seems to hold its breath."
    }
];

type QuestState = 'A_ART_REVEAL' | 'B_NARRATION' | 'C_CHOICE_PROMPT' | 'D_RESPONSE';

export default function QuestFlow() {
    const [stepIndex, setStepIndex] = useState(0);
    const [questState, setQuestState] = useState<QuestState>('A_ART_REVEAL');
    const [response, setResponse] = useState('');
    const [isSealed, setIsSealed] = useState(false);
    const [audioError, setAudioError] = useState('');
    const [bgDuration, setBgDuration] = useState(5); // Default fallback

    // Timer State
    const [isPlayingBg, setIsPlayingBg] = useState(false);
    // countdown removed as it is now purely visual/CSS driven

    // Derived Assets
    const currentStep = QUEST_STEPS[stepIndex];

    // Audio Refs
    const ambientRef = useRef<HTMLAudioElement | null>(null);
    const narrationRef = useRef<HTMLAudioElement | null>(null);

    // Force reset audio sources when step changes
    useEffect(() => {
        if (ambientRef.current) {
            ambientRef.current.load();
        }
        if (narrationRef.current) {
            narrationRef.current.load();
        }
    }, [stepIndex]);

    // Cleanup timer no longer needed as we rely on audio events

    // 1. Play Chronicle Sequence: BG (5s) -> Narration
    const handlePlayChronicle = () => {
        setAudioError('');
        setIsPlayingBg(true);
        // Visuals are handled by CSS/SVG animation duration

        // Play Ambient (BG Noise) First
        if (ambientRef.current && currentStep.ambient) {
            // Ensure it is not looping for this sequence
            ambientRef.current.loop = false;
            ambientRef.current.volume = 0.5; // Bump volume for FX
            ambientRef.current.currentTime = 0;

            // Wait for metadata to get valid duration if possible, or force play
            if (ambientRef.current.duration && !isNaN(ambientRef.current.duration) && ambientRef.current.duration !== Infinity) {
                setBgDuration(ambientRef.current.duration);
            } else {
                // Fallback or attempt to read once loaded
                ambientRef.current.onloadedmetadata = () => {
                    if (ambientRef.current && ambientRef.current.duration) {
                        setBgDuration(ambientRef.current.duration);
                    }
                };
            }

            ambientRef.current.play().catch(err => {
                console.error("Ambient play failed", err);
                // Fallback: start narration immediately if BG fails
                startNarrationPhase();
            });
        } else {
            startNarrationPhase();
        }
    };

    // stopTimerAndStartNarration removed, using startNarrationPhase directly

    const startNarrationPhase = () => {
        setIsPlayingBg(false);
        setQuestState('B_NARRATION');
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

    const handleAmbientEnded = () => {
        // When BG noise finishes, transition to narration
        if (questState === 'A_ART_REVEAL') {
            startNarrationPhase();
        }
    };

    // 2. Replay
    const handleReplay = (e: React.MouseEvent) => {
        e.stopPropagation();
        playNarration();
    };

    // 3. Narration End
    const handleNarrationEnded = () => {
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

        // Stop Audio
        if (ambientRef.current) {
            ambientRef.current.pause();
            ambientRef.current.currentTime = 0;
        }
        if (narrationRef.current) {
            narrationRef.current.pause();
            narrationRef.current.currentTime = 0;
        }

        // Demo Mode Logic: Auto-advance after delay
        if (stepIndex < QUEST_STEPS.length - 1) {
            setTimeout(() => {
                handleNextStep();
            }, 3000); // 3 second pause to read "Fate Sealed"
        }
    };

    const handleNextStep = () => {
        // Advance to next step
        setStepIndex(prev => prev + 1);

        // Reset State
        setQuestState('A_ART_REVEAL');
        setResponse('');
        setIsSealed(false);
        setIsPlayingBg(false);
    };

    // Check if we are finished with the demo
    const isDemoComplete = isSealed && stepIndex === QUEST_STEPS.length - 1;

    return (
        <>
            <audio
                ref={ambientRef}
                src={currentStep.ambient}
                loop={false} // Managed by logic, but default to false for 1-shot BG
                preload="auto"
                playsInline
                onEnded={handleAmbientEnded}
            />
            <audio
                ref={narrationRef}
                src={currentStep.narration}
                preload="auto"
                playsInline
                onEnded={handleNarrationEnded}
            />

            <ParticlesBG />

            {/* GLOBAL CONTAINER */}
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
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentStep.image}
                            src={currentStep.image}
                            alt="Quest Background"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.8 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                position: 'absolute',
                                inset: 0
                            }}
                        />
                    </AnimatePresence>
                    {/* Base Vignette */}
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 40%, #000 100%)' }} />
                </div>


                {/* 2. OVERLAYS */}
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
                                {!isPlayingBg ? (
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
                                        disabled={isDemoComplete}
                                    >
                                        {isDemoComplete ? "Demo Complete" : "Play Chronicle"}
                                    </button>
                                ) : (
                                    <div style={{ position: 'relative', width: '50px', height: '50px' }}>
                                        <svg width="50" height="50" viewBox="0 0 50 50" style={{ transform: 'rotate(-90deg)' }}>
                                            {/* Track */}
                                            <circle
                                                cx="25" cy="25" r="22"
                                                stroke="rgba(207, 181, 59, 0.2)"
                                                strokeWidth="3"
                                                fill="transparent"
                                            />
                                            {/* Progress Fill */}
                                            <motion.circle
                                                cx="25" cy="25" r="22"
                                                stroke="#cfb53b"
                                                strokeWidth="3"
                                                fill="transparent"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: bgDuration, ease: "linear" }}
                                            />
                                        </svg>
                                    </div>
                                )}
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
                                    marginBottom: '1rem',
                                    textTransform: 'uppercase'
                                }}>
                                    {currentStep.title}
                                </span>

                                <motion.p
                                    key={currentStep.prompt} // Animate text change
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    style={{
                                        fontFamily: 'Cinzel, serif',
                                        fontSize: '1rem',
                                        lineHeight: '1.6',
                                        color: '#e0e0e0',
                                        textShadow: '0 2px 10px rgba(0,0,0,1)',
                                        whiteSpace: 'pre-wrap',
                                        maxWidth: '32ch',
                                        margin: '0 auto'
                                    }}
                                >
                                    {currentStep.prompt}
                                </motion.p>

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
                                        {isDemoComplete ? "JOURNEY COMPLETE" : "FATE SEALED"}
                                    </h3>
                                    <p style={{ color: '#555', fontSize: '0.9rem' }}>
                                        {isDemoComplete ? "Thank you for playing." : "The threads of fate realign..."}
                                    </p>
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
