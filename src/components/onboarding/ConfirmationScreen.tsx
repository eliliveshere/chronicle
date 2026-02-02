import { motion } from 'framer-motion';
import type { OriginData } from './OriginBuilder';

interface ConfirmationScreenProps {
    data: OriginData;
    onConfirm: () => void;
}

export default function ConfirmationScreen({ data, onConfirm }: ConfirmationScreenProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width: '100vw',
                padding: '1.5rem',
                boxSizing: 'border-box',
                background: '#000',
                color: '#e0e0e0',
                textAlign: 'center',
                overflow: 'hidden'
            }}
        >
            <h2 style={{
                fontFamily: 'Cinzel',
                color: '#cfb53b',
                marginBottom: '2rem',
                fontSize: 'clamp(1.5rem, 6vw, 2rem)',
                lineHeight: '1.2'
            }}>
                This is the beginning.
            </h2>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                marginBottom: '2.5rem',
                textAlign: 'center',
                maxWidth: '500px',
                width: '100%'
            }}>
                <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>World</span>
                    <span style={{ display: 'block', fontSize: 'clamp(1rem, 4vw, 1.2rem)', fontFamily: 'Cinzel', lineHeight: '1.3' }}>{data.world}</span>
                </div>
                <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>Identity</span>
                    <span style={{ display: 'block', fontSize: 'clamp(1rem, 4vw, 1.2rem)', fontFamily: 'Cinzel', lineHeight: '1.3' }}>{data.role}</span>
                </div>
                <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>Opening State</span>
                    <span style={{
                        display: 'block',
                        fontSize: 'clamp(0.9rem, 3.5vw, 1.1rem)',
                        fontFamily: 'Inter',
                        fontStyle: 'italic',
                        marginTop: '0.25rem',
                        color: '#aaa',
                        lineHeight: '1.5'
                    }}>"{data.opening}"</span>
                </div>
            </div>

            <p style={{ color: '#555', marginBottom: '2.5rem', fontSize: '0.9rem' }}>
                Your story will continue one day at a time.
            </p>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onConfirm}
                style={{
                    padding: '1rem 2rem',
                    background: '#cfb53b',
                    border: 'none',
                    color: '#000',
                    fontFamily: 'Cinzel, serif',
                    fontSize: 'clamp(0.9rem, 4vw, 1rem)',
                    fontWeight: 'bold',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    borderRadius: '2px',
                    boxShadow: '0 0 20px rgba(207, 181, 59, 0.3)',
                    width: '100%',
                    maxWidth: '300px'
                }}
            >
                Start Day One
            </motion.button>

        </motion.div>
    );
}
