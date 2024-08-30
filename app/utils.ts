// تبدیل اعداد انگلیسی به فارسی
export function toPersianNumber(input: number | string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return input.toString().replace(/\d/g, (digit: string) => persianDigits[parseInt(digit)]);
}

// تبدیل اعداد فارسی به انگلیسی
export function toEnglishNumber(input: string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return input.replace(/[۰-۹]/g, (digit: string) => persianDigits.indexOf(digit).toString());
}

// فرمت کردن اعداد با جداکننده هزارگان
export function formatNumber(input: number | string): string {
  return toPersianNumber(Number(input).toLocaleString());
}