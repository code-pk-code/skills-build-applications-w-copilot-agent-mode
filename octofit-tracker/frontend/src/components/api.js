export function getApiUrl(resource) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/${resource}/`
    : `/api/${resource}/`;
}

export function normalizeResponse(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload?.data && Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload?.items && Array.isArray(payload.items)) {
    return payload.items;
  }

  return [];
}

export async function fetchResource(resource) {
  const response = await fetch(getApiUrl(resource));

  if (!response.ok) {
    throw new Error(`Failed to load ${resource}: ${response.statusText}`);
  }

  const payload = await response.json();
  return normalizeResponse(payload);
}
