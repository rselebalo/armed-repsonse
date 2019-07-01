const global = {
  BASE_API_URL: "http://localhost:3000",
  TOKEN: undefined,
  AUTH0_ARMED_RESPONSE_CLIENT_ID: "3PO78LRBCMRanVETAdTC9x3H2JQbgg3W",
  AUTH0_ARMED_RESPONSE_CLIENT_SECRET:
    "Ao4ACGLb8eJr1OozyQlc8vS6iu7oMO9PuBoQJWafWhMeMdhNR-e_T9skj_hR49kb",
  AUTH0_REALM: "armed-response",
  CALLBACK: process.env.NODE_ENV === "development"? "http://localhost:3000/callback": "https://localhost/callback",
  AUTH0_DOMAIN: "rethabile.auth0.com"
};
export default global;
