export const moodAssets = {
    dread: { color: '#4a0404', texture: 'url(/placeholders/dread.svg)' },
    awe: { color: '#cfb53b', texture: 'url(/placeholders/awe.svg)' },
    resolve: { color: '#2a4d69', texture: 'url(/placeholders/resolve.svg)' },
    mystery: { color: '#639', texture: 'url(/placeholders/mystery.svg)' },
    sacrifice: { color: '#800000', texture: 'url(/placeholders/sacrifice.svg)' },
    triumph: { color: '#ffd700', texture: 'url(/placeholders/triumph.svg)' },
    default: { color: '#333', texture: 'url(/placeholders/card_generic.svg)' }
};

export const getMoodStyle = (mood: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (moodAssets as any)[mood.toLowerCase()] || moodAssets.default;
};
