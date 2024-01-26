import { isEqual } from './compare.js';

export function extractModifiedProperties<Prev extends Record<string, any>, Next extends Record<string, any>>({
  prev,
  next,
  keys,
}: {
  prev: Prev;
  next: Next;
  keys?: ReadonlyArray<(keyof Prev & string) | (keyof Next & string)>;
}): Partial<Next> | null {
  const changes: Record<string, any> = {};
  const prevKeysSet = new Set(Object.keys(prev));
  const nextKeysSet = new Set(Object.keys(next));
  const keysToCompare = keys?.length ? new Set(keys) : new Set([...prevKeysSet, ...nextKeysSet]);

  for (const key of keysToCompare) {
    // if the value is undefined, it means we don't want to update the value
    if (next[key] === undefined) continue;

    if (!isEqual(prev[key], next[key])) {
      changes[key] = next[key];
    }
  }

  return Object.keys(changes).length === 0 ? null : (changes as Partial<Next>);
}
