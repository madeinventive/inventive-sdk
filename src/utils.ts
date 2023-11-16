import { EmbedTokensMessage, TokensData } from './types';

export const getApiEndpoint = (): string | undefined => {
  // calling api from the backend is preferred, more secure
  if (process.env.INVENTIVE_API_ENDPOINT) {
    return process.env.INVENTIVE_API_ENDPOINT;
  }

  // otherwise, we can make due with calls from the frontend if the client understand the risk
  if (process.env.NEXT_PUBLIC_INVENTIVE_API_ENDPOINT) {
    return process.env.NEXT_PUBLIC_INVENTIVE_API_ENDPOINT;
  }

  return undefined;
};

export const getApiKey = (): string | undefined => {
  // calling api from the backend is preferred, more secure
  if (process.env.INVENTIVE_API_KEY) {
    return process.env.INVENTIVE_API_KEY;
  }

  // otherwise, we can make due with calls from the frontend if the client understand the risk
  if (process.env.NEXT_PUBLIC_INVENTIVE_API_KEY) {
    return process.env.NEXT_PUBLIC_INVENTIVE_API_KEY;
  }

  return undefined;
};

export const isEnvSetup = (): boolean => {
  return !!getApiEndpoint() && !!getApiKey();
};

export const createEmbedTokensMessage = (
  tokens?: TokensData
): EmbedTokensMessage => {
  return {
    type: 'embed_tokens',
    tokens,
  };
};
