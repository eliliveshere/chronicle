import { motion } from 'framer-motion';

interface HomeScreenProps {
    onBegin: () => void;
}

export default function HomeScreen({ onBegin }: HomeScreenProps) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
            padding: '1.5rem',
            boxSizing: 'border-box',
            background: 'radial-gradient(circle at center, #1a1a1a 0%, #000 100%)',
            color: '#e0e0e0',
            textAlign: 'center',
            fontFamily: 'Inter, sans-serif',
            overflow: 'hidden'
        }}>
            {/* App Name */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{
                    fontFamily: 'Cinzel, serif',
                    fontSize: 'clamp(2rem, 8vw, 3rem)',
                    marginBottom: '2rem',
                    letterSpacing: '0.15em',
                    color: '#cfb53b',
                    textTransform: 'uppercase',
                    width: '100%',
                    maxWidth: '600px'
                }}
            >
                Chronicle
            </motion.h1>

            {/* Primary Copy */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 2 }}
                style={{
                    marginBottom: '2.5rem',
                    width: '100%',
                    maxWidth: '500px'
                }}
            >
                <p style={{ fontSize: 'clamp(1rem, 4vw, 1.2rem)', marginBottom: '0.75rem', lineHeight: '1.5', fontWeight: 300 }}>
                    Chronicle is a living record of your decisions.
                </p>
                <p style={{ fontSize: 'clamp(1rem, 4vw, 1.2rem)', lineHeight: '1.5', fontWeight: 300 }}>
                    Each day, you write what happens next.
                </p>
            </motion.div>

            {/* Secondary Copy */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 1.5, duration: 2 }}
                style={{
                    marginBottom: '3rem',
                    fontSize: '0.85rem',
                    color: '#888',
                    lineHeight: '1.6'
                }}
            >
                <p style={{ margin: '0.25rem 0' }}>Begin with an origin</p>
                <p style={{ margin: '0.25rem 0' }}>Make one meaningful choice per day</p>
                <p style={{ margin: '0.25rem 0' }}>Your story remembers</p>
            </motion.div>

            {/* Primary CTA */}
            <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                onClick={onBegin}
                style={{
                    padding: '1rem 2rem',
                    background: 'transparent',
                    border: '1px solid #cfb53b',
                    color: '#cfb53b',
                    fontFamily: 'Cinzel, serif',
                    fontSize: 'clamp(0.9rem, 3vw, 1rem)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    borderRadius: '2px',
                    transition: 'all 0.3s ease',
                    width: '100%',
                    maxWidth: '300px'
                }}
                whileHover={{ scale: 1.05, background: 'rgba(207, 181, 59, 0.1)' }}
                whileTap={{ scale: 0.95 }}
            >
                Begin Your Chronicle
            </motion.button>

            {/* Secondary CTA */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 3, duration: 1 }}
                disabled
                style={{
                    marginTop: '2rem',
                    background: 'none',
                    border: 'none',
                    color: '#666',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.75rem',
                    cursor: 'not-allowed'
                }}
            >
                Continue an existing story
            </motion.button>
        </div>
    );
}
