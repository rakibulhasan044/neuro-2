export function requireString(key) {
    const value = process.env[key];
    if (!value)
        throw new Error(`Missing required environment variable: ${key}`);
    return value;
}
export function requireInt(key, fallback) {
    const raw = process.env[key];
    if (raw === undefined || raw === "") {
        if (fallback !== undefined)
            return fallback;
        throw new Error(`Missing required environment variable: ${key}`);
    }
    const parsed = parseInt(raw, 10);
    if (isNaN(parsed)) {
        throw new Error(`Environment variable ${key} must be an integer, got: "${raw}"`);
    }
    return parsed;
}
const EXPIRES_IN_RE = /^\d+[smhdwy]$|^\d+$/;
export function requireExpiry(key, fallback) {
    const value = process.env[key] ?? fallback;
    if (!EXPIRES_IN_RE.test(value)) {
        throw new Error(`Environment variable ${key} has invalid expiry format "${value}". ` +
            `Expected e.g. "15m", "7d", "3600".`);
    }
    return value;
}
