import Big from 'big.js';

export const formatLargeNumber = (number: number) => {
  const units = ['K', 'M', 'B', 'T'];
  let numCopy = number;
  let unitIndex = 0;
  const unitValue = 1000;

  while (numCopy >= unitValue && unitIndex < units.length) {
    numCopy /= unitValue;
    unitIndex += 1;
  }

  return `${numCopy.toFixed(1)}${units[unitIndex - 1] !== '' || ''}`;
};

export const formatWithSubscript = (number: number) => {
  // Handle large number format
  const absNum = Number(Math.abs(number));
  if (absNum >= 1000) {
    return formatLargeNumber(number);
  }

  const bigNumber = new Big(absNum);
  const numberString = bigNumber.toFixed();
  const [integerPart, decimalPart] = numberString.split('.');

  let leadingZeros = 0;
  if (decimalPart !== undefined) {
    for (const char of decimalPart) {
      if (char === '0') {
        leadingZeros += 1;
      } else {
        break;
      }
    }
  }

  const subscripts = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];
  const subscript = leadingZeros
    .toString()
    .split('')
    .map((digit) => subscripts[parseInt(digit, 10)])
    .join('');

  if (decimalPart !== undefined) {
    return `${integerPart}.0${subscript !== '' && subscript !== '₀' ? subscript : ''}${decimalPart?.slice(
      leadingZeros,
      leadingZeros + 4,
    )}`;
  }
  return `${integerPart}`;
};

export const truncateString = (text: string | null, maxLength: number) => {
  if (text && text?.length > maxLength) {
    return `${text?.substring(0, maxLength - 3)}...`;
  }
  return text;
};

/**
 * Formats an address by extracting the first four characters and the last four characters
 * and concatenating them with an ellipsis in between.
 * @param {string} address - The address to be formatted.
 * @returns {string} The formatted address string.
 */
export const formatAddress = (address = '', to = 4) => `${address.slice(0, to)}...${address.slice(-4)}`;

export const append0xToAddress = (address: string) => {
  if (!address) return '';
  if (address.startsWith('0x')) return address;

  return `0x${address}`;
};

type Column = {
  id: string;
  header: string;
  render: (data: any) => JSX.Element;
};

type AdditionalColumn = {
  id: string;
  header: string;
  render: (data: any) => JSX.Element;
  position?: number;
};

export const getFilteredColumnsData = (
  baseRecords: Column[],
  excludeColumnIds: string[] = [],
  additionalColumns: AdditionalColumn[] = [],
): Column[] => {
  const filteredColumns = baseRecords.filter((column: any) => !excludeColumnIds.includes(column.id));

  additionalColumns.forEach(({ id, header, render, position }) => {
    if (position !== undefined) {
      // Insert new column at the specified position
      filteredColumns.splice(position, 0, { id, header, render });
    } else {
      // If no position is specified, push it at the end of the array
      filteredColumns.push({ id, header, render });
    }
  });

  return filteredColumns;
};
