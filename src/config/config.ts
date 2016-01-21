export class AppConfig {
  auth0 : Auth0Config;
  enableLogging : boolean;
  title: string;

};

export interface Auth0Config {
  client_id : string;
  domain : string;
};
