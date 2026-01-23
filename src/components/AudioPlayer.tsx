import { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { AudioController } from '../lib/audio';

// We need to use the singleton controller from lib/audio inside this component
// But since AudioController in lib/audio is a custom hook-like thing returning functions, 
// let's adjust how we consume it.
// Actually, simple way: The component manages the "playing" state for UI, calls the lib functions.


export const AudioPlayer = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isPlaying, setIsPlaying] = useState(false);

    // We'll use a local instance of the controller hook logic just for state or 
    // better yet, just directly call the exports if they were static. 
    // The lib/audio exports playSound (static) and AudioController (hook).

    const { playing, toggleAmbient } = AudioController();
    // Note: This creates a new state every render if not careful, but React rules apply.
    // AudioController is defined as a hook in lib/audio.ts.

    useEffect(() => {
        if (playing !== isPlaying) {
            setIsPlaying(playing);
        }
    }, [playing, isPlaying]);

    return (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: 'auto' }}>
            <button
                onClick={toggleAmbient}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: isPlaying ? 'var(--accent-gold)' : '#555',
                    transition: 'color 0.3s'
                }}
            >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                <span style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>
                    {isPlaying ? 'AMBIENCE ON' : 'AMBIENCE'}
                </span>
            </button>
        </div>
    );
};
