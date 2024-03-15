import { getUserTokenCookie } from "../auth/cookieUtility";

export const createWebSocket = (serverUrl) => {
  const token = getUserTokenCookie(); // Get user token from cookie

  // Append token to WebSocket URL if it exists
  const urlWithToken = token ? `${serverUrl}?token=${token}` : serverUrl;

  // Create and return a new WebSocket instance
  return new WebSocket(urlWithToken);
};