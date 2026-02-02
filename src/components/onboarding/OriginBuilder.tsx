import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { triggerHaptic } from '../../lib/haptics';

export interface OriginData {
    world: string;
    role: string;
    opening: string;
}

interface OriginBuilderProps {
    onComplete: (data: OriginData) => void;
}

const WORLDS = [
    { id: 'medieval', title: 'Medieval', desc: 'Steel, vows, kingdoms, and forgotten gods.' },
    { id: 'cyberpunk', title: 'Cyberpunk', desc: 'Neon, decay, megastructures, and hidden power.' },
    { id: 'modern', title: 'Modern', desc: 'The world as it is — but not as it seems.' },
    { id: 'custom', title: 'Custom', desc: 'Define your own setting.' }
];

const ROLES: Record<string, string[]> = {
    medieval: ['Knight', 'Wanderer', 'Scholar', 'Custom'],
    cyberpunk: ['Runner', 'Engineer', 'Corporate Defector', 'Custom'],
    modern: ['Drifter', 'Professional', 'Observer', 'Custom'],
    custom: ['Custom']
};

const OPENINGS: Record<string, string[]> = {
    medieval: [
        "You have just arrived somewhere unfamiliar.",
        "Something important has been taken from you.",
        "You are hiding from a consequence."
    ],
    // Fallbacks for simplicity, can be expanded
    cyberpunk: [
        "You have just arrived somewhere unfamiliar.",
        "Something important has been taken from you.",
        "You are hiding from a consequence."
    ],
    modern: [
        "You have just arrived somewhere unfamiliar.",
        "Something important has been taken from you.",
        "You are hiding from a consequence."
    ],
    custom: []
};


export default function OriginBuilder({ onComplete }: OriginBuilderProps) {
    const [step, setStep] = useState(0); // 0: World, 1: Role, 2: Opening
    const [data, setData] = useState<OriginData>({ world: '', role: '', opening: '' });
    const [customInput, setCustomInput] = useState('');

    const handleSelection = (key: keyof OriginData, value: string) => {
        if (value === 'Custom' || (step === 0 && value === 'custom')) {
            // For custom world/role selection, we might want to show input immediately
            // But for simplicity of this wizard, let's treat "custom" selection as a trigger for the input UI
            triggerHaptic();
            setCustomInput('');
        } else {
            triggerHaptic();
            setData(prev => ({ ...prev, [key]: value }));
            // Auto-advance
            if (step < 2) {
                setStep(prev => prev + 1);
            } else {
                onComplete({ ...data, [key]: value });
            }
        }
    };

    const handleCustomSubmit = () => {
        if (!customInput.trim()) return;
        triggerHaptic();
        const key = step === 0 ? 'world' : step === 1 ? 'role' : 'opening';
        setData(prev => ({ ...prev, [key]: customInput }));
        setCustomInput('');

        if (step < 2) {
            setStep(prev => prev + 1);
        } else {
            onComplete({ ...data, [key]: customInput });
        }
    };

    // Renders
    const renderStep = () => {
        switch (step) {
            case 0: // World
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', width: '100%' }}>
                        <h2 style={{
                            fontFamily: 'Cinzel',
                            textAlign: 'center',
                            marginBottom: '1.5rem',
                            color: '#cfb53b',
                            fontSize: 'clamp(1.2rem, 5vw, 1.5rem)',
                            lineHeight: '1.4',
                            padding: '0 1rem'
                        }}>What kind of world does your story begin in?</h2>

                        {customInput === '' && !data.world && WORLDS.map(w => (
                            <motion.button
                                key={w.id}
                                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    if (w.id === 'custom') {
                                        triggerHaptic();
                                        setCustomInput(' '); // Trigger input mode
                                    } else {
                                        handleSelection('world', w.title);
                                    }
                                }}
                                style={cardStyle}
                            >
                                <span style={{ fontFamily: 'Cinzel', fontSize: '1.1rem', display: 'block' }}>{w.title}</span>
                                <span style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.25rem', display: 'block', lineHeight: '1.4' }}>{w.desc}</span>
                            </motion.button>
                        ))}

                        {/* Custom Input Mode */}
                        {(customInput.trim() !== '' || customInput === ' ') && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <input
                                    autoFocus
                                    value={customInput.trim()}
                                    onChange={e => setCustomInput(e.target.value)}
                                    placeholder="Describe your world..."
                                    style={inputStyle}
                                />
                                <button onClick={handleCustomSubmit} style={btnStyle}>Confirm World</button>
                            </div>
                        )}
                    </div>
                );
            case 1: // Role
                const worldKey = WORLDS.find(w => w.title === data.world)?.id || 'custom';
                const roles = ROLES[worldKey] || ROLES['custom'];

                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', width: '100%' }}>
                        <h2 style={{
                            fontFamily: 'Cinzel',
                            textAlign: 'center',
                            marginBottom: '1.5rem',
                            color: '#cfb53b',
                            fontSize: 'clamp(1.2rem, 5vw, 1.5rem)',
                            lineHeight: '1.4',
                            padding: '0 1rem'
                        }}>Who are you at the beginning of this story?</h2>

                        {customInput === '' && roles.map(r => (
                            <motion.button
                                key={r}
                                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                onClick={() => {
                                    if (r === 'Custom') {
                                        triggerHaptic();
                                        setCustomInput(' ');
                                    } else {
                                        handleSelection('role', r);
                                    }
                                }}
                                style={cardStyle}
                            >
                                <span style={{ fontFamily: 'Cinzel', fontSize: '1.2rem' }}>{r}</span>
                            </motion.button>
                        ))}

                        {(customInput.trim() !== '' || customInput === ' ') && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <input
                                    autoFocus
                                    value={customInput.trim()}
                                    onChange={e => setCustomInput(e.target.value)}
                                    placeholder="Role title..."
                                    style={inputStyle}
                                />
                                <button onClick={handleCustomSubmit} style={btnStyle}>Confirm Role</button>
                            </div>
                        )}
                    </div>
                );
            case 2: // Opening
                const wKey = WORLDS.find(w => w.title === data.world)?.id || 'custom';
                const openings = OPENINGS[wKey] || OPENINGS['medieval']; // fallback

                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', width: '100%' }}>
                        <h2 style={{
                            fontFamily: 'Cinzel',
                            textAlign: 'center',
                            marginBottom: '1.5rem',
                            color: '#cfb53b',
                            fontSize: 'clamp(1.2rem, 5vw, 1.5rem)',
                            lineHeight: '1.4',
                            padding: '0 1rem'
                        }}>
                            How does your story begin?
                        </h2>

                        {customInput === '' && openings.map((o, idx) => (
                            <motion.button
                                key={idx}
                                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                onClick={() => handleSelection('opening', o)}
                                style={cardStyle}
                            >
                                <span style={{ fontFamily: 'Inter', fontSize: '1rem', color: '#ddd' }}>"{o}"</span>
                            </motion.button>
                        ))}

                        {customInput === '' && (
                            <motion.button
                                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                onClick={() => { triggerHaptic(); setCustomInput(' '); }}
                                style={{ ...cardStyle, borderStyle: 'dashed', opacity: 0.6 }}
                            >
                                <span style={{ fontFamily: 'Cinzel', fontSize: '0.9rem' }}>Write your own opening...</span>
                            </motion.button>
                        )}

                        {(customInput.trim() !== '' || customInput === ' ') && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <textarea
                                    autoFocus
                                    value={customInput.trim()}
                                    onChange={e => setCustomInput(e.target.value)}
                                    placeholder="You wake up..."
                                    rows={4}
                                    style={{ ...inputStyle, resize: 'none' }}
                                />
                                <button onClick={handleCustomSubmit} style={btnStyle}>Confirm Opening</button>
                            </div>
                        )}
                    </div>
                );
        }
    };

    return (
        <motion.div
            key="wizard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                width: '100vw',
                padding: '1rem',
                boxSizing: 'border-box',
                background: '#000',
                color: '#fff',
                overflowX: 'hidden'
            }}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        maxWidth: '500px'
                    }}
                >
                    {renderStep()}
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}

// STYLES
const cardStyle: React.CSSProperties = {
    padding: '1rem',
    background: '#111',
    border: '1px solid #333',
    borderRadius: '4px',
    textAlign: 'left',
    cursor: 'pointer',
    width: '100%',
    color: '#eee',
    transition: 'border-color 0.2s',
    marginBottom: '0.5rem' // Add spacing via margin instead of flex gap for safety
};

const inputStyle: React.CSSProperties = {
    padding: '1rem',
    background: '#111',
    border: '1px solid #cfb53b',
    color: '#fff',
    fontFamily: 'Inter',
    fontSize: '1rem',
    outline: 'none',
    borderRadius: '4px',
    width: '100%'
};

const btnStyle: React.CSSProperties = {
    padding: '1rem',
    background: '#cfb53b',
    color: '#000',
    border: 'none',
    fontFamily: 'Cinzel',
    fontWeight: 'bold',
    cursor: 'pointer',
    borderRadius: '4px',
    width: '100%'
};
