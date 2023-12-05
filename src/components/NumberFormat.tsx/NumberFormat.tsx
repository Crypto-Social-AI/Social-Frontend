import { formatLargeNumber, formatWithSubscript } from 'lib/utils/helpers/format/format';

type NumberFormatProps = {
  value: number | string | null;
  className?: string;
  tokenSymbol?: string | null;
  decimals?: number;
  color?: 'base' | 'green' | 'red' | 'green500' | 'red500' | 'redArb' | 'greenArb' | 'darkSlate';
  isCurrency?: boolean;
  isPercentage?: boolean;
  useLargeNumberFormat?: boolean;
  wholeNumber?: boolean;
};

function NumberFormat({
  value,
  className,
  tokenSymbol = null,
  decimals = 5,
  color = 'base',
  isCurrency = false,
  isPercentage = false,
  useLargeNumberFormat = false,
  wholeNumber = false,
}: NumberFormatProps) {
  const colorVariants = {
    base: 'text-text-primary',
    green: 'text-green-primary',
    red: 'text-red-primary',
    green500: 'text-green-500',
    red500: 'text-red-500',
    redArb: 'text-[#ef4444]',
    greenArb: 'text-[#047857]',
    darkSlate: 'text-slate-800',
  };

  const number = Math.abs(Number(value));
  let formattedNumber;

  if (isNaN(number) || typeof number !== 'number') {
    console.warn('<NumberFormat />: Invalid number', { passedNumber: value });
    return <span className='leading-none flex-1'>-</span>;
  }

  if (number < 0.00001) {
    formattedNumber = formatWithSubscript(number);
  } else if (number < 1) {
    formattedNumber = number.toFixed(decimals);
  } else if (number >= 1 && number <= 999) {
    if (wholeNumber) {
      formattedNumber = number.toFixed(0);
    } else {
      formattedNumber = decimals <= 1 ? number.toFixed(decimals) : number.toFixed(2);
    }
  } else if (number > 999 && useLargeNumberFormat) {
    formattedNumber = formatLargeNumber(number);
  } else {
    formattedNumber = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(number);
  }

  return (
    <span className={`${className} ${colorVariants[color]}`}>
      {isCurrency && '$'}
      {formattedNumber}
      {isPercentage && '%'} {tokenSymbol}
    </span>
  );
}

export default NumberFormat;
