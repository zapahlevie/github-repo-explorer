// formatNumber.test.ts
import { formatCompactNumber } from './formatNumber';

describe('formatCompactNumber', () => {
  it('formats numbers less than 1,000 correctly', () => {
    expect(formatCompactNumber(999)).toBe('999');
    expect(formatCompactNumber(1)).toBe('1');
    expect(formatCompactNumber(0)).toBe('0');
  });

  it('formats thousands correctly', () => {
    expect(formatCompactNumber(1000)).toBe('1K');
    expect(formatCompactNumber(1500)).toBe('1.5K');
    expect(formatCompactNumber(9999)).toBe('10K');
  });

  it('formats millions correctly', () => {
    expect(formatCompactNumber(1000000)).toBe('1M');
    expect(formatCompactNumber(2500000)).toBe('2.5M');
  });

  it('formats billions correctly', () => {
    expect(formatCompactNumber(1000000000)).toBe('1B');
    expect(formatCompactNumber(1234567890)).toBe('1.2B');
  });

  it('formats negative numbers correctly', () => {
    expect(formatCompactNumber(-1500)).toBe('-1.5K');
    expect(formatCompactNumber(-1000000)).toBe('-1M');
  });

  it('formats decimal numbers correctly', () => {
    expect(formatCompactNumber(1234.56)).toBe('1.2K');
    expect(formatCompactNumber(999.99)).toBe('1K');
  });
});
