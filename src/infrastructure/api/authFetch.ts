type AccessTokenProvider = () => Promise<string | null>;

/**
 * Helper function to make authenticated API requests
 *
 * Usage:
 * const result = await authFetch(auth0, 'https://api.example.com/users', {
 *   method: 'POST',
 *   body: JSON.stringify({ nickname: 'player123', email: 'user@example.com' })
 * });
 */
export async function authFetch(
  getAccessToken: AccessTokenProvider,
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = await getAccessToken();

  const headers = new Headers(options.headers);

  // Set Authorization header only if token is available
  // Backend with optionalAuth will accept requests with or without token
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  headers.set('Content-Type', 'application/json');

  return fetch(url, {
    ...options,
    headers,
  });
}

/**
 * Helper function for multipart/form-data requests (e.g., file uploads)
 * Does NOT set Content-Type so Fetch can set it with proper boundary
 *
 * Usage:
 * const result = await authFetchMultipart(getAccessToken, 'https://api.example.com/upload', {
 *   method: 'POST',
 *   body: formData
 * });
 */
export async function authFetchMultipart(
  getAccessToken: AccessTokenProvider,
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = await getAccessToken();

  if (!token) {
    throw new Error('No access token available. User must be logged in.');
  }

  const headers = new Headers(options.headers);
  headers.set('Authorization', `Bearer ${token}`);

  return fetch(url, {
    ...options,
    headers,
  });
}
