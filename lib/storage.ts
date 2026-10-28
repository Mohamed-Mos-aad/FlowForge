export const storage = {
    get(key: string, fallback = null) {
        try {
            const value = localStorage.getItem(key);
            return value === null ? fallback : JSON.parse(value);
        } catch {
            return fallback;
        }
    },

    set(key: string, value: unknown) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch {
            return false;
        }
    },

    remove(key: string) {
        try {
            localStorage.removeItem(key);
        } catch {}
    }
};