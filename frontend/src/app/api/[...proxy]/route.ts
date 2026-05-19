const RAILWAY_URL = process.env.RAILWAY_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

async function handler(request: Request, { params }: { params: Promise<{ proxy: string[] }> }) {
  const { proxy } = await params;
  const path = proxy.join('/');
  const url = `${RAILWAY_URL}/api/${path}`;

  const headers = new Headers(request.headers);
  headers.delete('host');

  const body = request.method !== 'GET' && request.method !== 'HEAD'
    ? await request.text()
    : undefined;

  const response = await fetch(url, {
    method: request.method,
    headers,
    body,
  });

  const responseHeaders = new Headers(response.headers);
  responseHeaders.delete('content-encoding');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
