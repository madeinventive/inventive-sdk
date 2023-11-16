import { TokensData } from './TokensData';

export interface EmbedTokensMessage {
  type: 'embed_tokens';
  tokens?: TokensData;
}
