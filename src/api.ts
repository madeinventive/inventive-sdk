import { AuthorizedUrlInfo, ExternalUserInfo } from './types';
import { getApiEndpoint, getApiKey } from './utils';
import fetch, { Response } from 'node-fetch';
import { ensureType } from './validatorUtils';
// import { validators } from './__gen__/validators';
import * as validators from './__gen__/validators';

export const getAuthorizedUrl = async (
  embedAuthToken: string,
  userInfo: ExternalUserInfo,
  silent = false
): Promise<AuthorizedUrlInfo | undefined> => {
  const apiEndpoint = getApiEndpoint();
  const apiKey = getApiKey();

  // cannot make the call without the env variables
  if (!apiEndpoint || !apiKey) return;

  let result: Response;
  let errorToThrow: Error | undefined;
  try {
    result = await fetch(`${apiEndpoint}/embed/getAuthorizedUrl`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'INVENTIVE-API-KEY': apiKey,
      },
      body: JSON.stringify({
        embedAuthToken,
        userInfo,
      }),
    });

    if (result.ok) {
      return ensureType<AuthorizedUrlInfo>(
        validators.AuthorizedUrlInfo,
        await result.json()
      );
    }
    // something isn't quick right, set up the error object to throw
    errorToThrow = new Error(result.statusText);
  } catch (error: unknown) {
    if (error instanceof Error) {
      // caller need to be prepared to handle possible errors encountered by this function if not 'slient'
      // possible errors include:
      // - those from json parsing
      // - validation of AuthorizedUrlInfo type, and
      // - other async network errors such as 'ERR_NETWORK_IO_SUSPENDED' (i.e. network was suspended due to user being idle) or network timeout
      errorToThrow = error;
    }
  }

  // now, complain loudly if not silent
  if (!silent) {
    throw errorToThrow;
  }
  return;
};
