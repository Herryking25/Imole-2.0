export function formatPoints(points: number): string {
  return new Intl.NumberFormat('en-NG').format(points);
}

export function formatPercentage(ratio: number): string {
  return `${Math.round(ratio * 100)}%`;
}

