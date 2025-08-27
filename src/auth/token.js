// src/auth/token.js
import { msalInstance } from "./msal";

const GRAPH_SCOPES = ["Sites.ReadWrite.All", "User.Read"];

export async function getToken() {
  const account = msalInstance.getActiveAccount() || msalInstance.getAllAccounts()[0];

  try {
    const resp = await msalInstance.acquireTokenSilent({
      account,
      scopes: GRAPH_SCOPES,
    });
    return resp.accessToken;
  } catch (e) {
    console.log(e);
    // Fallback to interactive if needed
    await msalInstance.loginPopup({ scopes: GRAPH_SCOPES });
    const account2 = msalInstance.getActiveAccount() || msalInstance.getAllAccounts()[0];
    const resp2 = await msalInstance.acquireTokenSilent({
      account: account2,
      scopes: GRAPH_SCOPES,
    });
    return resp2.accessToken;
  }
}
