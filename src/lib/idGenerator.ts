/**
 * Generate the next sequential ID given a prefix (e.g. "A" -> "A-55" if A-01..A-54 exist)
 */
export function nextSequentialId(existingIds: string[], prefix: string): string {
    let maxNum = 0;
    const pattern = new RegExp(`^${prefix}-(\\d+)$`);
    existingIds.forEach(id => {
        const match = id.match(pattern);
        if (match) {
            const num = parseInt(match[1], 10);
            if (num > maxNum) maxNum = num;
        }
    });
    return `${prefix}-${String(maxNum + 1).padStart(2, '0')}`;
}
