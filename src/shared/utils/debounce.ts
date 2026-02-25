export function debounce<TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  waitMs: number,
): (...args: TArgs) => void {
  let t: number | undefined;
  return (...args) => {
    window.clearTimeout(t);
    t = window.setTimeout(() => fn(...args), waitMs);
  };
}
