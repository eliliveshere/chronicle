import { get, set, values } from 'idb-keyval';
import { v4 as uuidv4 } from 'uuid';
import type { Entry, UserState } from '../types';

const USER_KEY = 'ocq_user';
const ENTRIES_KEY_PREFIX = 'ocq_entry_';

export const getUserId = async (): Promise<string> => {
    let user = await get<UserState>(USER_KEY);
    if (!user) {
        user = { userId: uuidv4() };
        await set(USER_KEY, user);
    }
    return user.userId;
};

// We store entries individually by key "ocq_entry_YYYY-MM-DD" for fast lookup
export const saveEntry = async (entry: Entry): Promise<void> => {
    await set(`${ENTRIES_KEY_PREFIX}${entry.dateKey}`, entry);
};

export const getEntry = async (dateKey: string): Promise<Entry | undefined> => {
    return await get<Entry>(`${ENTRIES_KEY_PREFIX}${dateKey}`);
};

export const getAllEntries = async (): Promise<Entry[]> => {
    // idb-keyval doesn't support 'getAll' with prefix easily without keeping a separate index or scanning all keys.
    // Since this is MVP and data is small, we can scan keys or just store a separate array of keys.
    // Actually, idb-keyval 'values' gets all values in the store. 
    // We need to filter relevant ones if we share the store. 
    // But we can just use the default store which is fine for this app.

    const allValues = await values();
    // Filter for objects that look like entries
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return allValues.filter((v: any) => v && v.dateKey && v.promptText && v.act).sort((a: Entry, b: Entry) => b.dayIndex - a.dayIndex);
};

export const getLastEntry = async (): Promise<Entry | undefined> => {
    const entries = await getAllEntries();
    if (entries.length === 0) return undefined;
    // Sorted by dayIndex desc already
    return entries[0];
};
