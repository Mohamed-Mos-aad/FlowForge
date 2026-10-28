export function renderTemplate(template: string, item: unknown): string {
    return template.replace(/\{\{\s*(.+?)\s*\}\}/g, (_, path: string) => {
        const value = path.split(".").reduce<unknown>((obj, key) => {
            if (obj !== null && typeof obj === "object") return (obj as Record<string, unknown>)[key];
            return undefined;
        }, item);
        return value === undefined || value === null ? "" : String(value);
    });
}