import { z } from 'zod';

export const PostSchema = z.object({
  id: z.number(),
  message: z.string().nullable(),
  messageUnixTimestampInSeconds: z.number(),
  codeUnixTimestampInSeconds: z.number(),
  tokenName: z.string().nullable(),
  tokenSymbol: z.string().nullable(),
  tokenImage: z.string().nullable(),
  pairAddress: z.string().optional(),
  tokenAddress: z.string().optional(),
  isUniswapV2: z.boolean().default(false),
  isUniswapV3: z.boolean().default(false),
  marketcapAtMessage: z.string().nullable(),
  liquidityInCommonTokenAtMessage: z.string().nullable(),
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
  username: z.string(),
  channelLink: z.string(),
  channelName: z.string(),
  photo: z.string().nullable(),
  isTwitter: z.boolean(),
  isTelegram: z.boolean(),
  isDiscord: z.boolean(),
});

type SocialPost = z.infer<typeof PostSchema>;

export default SocialPost;

export type BgColor = 'base' | 'secondary' | 'contrast';

export type TokenSymbolAndNameProps = {
  tokenImage: string | null;
  tokenSymbol: string | null;
  tokenName: string | null;
  tokenImgBgColor: BgColor;
};

export type CommonTableProps = {
  clickableRows?: boolean;
  handleColClick?: (e: React.MouseEvent<HTMLTableRowElement>, pair: any) => void;
  renderedRecords: any; // TODO definie a more specific type
  idProp: string;
  isExpandable?: boolean;
  expandedRowId?: string | null;
  setExpandedRowId?: React.Dispatch<React.SetStateAction<string | null>>;
  renderExpandedContent?: (record: any) => JSX.Element;
};

export type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
};

export const AccountWithPostsSchema = z.object({
  id: z.string(),
  username: z.string().nullable(),
  channelLink: z.string(),
  channelName: z.string(),
  photo: z.string().nullable(),
  isTwitter: z.boolean().default(false),
  isTelegram: z.boolean().default(false),
  isDiscord: z.boolean().default(false),
  posts: PostSchema.array(),
});

export type SocialAccountWithPost = z.infer<typeof AccountWithPostsSchema>;
