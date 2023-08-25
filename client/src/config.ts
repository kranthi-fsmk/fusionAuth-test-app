import { FusionAuthConfig } from '@fusionauth/react-sdk';

export const config: FusionAuthConfig = {
    clientID: '6516eddc-f3ee-49dd-ac8d-ff536dcf2ab9', // The client ID of your FusionAuth application, e.g., '90ba1caf-c0c1-b30a-af38-3ed438df9fc0'
    serverUrl: 'https://fsmk-uat.fusionauth.io',  // The URL of your server that performs the token exchange
    redirectUri: 'http://localhost:3000', // Where to redirect to your React client after authentication

    loginPath: '/oauth2/authorize',
    tokenRefreshPath: '/api/jwt/refresh',
    // mePath: '/app/me',

};
