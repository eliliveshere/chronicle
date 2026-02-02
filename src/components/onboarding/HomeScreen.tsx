import { motion } from 'framer-motion';

interface HomeScreenProps {
    onBegin: () => void;
}

// Add a subtle grain texture to the background
const bgStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    background: 'radial-gradient(circle at 50% 30%, #1a1a1a 0%, #050505 80%, #000 100%)',
    zIndex: -1
};

const noiseOverlay: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    opacity: 0.05,
    pointerEvents: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
};

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
            color: '#e0e0e0',
            textAlign: 'center',
            fontFamily: 'Inter, sans-serif',
            overflow: 'hidden',
            position: 'relative'
        }}>
            {/* Background Layers */}
            <div style={bgStyle} />
            <div style={noiseOverlay} />

            {/* App Name */}
            <motion.h1
                initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.8, ease: "easeOut" }}
                style={{
                    fontFamily: 'Cinzel, serif',
                    fontWeight: 700,
                    fontSize: 'clamp(2rem, 9vw, 4rem)',
                    marginBottom: '2rem',
                    letterSpacing: '0.15em',
                    color: '#cfb53b',
                    textTransform: 'uppercase',
                    width: '100%',
                    maxWidth: '800px',
                    textShadow: '0 4px 20px rgba(207, 181, 59, 0.2)'
                }}
            >
                Chronicle
            </motion.h1>

            {/* Primary Copy */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 2 }}
                style={{
                    marginBottom: '2rem',
                    width: '100%',
                    maxWidth: '550px'
                }}
            >
                <p style={{
                    fontSize: 'clamp(1rem, 4.5vw, 1.4rem)',
                    marginBottom: '0.75rem',
                    lineHeight: '1.5',
                    fontWeight: 300,
                    color: '#f0f0f0'
                }}>
                    Chronicle is a living record of your decisions.
                </p>
                <p style={{
                    fontSize: 'clamp(0.9rem, 4vw, 1.25rem)',
                    lineHeight: '1.5',
                    fontWeight: 300,
                    color: '#ccc'
                }}>
                    Each day, you write what happens next.
                </p>
            </motion.div>

            {/* Secondary Copy - Decorative Separator */}
            <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
                style={{
                    width: '60px',
                    height: '1px',
                    background: 'rgba(207, 181, 59, 0.5)',
                    marginBottom: '2rem'
                }}
            />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 1.8, duration: 2 }}
                style={{
                    marginBottom: '4rem',
                    fontSize: '0.85rem',
                    color: '#888',
                    lineHeight: '1.8',
                    letterSpacing: '0.05em',
                    fontFamily: 'Cinzel, serif'
                }}
            >
                <p style={{ margin: '0.25rem 0' }}>BEGIN WITH AN ORIGIN</p>
                <p style={{ margin: '0.25rem 0' }}>MAKE ONE MEANINGFUL CHOICE PER DAY</p>
                <p style={{ margin: '0.25rem 0' }}>YOUR STORY REMEMBERS</p>
            </motion.div>

            {/* Primary CTA */}
            <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.8, duration: 1 }}
                onClick={onBegin}
                style={{
                    padding: '1.2rem 2rem',
                    background: 'transparent',
                    border: '1px solid rgba(207, 181, 59, 0.6)',
                    color: '#cfb53b',
                    fontFamily: 'Cinzel, serif',
                    fontWeight: 700,
                    fontSize: 'clamp(0.8rem, 3.5vw, 1.1rem)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.4s ease',
                    width: '100%',
                    maxWidth: '320px',
                    position: 'relative',
                    overflow: 'visible',
                    whiteSpace: 'nowrap'
                }}
                whileHover={{
                    scale: 1.02,
                    backgroundColor: 'rgba(207, 181, 59, 0.08)',
                    borderColor: 'rgba(207, 181, 59, 1)',
                    boxShadow: '0 0 30px rgba(207, 181, 59, 0.15)'
                }}
                whileTap={{ scale: 0.98 }}
            >
                Begin Your Chronicle
            </motion.button>

            {/* Secondary CTA */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 3.5, duration: 1 }}
                disabled
                style={{
                    marginTop: '2.5rem',
                    background: 'none',
                    border: 'none',
                    color: '#555',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.75rem',
                    cursor: 'not-allowed',
                    letterSpacing: '0.05em'
                }}
            >
                Continue an existing story
            </motion.button>
        </div>
    );
}
