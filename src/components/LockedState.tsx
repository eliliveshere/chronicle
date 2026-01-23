import { motion } from 'framer-motion';
import type { Entry } from '../types';

interface LockedStateProps {
    entry: Entry;
    nextUnlock: string; // "Tomorrow" or simpler
}

export const LockedState = ({ entry }: LockedStateProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '60vh',
                textAlign: 'center',
                color: '#444'
            }}
        >
            <motion.div
                animate={{ boxShadow: ['0 0 20px rgba(100,0,0,0)', '0 0 40px rgba(100,0,0,0.2)', '0 0 20px rgba(100,0,0,0)'] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: '#200',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '2rem',
                    border: '1px solid #400'
                }}
            >
                <span style={{ fontSize: '2rem', color: '#600' }}>🔒</span>
            </motion.div>

            <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.2rem',
                color: '#888',
                marginBottom: '1rem'
            }}>
                FATE SEALED
            </h2>

            <p style={{ maxWidth: '300px', fontSize: '0.9rem', lineHeight: '1.6', fontStyle: 'italic' }}>
                "{entry.response}"
            </p>

            <div style={{ marginTop: '3rem', fontSize: '0.75rem', letterSpacing: '2px', color: '#333' }}>
                RETURN TOMORROW
            </div>
        </motion.div>
    );
};
