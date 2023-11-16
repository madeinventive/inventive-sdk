import { ExternalAccountScope } from './ExternalAccountScope';

export interface ExternalUserInfo {
  firstname: string;
  lastname: string;
  email: string;
  accountScope: ExternalAccountScope;
}
