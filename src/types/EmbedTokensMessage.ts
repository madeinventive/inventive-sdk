import { TokensData } from './TokensData';

export interface EmbedTokensMessage {
  type: 'embed_tokens';
  tokens?: TokensData;
  hostUrl?: string;
  scopeToken?: string;
  [k: string]: unknown; // allowing for any other properties
}
