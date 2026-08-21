const DEFAULT_WAITLIST_WEBHOOK_URL =
  "https://automate.indiaaccelerator.live/webhook/43f98e30-8110-4e97-8cab-2cf4c49ead89";

/** Waitlist capture for the closed Cohort 01. Override with IAXKSA_WAITLIST_WEBHOOK_URL. */
export async function POST(request) {
  const url =
    process.env.IAXKSA_WAITLIST_WEBHOOK_URL || DEFAULT_WAITLIST_WEBHOOK_URL;

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    const upstream = await fetch(url, {
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
  } catch (error) {
    return Response.json(
      { error: "Upstream webhook unreachable", detail: String(error) },
      { status: 502 },
    );
  }
}
