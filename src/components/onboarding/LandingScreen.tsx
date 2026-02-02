import { motion } from 'framer-motion';
import PWABanner from '../PWABanner';

interface LandingScreenProps {
    onStart: () => void;
}

export default function LandingScreen({ onStart }: LandingScreenProps) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
            background: '#000',
            color: '#cfb53b',
            cursor: 'pointer'
        }}
            onClick={onStart}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
            >
                {/* Sword Medallion SVG */}
                <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="45" stroke="#cfb53b" strokeWidth="2" fillOpacity="0.1" fill="#cfb53b" />
                    <path d="M50 20V80" stroke="#cfb53b" strokeWidth="3" strokeLinecap="round" />
                    <path d="M35 35H65" stroke="#cfb53b" strokeWidth="3" strokeLinecap="round" />
                    <path d="M50 80L40 70" stroke="#cfb53b" strokeWidth="2" strokeLinecap="round" />
                    <path d="M50 80L60 70" stroke="#cfb53b" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="50" cy="50" r="10" stroke="#cfb53b" strokeWidth="1" />
                </svg>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 1, duration: 2, repeat: Infinity, repeatType: "reverse" }}
                style={{
                    marginTop: '2rem',
                    fontFamily: 'Cinzel, serif',
                    fontSize: '0.9rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    userSelect: 'none'
                }}
            >
                Click to Start
            </motion.p>

            <PWABanner />
        </div>
    );
}
