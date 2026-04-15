/** Default: same automate URL as new webhook (old UUID returns 404). Set IAXKSA_WEBHOOK_PRIMARY_URL for a separate legacy n8n URL. */
const DEFAULT_PRIMARY_WEBHOOK_URL =
  "https://automate.indiaaccelerator.live/webhook/6635a098-92f6-409a-9b39-73cdb9ed6f5a";

/** Legacy `{ startup: { ... } }` payload. Override with IAXKSA_WEBHOOK_PRIMARY_URL. */
export async function POST(request) {
  const primaryUrl =
    process.env.IAXKSA_WEBHOOK_PRIMARY_URL || DEFAULT_PRIMARY_WEBHOOK_URL;

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const upstream = await fetch(primaryUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const text = await upstream.text();

  if (!upstream.ok) {
    return Response.json(
      {
        error: "Upstream automate webhook returned an error",
        upstreamStatus: upstream.status,
        detail: text.slice(0, 500),
      },
      { status: 502 }
    );
  }

  return new Response(text, {
    status: upstream.status,
    headers: {
      "Content-Type":
        upstream.headers.get("content-type") || "application/json",
    },
  });
}
