const CLIENT_ID = '0oams1il08SC8D5UX5d5';
const ISSUER = 'https://dev-9213540.okta.com/oauth2/default';
const OKTA_TESTING_DISABLEHTTPSCHECK = process.env.OKTA_TESTING_DISABLEHTTPSCHECK || false;

export default {
    oidc: {
        clientId: CLIENT_ID,
        issuer: ISSUER,
        redirectUri: 'http://localhost:9090/login/callback',
        scopes: ['openid', 'profile', 'email'],
        pkce: true,
        disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
    },
    resourceServer: {
        messagesUrl: 'http://localhost:8000/api/messages',
    },
};