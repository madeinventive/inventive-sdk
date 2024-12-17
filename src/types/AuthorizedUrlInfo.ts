import { TokensData } from './TokensData';

export interface AuthorizedUrlInfo {
  url: string;
  tokens?: TokensData;
  scopeToken?: string;
  hostUrl?: string;
  [k: string]: unknown; // allowing for any other properties
}
