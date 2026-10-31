export function getTimeAgo(timestamp: number): string {
    const diff = Math.max(0, Date.now() - timestamp);

    const units = [
        { name: 'Year', ms: 365 * 24 * 60 * 60 * 1000 },
        { name: 'Month', ms: 30 * 24 * 60 * 60 * 1000 },
        { name: 'Week', ms: 7 * 24 * 60 * 60 * 1000 },
        { name: 'Day', ms: 24 * 60 * 60 * 1000 },
        { name: 'Hour', ms: 60 * 60 * 1000 },
        { name: 'Minute', ms: 60 * 1000 },
        { name: 'Second', ms: 1000 },
    ];

    if (diff < 1000) return 'Now';

    const unit = units.find(u => diff >= u.ms)!;
    const value = Math.floor(diff / unit.ms);

    return `${value} ${unit.name}`;
}