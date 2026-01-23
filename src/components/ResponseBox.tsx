import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResponseBoxProps {
    onSubmit: (text: string) => void;
    isSubmitting: boolean;
}

export const ResponseBox = ({ onSubmit, isSubmitting }: ResponseBoxProps) => {
    const [text, setText] = useState('');

    const handleSubmit = () => {
        if (!text.trim()) return;
        onSubmit(text);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your fate..."
                maxLength={600}
                disabled={isSubmitting}
                style={{
                    width: '100%',
                    minHeight: '100px',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid #333',
                    color: '#ddd',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-serif)',
                    resize: 'none',
                    outline: 'none',
                    padding: '0.5rem',
                    textAlign: 'center'
                }}
            />

            <AnimatePresence>
                {text.trim().length > 0 && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        style={{
                            alignSelf: 'center',
                            border: '1px solid #333',
                            background: isSubmitting ? '#111' : 'transparent',
                            color: '#888',
                            padding: '0.8rem 2rem',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.75rem',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            borderRadius: '2px',
                            transition: 'all 0.3s',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        whileHover={{ borderColor: '#666', color: '#ccc' }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {isSubmitting ? 'SEALING...' : 'SEAL FATE'}
                    </motion.button>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
