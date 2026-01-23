import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { DailyContent } from '../types';
import { AudioPlayer } from './AudioPlayer';

interface TiltCardProps {
    content: DailyContent;
}

export const TiltCard = ({ content }: TiltCardProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 50, damping: 10 });
    const mouseY = useSpring(y, { stiffness: 50, damping: 10 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

    // Sheen effect
    const sheenX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
    const sheenY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();

            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Normalize -0.5 to 0.5
            const normX = (e.clientX - centerX) / window.innerWidth;
            const normY = (e.clientY - centerY) / window.innerHeight;

            x.set(normX);
            y.set(normY);
        };

        // Mobile device orientation could be handled here too but simpler to stick to pointer for MVP stability

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [x, y]);

    return (
        <div style={{ perspective: 1000, margin: '2rem 0' }}>
            <motion.div
                ref={ref}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                    width: '320px',
                    aspectRatio: '0.625',
                    borderRadius: '16px',
                    position: 'relative'
                }}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                {/* Card Front */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: '#111',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
                    border: '1px solid #333'
                }}>
                    {/* Image */}
                    <img
                        src={content.imageUrl}
                        alt="Card visual"
                        style={{
                            width: '100%',
                            height: '65%',
                            objectFit: 'cover',
                            filter: 'grayscale(0.4) contrast(1.1)'
                        }}
                    />

                    {/* Prompt/Info Area */}
                    <div style={{
                        padding: '1.5rem',
                        height: '35%',
                        background: '#0a0a0a',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderTop: '1px solid #222'
                    }}>
                        <p style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '0.9rem',
                            textAlign: 'center',
                            color: '#e0e0e0',
                            lineHeight: '1.4'
                        }}>
                            {content.promptText}
                        </p>
                        <AudioPlayer />
                    </div>

                    {/* Grain & Texture Overlay */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'url(/grain.png)', // Placeholder for noise, can use a data uri if needed
                        opacity: 0.1,
                        mixBlendMode: 'overlay',
                        pointerEvents: 'none'
                    }} />

                    {/* Inner Shadow/Vignette */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(circle at center, transparent 40%, #000 100%)',
                        pointerEvents: 'none'
                    }} />

                    {/* Sheen */}
                    <motion.div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)',
                        left: sheenX, // Just a rough parallax sheen
                        top: sheenY,
                        pointerEvents: 'none'
                    }} />
                </div>
            </motion.div>
        </div>
    );
};
