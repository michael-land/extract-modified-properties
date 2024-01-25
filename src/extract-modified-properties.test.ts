import { describe, expect, it } from 'vitest';
import { extractModifiedProperties } from './extract-modified-properties.js';

describe('diff function', () => {
  it('should return null when comparing two equal objects', () => {
    const prev = { name: 'John', age: 30 };
    const next = { name: 'John', age: 30 };
    expect(extractModifiedProperties({ prev, next })).toBeNull();
  });

  it('should return null when comparing two equal boolean values', () => {
    const prev = { flag: true };
    const next = { flag: true };
    expect(extractModifiedProperties({ prev, next })).toBeNull();
  });

  it('should return null when comparing two null values', () => {
    const prev = { value: null };
    const next = { value: null };
    expect(extractModifiedProperties({ prev, next })).toBeNull();
  });

  it('should return null when comparing two equal dates', () => {
    const prev = { date: new Date('2022-01-01') };
    const next = { date: new Date('2022-01-01') };
    expect(extractModifiedProperties({ prev, next })).toBeNull();
  });

  it('should return null when comparing two equal array', () => {
    const prev = { array: [1, 2, 3] };
    const next = { array: [1, 2, 3] };
    expect(extractModifiedProperties({ prev, next })).toBeNull();
  });

  it('should return null when comparing two equal integer', () => {
    const prev = { integer: 1 };
    const next = { integer: 1 };
    expect(extractModifiedProperties({ prev, next })).toBeNull();
  });

  it('should return null when comparing two equal decimal', () => {
    const prev = { decimal: 1.1 };
    const next = { decimal: 1.1 };
    expect(extractModifiedProperties({ prev, next })).toBeNull();
  });

  it('should return the changed integer value', () => {
    const prev = { integer: 1 };
    const next = { integer: 2 };
    const expected = { integer: 2 };
    expect(extractModifiedProperties({ prev, next })).toEqual(expected);
  });

  it('should return the changed string value', () => {
    const prev = { string: 'John' };
    const next = { string: 'Jane' };
    const expected = { string: 'Jane' };
    expect(extractModifiedProperties({ prev, next })).toEqual(expected);
  });

  it('should return the changed boolean value', () => {
    const prev = { flag: true };
    const next = { flag: false };
    const expected = { flag: false };
    expect(extractModifiedProperties({ prev, next })).toEqual(expected);
  });

  it('should return the changed date value', () => {
    const prev = { date: new Date('2022-01-01') };
    const next = { date: new Date('2023-01-01') };
    const expected = { date: new Date('2023-01-01') };
    expect(extractModifiedProperties({ prev, next })).toEqual(expected);
  });

  it('should return the changed value only', () => {
    const prev = { name: 'John', age: 30 };
    const next = { name: 'Jane', age: 30 };
    const expected = { name: 'Jane' };
    expect(extractModifiedProperties({ prev, next })).toEqual(expected);
  });

  it('should return the entire array when changed', () => {
    const prev = { items: [1, 2, 3] };
    const next = { items: [1, 2, 4] };
    const expected = { items: [1, 2, 4] };
    expect(extractModifiedProperties({ prev, next })).toEqual(expected);
  });

  it('should return the entire array when added', () => {
    const prev = { items: [1, 2, 3] };
    const next = { items: [1, 2, 3, 4] };
    const expected = { items: [1, 2, 3, 4] };
    expect(extractModifiedProperties({ prev, next })).toEqual(expected);
  });

  it('should return the entire array when removed', () => {
    const prev = { items: [1, 2, 3, 4] };
    const next = { items: [1, 2, 3] };
    const expected = { items: [1, 2, 3] };
    expect(extractModifiedProperties({ prev, next })).toEqual(expected);
  });

  it('should return the entire object when nested objects are different', () => {
    const prev = { person: { name: 'John', age: 30 } };
    const next = { person: { name: 'Jane', age: 30 } };
    const expected = { person: { name: 'Jane', age: 30 } };
    expect(extractModifiedProperties({ prev, next })).toEqual(expected);
  });

  it('should return the new value when the next value is null', () => {
    const prev = { value: 'old value' };
    const next = { value: null };
    const expected = { value: null };
    expect(extractModifiedProperties({ prev, next })).toEqual(expected);
  });

  // Add more test cases as needed to cover different scenarios
});

describe('diff function with keys parameter', () => {
  it('should only compare specified key and return changes', () => {
    const prev = { name: 'John', age: 30 };
    const next = { name: 'Jane', age: 30 };
    const keys = ['name'] as const;
    const expected = { name: 'Jane' };
    expect(extractModifiedProperties({ prev, next, keys })).toEqual(expected);
  });

  it('should return null if specified key has no change', () => {
    const prev = { name: 'John', age: 30 };
    const next = { name: 'John', age: 31 };
    const keys = ['name'] as const;
    expect(extractModifiedProperties({ prev, next, keys })).toBeNull();
  });

  it('should return changes for multiple specified keys', () => {
    const prev = { name: 'John', age: 30, location: 'City A' };
    const next = { name: 'Jane', age: 30, location: 'City B' };
    const keys = ['name', 'location'] as const;
    const expected = { name: 'Jane', location: 'City B' };
    expect(extractModifiedProperties({ prev, next, keys })).toEqual(expected);
  });

  it('should return undefined for a removed key specified in keys', () => {
    const prev = { name: 'John', age: 30 };
    const next = { age: 30 };
    const keys = ['name'] as const;
    const expected = { name: undefined };
    expect(extractModifiedProperties({ prev, next, keys })).toEqual(expected);
  });

  it('should handle a key specified in keys not existing in both objects', () => {
    const prev = { name: 'John', age: 30 };
    const next = { name: 'John', age: 31 };
    const keys = ['gender'] as const;
    // @ts-expect-error key not existing in both objects
    expect(extractModifiedProperties({ prev, next, keys })).toBeNull();
  });

  it('should return changes for nested objects specified in keys', () => {
    const prev = { person: { name: 'John', age: 30 } };
    const next = { person: { name: 'Jane', age: 30 } };
    const keys = ['person'] as const;
    const expected = { person: { name: 'Jane', age: 30 } };
    expect(extractModifiedProperties({ prev, next, keys })).toEqual(expected);
  });

  it('should not return changes for keys not specified in keys array', () => {
    const prev = { name: 'John', age: 30 };
    const next = { name: 'Jane', age: 31 };
    const keys = ['age'] as const;
    const expected = { age: 31 };
    expect(extractModifiedProperties({ prev, next, keys })).toEqual(expected);
  });

  // Add more test cases as needed to cover different scenarios
});
