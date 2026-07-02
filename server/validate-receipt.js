/* ============================================================
   Cork Word — receipt validator (Cloudflare Worker template)
   ------------------------------------------------------------
   A tiny, free, serverless endpoint that verifies an in-app
   purchase with Apple / Google BEFORE the app grants coins.
   Only fires when a user actually buys, so it costs ~nothing.

   Deploy (free):
     1. npm i -g wrangler && wrangler login
     2. Put secrets:  wrangler secret put APPLE_SHARED_SECRET
                      wrangler secret put GOOGLE_SERVICE_ACCOUNT   (JSON, for Play)
     3. wrangler deploy
     4. Copy the deployed URL into native.js → VALIDATE_URL.

   The app POSTs: { platform: "ios"|"android", productId, receipt }
   This returns:  { valid: true|false }
   ============================================================ */

export default {
  async fetch(request, env) {
    if (request.method !== "POST") return json({ valid: false, error: "POST only" }, 405);
    let body;
    try { body = await request.json(); } catch { return json({ valid: false, error: "bad json" }, 400); }

    const { platform, productId, receipt } = body || {};
    if (!platform || !productId || !receipt) return json({ valid: false, error: "missing fields" }, 400);

    try {
      const valid = platform === "ios"
        ? await verifyApple(receipt, productId, env)
        : await verifyGoogle(receipt, productId, env);
      return json({ valid: !!valid });
    } catch (e) {
      return json({ valid: false, error: String(e) }, 200);
    }
  }
};

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json" } });
}

/* ---- Apple: legacy verifyReceipt (simplest; works for consumables) ----
   `receipt` = base64 app receipt from the purchase. Try production first,
   then fall back to sandbox (status 21007) so TestFlight/sandbox works too. */
async function verifyApple(receipt, productId, env) {
  const payload = JSON.stringify({
    "receipt-data": receipt,
    "password": env.APPLE_SHARED_SECRET,   // App Store Connect → App-Specific Shared Secret
    "exclude-old-transactions": true
  });
  let r = await appleCall("https://buy.itunes.apple.com/verifyReceipt", payload);
  if (r.status === 21007) r = await appleCall("https://sandbox.itunes.apple.com/verifyReceipt", payload);
  if (r.status !== 0) return false;
  const items = [...(r.receipt?.in_app || []), ...(r.latest_receipt_info || [])];
  return items.some((it) => it.product_id === productId);
}
async function appleCall(url, payload) {
  const res = await fetch(url, { method: "POST", body: payload });
  return res.json();
}

/* ---- Google Play: Purchases.products.get ----
   `receipt` should carry the purchaseToken (and packageName) from the Play
   Billing result. Requires a service account with the Android Publisher scope.
   Sketch below — fill in your OAuth token retrieval for production. */
async function verifyGoogle(receipt, productId, env) {
  const { purchaseToken, packageName } = typeof receipt === "string" ? JSON.parse(receipt) : receipt;
  if (!purchaseToken || !packageName) return false;
  const accessToken = await getGoogleAccessToken(env);  // implement with your service account (JWT → token)
  const url = `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${packageName}/purchases/products/${productId}/tokens/${purchaseToken}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
  if (!res.ok) return false;
  const data = await res.json();
  // purchaseState: 0 = purchased
  return data.purchaseState === 0;
}

// Placeholder — exchange the service-account JSON for an OAuth access token.
// Easiest: use Google's library on a Node host, or sign a JWT in the Worker.
async function getGoogleAccessToken(env) {
  throw new Error("Implement getGoogleAccessToken() with your GOOGLE_SERVICE_ACCOUNT");
}
