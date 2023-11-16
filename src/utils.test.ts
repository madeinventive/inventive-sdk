import { getApiEndpoint, getApiKey, isEnvSetup } from './utils';

describe('getApiEndpoint()', () => {
  afterEach(() => {
    delete process.env.INVENTIVE_API_ENDPOINT;
    delete process.env.NEXT_PUBLIC_INVENTIVE_API_ENDPOINT;
  });

  it('prefers the value from backend env variable, INVENTIVE_API_ENDPOINT', () => {
    process.env.INVENTIVE_API_ENDPOINT = 'backend_env_value';
    process.env.NEXT_PUBLIC_INVENTIVE_API_ENDPOINT = 'frontend_env_value';
    // Your test code that uses process.env.some_variable
    expect(getApiEndpoint()).toBe('backend_env_value');
  });

  it('use the value from front env variable, NEXT_PUBLIC_INVENTIVE_API_ENDPOINT, if the backend one is not defined', () => {
    process.env.NEXT_PUBLIC_INVENTIVE_API_ENDPOINT = 'frontend_env_value';
    // Your test code that uses process.env.some_variable
    expect(getApiEndpoint()).toBe('frontend_env_value');
  });

  it('returns undefined if not the api endpoint env variables are defined', () => {
    // Your test code that uses process.env.some_variable
    expect(getApiEndpoint()).toBeUndefined();
  });
});

describe('getApiKey()', () => {
  afterEach(() => {
    delete process.env.INVENTIVE_API_KEY;
    delete process.env.NEXT_PUBLIC_INVENTIVE_API_KEY;
  });

  it('prefers the value from backend env variable, INVENTIVE_API_KEY', () => {
    process.env.INVENTIVE_API_KEY = 'backend_env_value';
    process.env.NEXT_PUBLIC_INVENTIVE_API_KEY = 'frontend_env_value';
    // Your test code that uses process.env.some_variable
    expect(getApiKey()).toBe('backend_env_value');
  });

  it('use the value from front env variable, NEXT_PUBLIC_INVENTIVE_API_KEY, if the backend one is not defined', () => {
    process.env.NEXT_PUBLIC_INVENTIVE_API_KEY = 'frontend_env_value';
    // Your test code that uses process.env.some_variable
    expect(getApiKey()).toBe('frontend_env_value');
  });

  it('returns undefined if not the api endpoint env variables are defined', () => {
    // Your test code that uses process.env.some_variable
    expect(getApiKey()).toBeUndefined();
  });
});

describe('isEnvSetup()', () => {
  afterEach(() => {
    delete process.env.INVENTIVE_API_ENDPOINT;
    delete process.env.INVENTIVE_API_KEY;
  });
  it('returns true if both api endpoint and api key are defined', () => {
    process.env.INVENTIVE_API_ENDPOINT = 'api_endpoint';
    process.env.INVENTIVE_API_KEY = 'api_key';
    expect(isEnvSetup()).toBe(true);
  });

  describe('returns false', () => {
    it('when api endpoint is not defined', () => {
      process.env.INVENTIVE_API_KEY = 'api_key';
      expect(isEnvSetup()).toBe(false);
    });
    it('when api key is not defined', () => {
      process.env.INVENTIVE_API_ENDPOINT = 'api_endpoint';
      expect(isEnvSetup()).toBe(false);
    });
    it('when none of the api endpoint and api key are defined', () => {
      expect(isEnvSetup()).toBe(false);
    });
  });
});
