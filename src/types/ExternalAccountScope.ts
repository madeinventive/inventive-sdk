export interface ExternalAccountScope {
  externalRefId: string; // C2 account id within C1's system
  name: string; // name of the C2 account
  description?: string; // description of the C2 account
}
