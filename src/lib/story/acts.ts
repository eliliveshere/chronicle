import type { Act } from '../../types';

export const getAct = (dayIndex: number): Act => {
    if (dayIndex <= 7) return 'I';
    if (dayIndex <= 21) return 'II';
    if (dayIndex <= 40) return 'III';
    return 'IV';
};

export const getActTitle = (act: Act): string => {
    switch (act) {
        case 'I': return 'THE CALL';
        case 'II': return 'THE DESCENT';
        case 'III': return 'THE TRANSFORMATION';
        case 'IV': return 'THE RETURN';
        default: return 'UNKNOWN';
    }
};
