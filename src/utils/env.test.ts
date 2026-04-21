import { describe, it, expect, vi } from 'vitest'

// 外部（例えばwindowオブジェクト）に依存する関数
const getStorageItem = (key: string) => window.localStorage.getItem(key)

describe('【インソーステスト】環境依存のテスト', () => {
  it('localStorage の挙動をモックしてテストできるか', () => {
    // window.localStorage をモック化
    const mockGetItem = vi.fn().mockReturnValue('dummy-value')
    vi.stubGlobal('localStorage', { getItem: mockGetItem })

    const result = getStorageItem('test-key')

    expect(mockGetItem).toHaveBeenCalledWith('test-key')
    expect(result).toBe('dummy-value')

    vi.unstubAllGlobals() // モックを解除
  })
})
