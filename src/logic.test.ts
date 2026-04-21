// ロジック・品質テストサンプル

import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { formatCurrency, isValidEmail } from './utils/formatters';
import { useCounter } from './hooks/useCounter';

describe('【ロジック・品質】ロジック関数のテスト (Utils)', () => {
  it('formatCurrency: 正しくカンマ区切りと単位がつくか', () => {
    expect(formatCurrency(1000)).toBe('1,000円');
    expect(formatCurrency(1000000)).toBe('1,000,000円');
  });

  it('formatCurrency: 負の値は0円として処理されるか', () => {
    expect(formatCurrency(-500)).toBe('0円');
  });

  it('isValidEmail: 正しい形式を判定できるか', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('invalid-email')).toBe(false);
  });
});

describe('カスタムフックのテスト (Hooks)', () => {
  it('初期値が正しく設定されるか', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  it('incrementを呼ぶとカウントが増えるか', () => {
    const { result } = renderHook(() => useCounter(0));
    
    // Stateを更新する関数を呼ぶときは act で囲む
    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
