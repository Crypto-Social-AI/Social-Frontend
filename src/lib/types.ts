import { type z } from 'zod';
import { type AccountWithPostsSchema, type PostSchema, type PostsResponseSchema } from './schemas';

export type SocialPost = z.infer<typeof PostSchema>;
export type SocialPosts = SocialPost[];
export type SocialPostsResponse = z.infer<typeof PostsResponseSchema>;

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

export type SocialAccountWithPost = z.infer<typeof AccountWithPostsSchema>;
