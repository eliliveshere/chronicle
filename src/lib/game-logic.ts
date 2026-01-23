import { format } from 'date-fns';
import type { Act } from '../types';

export const getLocalDailyKey = (): string => {
    return format(new Date(), 'yyyy-MM-dd');
};

export const getAct = (dayIndex: number): Act => {
    if (dayIndex <= 7) return 'I';
    if (dayIndex <= 21) return 'II';
    if (dayIndex <= 40) return 'III';
    return 'IV';
};

export const getDayIndex = (lastDayIndex: number = 0): number => {
    return lastDayIndex + 1;
};
