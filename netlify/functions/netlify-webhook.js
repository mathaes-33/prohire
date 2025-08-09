import crypto from "crypto";

export async function handler(event) {
  const NETLIFY_WEBHOOK_SECRET = process.env.NETLIFY_WEBHOOK_SECRET;

  // Parse JSON body
  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch (err) {
    return {
      statusCode: 400,
      body: "Invalid JSON"
    };
  }

  // Verify signature
  const signature = event.headers["x-netlify-signature"];
  const expectedSignature = crypto
    .createHmac("sha256", NETLIFY_WEBHOOK_SECRET)
    .update(JSON.stringify(payload))
    .digest("hex");

  if (signature !== expectedSignature) {
    return {
      statusCode: 401,
      body: "Invalid signature"
    };
  }

  // Handle events
  const { event: identityEvent, user } = payload;

  if (identityEvent === "signup") {
    console.log("📢 New user signed up:", user.email);
    // TODO: Add to database, send welcome email, etc.
  }

  if (identityEvent === "login") {
    console.log("👋 User logged in:", user.email);
    // TODO: Track login, update stats, etc.
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ status: "ok" })
  };
}
