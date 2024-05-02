import { type SocialPost } from 'lib/types';

type PriceKey = keyof Pick<
  SocialPost,
  | 'priceInComommonTokenOneMonthLater'
  | 'priceInComommonTokenThreeWeeksLater'
  | 'priceInComommonTokenTwoWeeksLater'
  | 'priceInComommonTokenOneWeekLater'
  | 'priceInComommonTokenThreeDaysLater'
  | 'priceInComommonTokenOneDayLater'
  | 'priceInComommonTokenSixteenHoursLater'
  | 'priceInComommonTokenEightHoursLater'
  | 'priceInComommonTokenFourHoursLater'
  | 'priceInComommonTokenOneHourLater'
  | 'priceInComommonTokenThirtyMinutesLater'
  | 'priceInComommonTokenTenMinutesLater'
  | 'priceInComommonTokenFiveMinutesLater'
  | 'priceInComommonTokenOneMinuteLater'
>;

const priceKeysInOrder: PriceKey[] = [
  'priceInComommonTokenOneMonthLater',
  'priceInComommonTokenThreeWeeksLater',
  'priceInComommonTokenTwoWeeksLater',
  'priceInComommonTokenOneWeekLater',
  'priceInComommonTokenThreeDaysLater',
  'priceInComommonTokenOneDayLater',
  'priceInComommonTokenSixteenHoursLater',
  'priceInComommonTokenEightHoursLater',
  'priceInComommonTokenFourHoursLater',
  'priceInComommonTokenOneHourLater',
  'priceInComommonTokenThirtyMinutesLater',
  'priceInComommonTokenTenMinutesLater',
  'priceInComommonTokenFiveMinutesLater',
  'priceInComommonTokenOneMinuteLater',
];

export const getCurrentProfitPercentage = (socialCallData: SocialPost) => {
  const buyPriceString = socialCallData.priceInComommonTokenAtMessage;
  let currentProfit = null;

  if (buyPriceString === null) {
    return currentProfit; // Return null if buy price is null
  }

  const buyPrice = parseFloat(buyPriceString); // Convert string to number

  for (const key of priceKeysInOrder) {
    const currentPriceString = socialCallData[key];

    if (currentPriceString !== null) {
      const currentPrice = parseFloat(currentPriceString); // Convert string to number
      currentProfit = ((currentPrice - buyPrice) / buyPrice) * 100;
      break; // Break once we've found the latest non-null price
    }
  }

  return currentProfit;
};

export const getMaxProfitPercentage = (socialCallData: SocialPost) => {
  const buyPriceString = socialCallData.priceInComommonTokenAtMessage;
  if (buyPriceString === null) {
    return null; // Return null if buy price is null
  }

  const buyPrice = parseFloat(buyPriceString); // Convert string to number
  let maxProfit = -Infinity;

  for (const key of [...priceKeysInOrder].reverse()) {
    const currentPriceString = socialCallData[key];
    if (currentPriceString === null) {
      continue; // Skip if the current price is null
    }

    const currentPrice = parseFloat(currentPriceString); // Convert string to number
    const profit = ((currentPrice - buyPrice) / buyPrice) * 100;

    if (profit > maxProfit) {
      maxProfit = profit;
    }

    if (maxProfit > 10000) {
      maxProfit = 10000; // Cap the maximum profit
    }
  }

  return maxProfit !== -Infinity ? maxProfit : null;
};

const getPriceDifferencePercentage = (initialPrice: string | null, finalPrice: string | null) => {
  if (initialPrice !== null && finalPrice !== null) {
    const initial = parseFloat(initialPrice);
    const final = parseFloat(finalPrice);
    if (!isNaN(initial) && !isNaN(final) && initial !== 0) {
      return ((final - initial) / initial) * 100;
    }
  }
  return 0;
};

export const getProfitForTimeRange = (socialCallData: SocialPost, timeRangeKey: keyof SocialPost) => {
  const buyPrice = socialCallData.priceInComommonTokenAtMessage;
  const rawPriceAtTimeRange = socialCallData[timeRangeKey];

  // Ensure that the price at the time range is a string (or null) and matches the expected format.
  const priceAtTimeRange =
    typeof rawPriceAtTimeRange === 'string' || rawPriceAtTimeRange === null ? rawPriceAtTimeRange : null; // Convert to null if not a string

  if (typeof timeRangeKey === 'string' && timeRangeKey.startsWith('priceInComommonToken')) {
    return getPriceDifferencePercentage(buyPrice, priceAtTimeRange);
  }
  return null;
};
