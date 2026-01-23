import type { DailyContent } from '../types';
import { AudioPlayer } from './AudioPlayer';

interface CardProps {
    content: DailyContent;
}

export const Card = ({ content }: CardProps) => {
    return (
        <div style={{
            width: '100%',
            maxWidth: '350px',
            margin: '0 auto',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            {/* The Visual Card */}
            <div style={{
                width: '100%',
                aspectRatio: '0.625', // 2.5 / 4
                backgroundColor: '#111',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #222',
                boxShadow: '0 0 20px rgba(0,0,0,0.8)',
                position: 'relative',
                marginBottom: '2rem'
            }}>
                <img
                    src={content.imageUrl}
                    alt={content.sceneDescription}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'grayscale(60%) contrast(120%) sepia(20%)' // Tarot styling
                    }}
                />
                {/* Grain overlay could be added here */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent 40%)',
                    pointerEvents: 'none'
                }} />

                {/* Bottom Label (Act/Mood) could go here but minimal is better */}
            </div>

            {/* The Prompt */}
            <div style={{
                width: '100%',
                textAlign: 'center',
                padding: '0 1rem',
                animation: 'fadeIn 1s ease-in'
            }}>
                <p style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.1rem',
                    lineHeight: '1.6',
                    color: 'var(--text-primary)',
                    marginBottom: '1rem',
                    textShadow: '0 0 10px rgba(0,0,0,0.5)'
                }}>
                    {content.promptText}
                </p>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <AudioPlayer />
                </div>
            </div>
        </div>
    );
};
