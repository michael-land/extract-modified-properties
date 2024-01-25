import { describe, expect, it } from 'vitest';
import { isEqual } from './compare.js';

describe('isEqual', () => {
  // Test arrays
  it('should return true for equal arrays', () => {
    expect(isEqual([1, 2, 3], [1, 2, 3])).toBeTruthy();
  });

  it('should return false for different arrays', () => {
    expect(isEqual([1, 2, 3], [3, 2, 1])).toBeFalsy();
  });

  // Test dates
  it('should return true for equal dates', () => {
    const date1 = new Date(2024, 1, 24);
    const date2 = new Date(2024, 1, 24);
    expect(isEqual(date1, date2)).toBeTruthy();
  });

  it('should return false for different dates', () => {
    const date1 = new Date(2024, 1, 24);
    const date2 = new Date(2023, 1, 24);
    expect(isEqual(date1, date2)).toBeFalsy();
  });

  // Test other types
  it('should return true for equal numbers', () => {
    expect(isEqual(5, 5)).toBeTruthy();
  });

  it('should return false for different numbers', () => {
    expect(isEqual(5, 10)).toBeFalsy();
  });

  it('should return true for equal strings', () => {
    expect(isEqual('hello', 'hello')).toBeTruthy();
  });

  it('should return false for different strings', () => {
    expect(isEqual('hello', 'world')).toBeFalsy();
  });

  it('should return true for two nulls', () => {
    expect(isEqual(null, null)).toBeTruthy();
  });

  it('should return false for null and undefined', () => {
    expect(isEqual(null, undefined)).toBeFalsy();
  });
});
