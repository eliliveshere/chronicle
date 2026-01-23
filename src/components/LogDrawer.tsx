import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Entry } from '../types';
import { X } from 'lucide-react';

interface LogDrawerProps {
    entries: Entry[];
    isOpen: boolean;
    onClose: () => void;
}

export const LogDrawer = ({ entries, isOpen, onClose }: LogDrawerProps) => {
    // Keep internal "modal" state for viewing an entry if needed
    // For MVP, just list
    const containerRef = useRef(null);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.8)',
                            zIndex: 90
                        }}
                    />
                    <motion.div
                        ref={containerRef}
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '80vh',
                            background: '#080808',
                            borderTop: '1px solid #222',
                            borderTopLeftRadius: '16px',
                            borderTopRightRadius: '16px',
                            zIndex: 100,
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '2rem'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#888' }}>BOOK OF DAYS</h2>
                            <button onClick={onClose} style={{ color: '#444' }}><X /></button>
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto' }}>
                            {entries.map((entry) => (
                                <div key={entry.dateKey} style={{
                                    marginBottom: '2rem',
                                    paddingBottom: '2rem',
                                    borderBottom: '1px solid #111'
                                }}>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', marginBottom: '0.5rem', letterSpacing: '1px' }}>
                                        DAY {entry.dayIndex} // {entry.dateKey}
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: '#999', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>
                                        {entry.promptText.substring(0, 60)}...
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: '#555', fontStyle: 'italic' }}>
                                        ↳ {entry.response}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
