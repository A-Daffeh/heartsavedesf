// src/auth/msal.js
import { PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}`,
    redirectUri: import.meta.env.VITE_AZURE_REDIRECT_URI, // e.g. http://localhost:5173
    postLogoutRedirectUri: import.meta.env.VITE_AZURE_REDIRECT_URI,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false, // set true if you must support IE
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);

/**
 * Call this ONCE before using msalInstance anywhere.
 * It waits for internal initialization and processes any pending redirects.
 */
export async function initMsal() {
  await msalInstance.initialize();

  // If you use redirect flows anywhere, this processes the response
  try {
    await msalInstance.handleRedirectPromise();
  } catch (e) {
    // swallow – if there was no redirect in progress this throws
    console.log(e);
  }

  // Optional: pick the first account as the active account
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
  }

  return msalInstance;
}
