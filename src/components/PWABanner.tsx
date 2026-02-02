import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { triggerHaptic } from '../lib/haptics';

export default function PWABanner() {
    const [isVisible, setIsVisible] = useState(false);
    const [showInstructions, setShowInstructions] = useState(false);
    const [platform, setPlatform] = useState<'ios' | 'android' | 'desktop'>('desktop');

    useEffect(() => {
        // Simple heuristic for platform detection
        const userAgent = window.navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(userAgent)) {
            setPlatform('ios');
        } else if (/android/.test(userAgent)) {
            setPlatform('android');
        } else {
            setPlatform('desktop');
        }

        // Check if already in standalone mode
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;

        // Show after a short delay if not standalone, mobile only ideally but desktop for testing is fine
        if (!isStandalone) {
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        left: '20px',
                        right: '20px',
                        zIndex: 100,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    {!showInstructions ? (
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                triggerHaptic();
                                setShowInstructions(true);
                            }}
                            style={{
                                background: 'rgba(20, 20, 20, 0.95)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid #333',
                                borderRadius: '8px',
                                padding: '12px 20px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                                cursor: 'pointer',
                                maxWidth: '400px',
                                width: '100%'
                            }}
                        >
                            <span style={{ fontSize: '20px' }}>📱</span>
                            <div style={{ flex: 1 }}>
                                <p style={{ margin: 0, color: '#e0e0e0', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                                    Install App
                                </p>
                                <p style={{ margin: 0, color: '#888', fontSize: '0.8rem', fontFamily: 'Inter, sans-serif' }}>
                                    Add to Home Screen for best experience
                                </p>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    triggerHaptic();
                                    setIsVisible(false);
                                }}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#666',
                                    fontSize: '1.2rem',
                                    cursor: 'pointer',
                                    padding: '4px'
                                }}
                            >
                                ×
                            </button>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                background: 'rgba(20, 20, 20, 0.95)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid #333',
                                borderRadius: '12px',
                                padding: '20px',
                                maxWidth: '400px',
                                width: '100%',
                                boxShadow: '0 4px 30px rgba(0,0,0,0.6)',
                                fontFamily: 'Inter, sans-serif'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                <h4 style={{ margin: 0, color: '#cfb53b', fontFamily: 'Cinzel, serif' }}>Install Instructions</h4>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        triggerHaptic();
                                        setShowInstructions(false);
                                    }}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#888',
                                        fontSize: '0.9rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Close
                                </button>
                            </div>

                            <div style={{ color: '#e0e0e0', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                {platform === 'ios' && (
                                    <ol style={{ paddingLeft: '20px', margin: 0 }}>
                                        <li style={{ marginBottom: '8px' }}>Tap the <strong>Share</strong> button <span style={{ fontSize: '1.2em' }}>⎋</span> in your browser menu.</li>
                                        <li>Scroll down and selecting <strong>Add to Home Screen</strong>.</li>
                                    </ol>
                                )}
                                {platform === 'android' && (
                                    <ol style={{ paddingLeft: '20px', margin: 0 }}>
                                        <li style={{ marginBottom: '8px' }}>Tap the menu icon (three dots) in Chrome.</li>
                                        <li>Select <strong>Add to Home screen</strong> or <strong>Install App</strong>.</li>
                                    </ol>
                                )}
                                {platform === 'desktop' && (
                                    <ol style={{ paddingLeft: '20px', margin: 0 }}>
                                        <li style={{ marginBottom: '8px' }}>Open your browser's menu.</li>
                                        <li>Look for "Install App" or "Add to Home Screen".</li>
                                    </ol>
                                )}
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
