// ロジック・品質テストサンプル

/**
 * 数値を日本円の形式に変換する
 * 例: 1000 -> "1,000円"
 */
export const formatCurrency = (amount: number): string => {
  if (amount < 0) return "0円";
  return new Intl.NumberFormat('ja-JP').format(amount) + '円';
};

/**
 * 入力された文字列がメールアドレス形式か判定する
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
