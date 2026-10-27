// ** Interfaces
export type Operator = "equals" | "not_equals" | "contains" | "greater_than" | "less_than" | "is_empty";

export function evaluateCondition(left: unknown, operator: Operator, right: unknown): boolean {
    switch (operator) {
        case "equals":       return String(left) === String(right);
        case "not_equals":   return String(left) !== String(right);
        case "contains":     return String(left).includes(String(right));
        case "greater_than": return Number(left) > Number(right);
        case "less_than":    return Number(left) < Number(right);
        case "is_empty":     return left === undefined || left === null || String(left).trim() === "";
        default:             return false;
    }
}
export function resolveExpression(input: string, item: unknown): unknown {
    const match = input.match(/^\{\{\s*(.+?)\s*\}\}$/);
    if (!match) return input;
    return match[1].split(".").reduce<unknown>((obj, key) => {
        if (obj !== null && typeof obj === "object") return (obj as Record<string, unknown>)[key];
        return undefined;
    }, item);
}