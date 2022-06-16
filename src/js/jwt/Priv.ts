import Keycloak, { KeycloakInitOptions, KeycloakConfig, KeycloakLoginOptions, KeycloakLogoutOptions } from 'keycloak-js';

export type PrivCookie = {
  cookieName: string;
};

export type SSOParsedToken = Keycloak['tokenParsed'] & {
  account_number: string;
  type: string;
  idp: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_org_admin: boolean;
  is_internal: boolean;
  locale: string;
  org_id: string;
  account_id: string;
  jti: string;
};

class Priv {
  _cookie?: string;
  _keycloak: Keycloak;
  cookie?: PrivCookie;

  constructor() {
    this._cookie;
    this._keycloak = {} as Keycloak;
  }

  setCookie(cookie: PrivCookie) {
    this.cookie = cookie;
  }

  setKeycloak(
    options?: string | KeycloakConfig,
    onTokenExpired?: Keycloak['onTokenExpired'],
    onAuthSuccess?: Keycloak['onAuthSuccess'],
    onAuthRefreshSuccess?: Keycloak['onAuthRefreshSuccess']
  ) {
    this._keycloak = new Keycloak(options);
    this._keycloak.onTokenExpired = onTokenExpired;
    this._keycloak.onAuthSuccess = onAuthSuccess;
    this._keycloak.onAuthRefreshSuccess = onAuthRefreshSuccess;
  }

  initializeKeycloak(options: KeycloakInitOptions) {
    this._keycloak?.init(options) as unknown as Promise<boolean>;
  }

  setToken(token: string) {
    this._keycloak.authenticated = true;
    this._keycloak.token = token;
  }

  initialize(options: KeycloakInitOptions) {
    return this._keycloak.init(options);
  }

  setTokenParsed(tokenParsed: Keycloak['tokenParsed']) {
    this._keycloak.tokenParsed = tokenParsed;
  }

  getTokenParsed() {
    return this._keycloak.tokenParsed as SSOParsedToken;
  }

  getToken() {
    return this._keycloak.token;
  }

  getRefershToken() {
    return this._keycloak.refreshToken;
  }

  login(options: KeycloakLoginOptions) {
    return this._keycloak.login(options);
  }

  clearToken() {
    this._keycloak.clearToken();
  }

  getCookie() {
    return this.cookie;
  }

  logout(options: KeycloakLogoutOptions) {
    return this._keycloak.logout(options);
  }

  getAuthenticated() {
    return this._keycloak.authenticated;
  }

  updateToken() {
    // 5 is default KC value, min validaty is required by KC byt then has a default value for some reason
    return this._keycloak.updateToken(5);
  }
}

export default Priv;