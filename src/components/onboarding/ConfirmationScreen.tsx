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
                padding: '2rem',
                background: '#000',
                color: '#e0e0e0',
                textAlign: 'center'
            }}
        >
            <h2 style={{ fontFamily: 'Cinzel', color: '#cfb53b', marginBottom: '3rem', fontSize: '2rem' }}>
                This is the beginning.
            </h2>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                marginBottom: '3rem',
                textAlign: 'center',
                maxWidth: '500px'
            }}>
                <div>
                    <span style={{ display: 'block', fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em' }}>World</span>
                    <span style={{ display: 'block', fontSize: '1.2rem', fontFamily: 'Cinzel' }}>{data.world}</span>
                </div>
                <div>
                    <span style={{ display: 'block', fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Identity</span>
                    <span style={{ display: 'block', fontSize: '1.2rem', fontFamily: 'Cinzel' }}>{data.role}</span>
                </div>
                <div>
                    <span style={{ display: 'block', fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Opening State</span>
                    <span style={{ display: 'block', fontSize: '1.1rem', fontFamily: 'Inter', fontStyle: 'italic', marginTop: '0.5rem', color: '#aaa' }}>"{data.opening}"</span>
                </div>
            </div>

            <p style={{ color: '#555', marginBottom: '3rem' }}>
                Your story will continue one day at a time.
            </p>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onConfirm}
                style={{
                    padding: '1rem 3rem',
                    background: '#cfb53b',
                    border: 'none',
                    color: '#000',
                    fontFamily: 'Cinzel, serif',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    borderRadius: '2px',
                    boxShadow: '0 0 20px rgba(207, 181, 59, 0.3)'
                }}
            >
                Start Day One
            </motion.button>

        </motion.div>
    );
}
