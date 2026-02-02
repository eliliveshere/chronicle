import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticlesBG from '../ParticlesBG';

interface IntroSequenceProps {
    onComplete: () => void;
}

const TEXT_SEQUENCE = [
    { text: "Welcome… to your Chronicle.", delay: 900, duration: 3150 },
    { text: "What happens next…", delay: 4500, duration: 2700 },
    { text: "Is up to you.", delay: 7650, duration: 2700 },
    { text: "Each day marks one step forward in your story.", delay: 10800, duration: 4500 }
];

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
    const [currentLine, setCurrentLine] = useState<number>(-1);

    // Auto-start sequence
    useEffect(() => {
        // Sequence timers
        const timers: number[] = [];

        TEXT_SEQUENCE.forEach((item, index) => {
            const timer = setTimeout(() => {
                setCurrentLine(index);
            }, item.delay);
            timers.push(timer);
        });

        // Auto-complete after sequence
        const endTimer = setTimeout(() => {
            onComplete();
        }, 16200);
        timers.push(endTimer);

        return () => timers.forEach(t => clearTimeout(t));
    }, [onComplete]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
            background: '#000',
            color: '#fff',
            textAlign: 'center',
            fontFamily: 'Cinzel, serif',
            position: 'relative',
            overflow: 'hidden',
            padding: '2rem',
            boxSizing: 'border-box'
        }}>
            <ParticlesBG particleColor="rgba(207, 181, 59, 0.4)" bgStart="#050200" bgEnd="#000" />

            <div style={{ maxWidth: '600px', width: '100%', minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AnimatePresence mode="wait">
                    {currentLine >= 0 && currentLine < TEXT_SEQUENCE.length && (
                        <motion.h2
                            key={currentLine}
                            initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, scale: 0.95, filter: 'blur(5px)' }}
                            transition={{ duration: 1.5 }}
                            style={{
                                fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                                color: currentLine === 2 ? '#cfb53b' : '#e0e0e0', // Highlight "Is up to you"
                                lineHeight: '1.4',
                                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                            }}
                        >
                            {TEXT_SEQUENCE[currentLine].text}
                        </motion.h2>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
