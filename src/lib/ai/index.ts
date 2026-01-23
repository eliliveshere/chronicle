import type { Act, DailyContent, Entry } from '../../types';
import { getMoodStyle } from '../story/constraints';

interface GenerationContext {
    history: Entry[];
    act: Act;
    dayIndex: number;
    userId: string;
    dateKey: string;
}

// Simple deterministic RNG
const simpleHash = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
};

export const generateNextPrompt = async (ctx: GenerationContext): Promise<DailyContent> => {
    const seed = simpleHash(`${ctx.userId}-${ctx.dateKey}`);

    // Day 1 Canonical Opening
    if (ctx.dayIndex === 1) {
        const mood = "mystery";
        const assets = getMoodStyle(mood);
        return {
            promptText: "You wake beneath a blackened sky, your name already forgotten by the world. A symbol burns faintly on your palm—proof of a vow you do not remember making. In the distance, something ancient has noticed you. What do you do?",
            moodTag: mood,
            sceneDescription: "A dark landscape with a blackened sky, a faint glowing symbol on a hand, and a looming ancient presence in the distance.",
            imageUrl: assets.texture.replace('url(', '').replace(')', ''),
            // Note: constraints returns CSS value "url(...)", nice hack but let's strip it for img tag.
            audioUrl: "/placeholders/ambient.mp3"
        };
    }

    // Deterministic Mock Prompt
    const prompts = [
        { text: "The road ahead splits into three distinct paths, each marked by a different Omen. The left reeks of sulfur; the right hums with a low, maddening vibration. The center path is silent. Which do you choose?", mood: "dread" },
        { text: "A stranger in tattered grey robes offers you a glass of wine that glows with an inner light. They claim it will restore your memory, but the price is a year of your life. Do you drink?", mood: "mysterious" },
        { text: "You find a mirror that shows not your reflection, but a scene of a burning city you vaguely recognize. The glass begins to crack. Do you touch it?", mood: "sacrifice" },
        { text: "A massive wolf with eyes like burning coals blocks your path. It does not growl, but speaks in a voice that sounds like grinding stones. It demands a truth you have never spoken. what do you say?", mood: "awe" },
        { text: "Great stone monoliths rise from the fog, forming a circle. In the center lies a weapon of strange craftmanship. It pulses with a rhythm matching your own heart. Do you take it?", mood: "triumph" },
        { text: "The stars align in a pattern that hurts your eyes to look at. A door opens in the air itself. Do you step through?", mood: "resolve" }
    ];

    const selection = prompts[seed % prompts.length];
    const assets = getMoodStyle(selection.mood);

    return {
        promptText: selection.text,
        moodTag: selection.mood,
        sceneDescription: `A dark fantasy scene representing: ${selection.text.substring(0, 50)}...`,
        imageUrl: assets.texture.replace('url(', '').replace(')', ''),
        audioUrl: "/placeholders/ambient.mp3"
    };
};

export const generateSoraImage = async (sceneDescription: string, moodTag: string): Promise<string> => {
    console.log(`[STUB] generateSoraImage called with:`, { sceneDescription, moodTag });
    // In real app, call Sora API here.
    const assets = getMoodStyle(moodTag);
    return assets.texture.replace('url(', '').replace(')', '');
};

export const generateAudio = async (promptText: string, moodTag: string): Promise<string> => {
    console.log(`[STUB] generateAudio called with:`, { promptText, moodTag });
    // In real app, call Audio gen API here.
    return "/placeholders/ambient.mp3";
};
