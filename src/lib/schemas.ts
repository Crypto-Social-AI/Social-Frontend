import { z } from 'zod';

export const BasePostSchema = z.object({
  codeUnixTimestampInSeconds: z.number(),
  id: z.number(),
  isUniswapV2: z.boolean().default(false),
  isUniswapV3: z.boolean().default(false),
  liquidityInCommonTokenAtMessage: z.string().nullable(),
  marketcapAtMessage: z.string().nullable(),
  message: z.string().nullable(),
  messageUnixTimestampInSeconds: z.number(),
  pairAddress: z.string().optional(),
  priceInComommonTokenAtMessage: z.string().nullable(),
  priceInComommonTokenOneMinuteLater: z.string().nullable(),
  priceInComommonTokenFiveMinutesLater: z.string().nullable(),
  priceInComommonTokenTenMinutesLater: z.string().nullable(),
  priceInComommonTokenThirtyMinutesLater: z.string().nullable(),
  priceInComommonTokenOneHourLater: z.string().nullable(),
  priceInComommonTokenFourHoursLater: z.string().nullable(),
  priceInComommonTokenEightHoursLater: z.string().nullable(),
  priceInComommonTokenSixteenHoursLater: z.string().nullable(),
  priceInComommonTokenOneDayLater: z.string().nullable(),
  priceInComommonTokenThreeDaysLater: z.string().nullable(),
  priceInComommonTokenOneWeekLater: z.string().nullable(),
  priceInComommonTokenTwoWeeksLater: z.string().nullable(),
  priceInComommonTokenThreeWeeksLater: z.string().nullable(),
  priceInComommonTokenOneMonthLater: z.string().nullable(),
  priceInUsdAtMessageAtMessage: z.string().nullable(),
  socialAccountId: z.number(),
  tokenAddress: z.string().optional(),
  tokenImage: z.string().nullable(),
  tokenName: z.string().nullable(),
  tokenSymbol: z.string().nullable(),
});

export const PostSchema = BasePostSchema.extend({
  channelLink: z.string().optional().nullable(),
  channelName: z.string().optional().nullable(),
  isDiscord: z.boolean().default(false),
  isTelegram: z.boolean().default(false),
  isTwitter: z.boolean().default(false),
  photo: z.string().optional().nullable(),
  username: z.string().optional(),
});

export const PostsResponseSchema = z.object({
  currentPage: z.number(),
  data: z.array(PostSchema),
  message: z.string(),
  totalPages: z.number(),
});

export const AccountWithPostsSchema = z.object({
  channelLink: z.string().optional().nullable(),
  channelName: z.string().optional().nullable(),
  id: z.number(),
  isDiscord: z.boolean().default(false),
  isTelegram: z.boolean().default(false),
  isTwitter: z.boolean().default(false),
  photo: z.string().optional().nullable(),
  posts: z.array(BasePostSchema),
  username: z.string().optional(),
});

export const AccountsResponseSchema = z.object({
  currentPage: z.number(),
  data: z.array(AccountWithPostsSchema),
  message: z.string(),
  totalPages: z.number(),
});
