// useAccordion.test.ts
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAccordion } from '../hooks/useAccordion';

describe('useAccordion', () => {
  it('should initialize expanded as null', () => {
    const { result } = renderHook(() => useAccordion<string>());
    expect(result.current.expanded).toBeNull();
  });

  it('should expand when toggle is called with a value', () => {
    const { result } = renderHook(() => useAccordion<string>());
    act(() => {
      result.current.toggle('section1');
    });
    expect(result.current.expanded).toBe('section1');
  });

  it('should collapse when toggle is called with the same value', () => {
    const { result } = renderHook(() => useAccordion<string>());
    act(() => {
      result.current.toggle('section1');
      result.current.toggle('section1');
    });
    expect(result.current.expanded).toBeNull();
  });

  it('should switch expanded value when toggled with a different value', () => {
    const { result } = renderHook(() => useAccordion<string>());
    act(() => {
      result.current.toggle('section1');
      result.current.toggle('section2');
    });
    expect(result.current.expanded).toBe('section2');
  });

  it('should work with numbers as generic type', () => {
    const { result } = renderHook(() => useAccordion<number>());
    act(() => {
      result.current.toggle(1);
    });
    expect(result.current.expanded).toBe(1);
    act(() => {
      result.current.toggle(1);
    });
    expect(result.current.expanded).toBeNull();
  });
});
