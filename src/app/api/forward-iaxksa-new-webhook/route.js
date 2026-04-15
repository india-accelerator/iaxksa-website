const DEFAULT_NEW_WEBHOOK_URL =
  "https://automate.indiaaccelerator.live/webhook/6635a098-92f6-409a-9b39-73cdb9ed6f5a";

/** New-schema JSON for IA X KSA. Override with IAXKSA_WEBHOOK_NEW_URL. */
export async function POST(request) {
  const newUrl =
    process.env.IAXKSA_WEBHOOK_NEW_URL || DEFAULT_NEW_WEBHOOK_URL;

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const upstream = await fetch(newUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const text = await upstream.text();
  return new Response(text, {
    status: upstream.status,
    headers: {
      "Content-Type":
        upstream.headers.get("content-type") || "application/json",
    },
  });
}
