import { z } from 'zod';

export const PostSchema = z.object({
  channelLink: z.string().optional().nullable(),
  channelName: z.string().optional().nullable(),
  codeUnixTimestampInSeconds: z.number(),
  id: z.number(),
  isDiscord: z.boolean().default(false),
  isTelegram: z.boolean().default(false),
  isTwitter: z.boolean().default(false),
  isUniswapV2: z.boolean().default(false),
  isUniswapV3: z.boolean().default(false),
  liquidityInCommonTokenAtMessage: z.string().nullable(),
  marketcapAtMessage: z.string().nullable(),
  message: z.string().nullable(),
  messageUnixTimestampInSeconds: z.number(),
  pairAddress: z.string().optional(),
  photo: z.string().optional().nullable(),
  priceInUsdAtMessageAtMessage: z.string().nullable(),
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
  socialAccountId: z.number(),
  tokenAddress: z.string().optional(),
  tokenImage: z.string().nullable(),
  tokenName: z.string().nullable(),
  tokenSymbol: z.string().nullable(),
  username: z.string().optional(),
});

export const PaginationInfoSchema = z.object({
  page: z.number(),
  limit: z.number(),
});

export const SocialPostsSchema = z.object({
  next: PaginationInfoSchema.optional(),
  results: z.array(PostSchema),
});

export const PostsResponseSchema = z.object({
  message: z.string(),
  totalPages: z.number(),
  currentPage: z.number(),
  socialPosts: SocialPostsSchema,
});

export const AccountWithPostsSchema = z.object({
  id: z.string(),
  username: z.string().optional(),
  channelLink: z.string().optional().nullable(),
  channelName: z.string().optional().nullable(),
  photo: z.string().optional().nullable(),
  isTwitter: z.boolean().default(false),
  isTelegram: z.boolean().default(false),
  isDiscord: z.boolean().default(false),
  posts: PostSchema.array(),
});

export const AccountsResponseSchema = z.object({
  message: z.string(),
  currentPage: z.number(),
  totalPages: z.number(),
  socialAccounts: z.array(AccountWithPostsSchema),
});