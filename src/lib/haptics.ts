export const triggerHaptic = () => {
    // Check if vibration API is supported
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        // Trigger a "strong" pulse (e.g., 20ms is standard 'light', 50ms is 'heavy')
        // For a really satisfying "click", a short sharp pulse is usually best,
        // but user asked for "strong", so let's go with a slightly longer pulse.
        navigator.vibrate(40);
    }
};
