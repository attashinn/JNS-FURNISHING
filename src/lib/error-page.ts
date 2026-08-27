export function renderErrorPage(errorDetails?: string): string {
  const safeErr = errorDetails ? String(errorDetails).replace(/</g, "&lt;").replace(/>/g, "&gt;") : "";
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>JNS Furnishing — Page Notice</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #faf9f6; color: #141715; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 32rem; width: 100%; text-align: center; padding: 2.5rem 2rem; background: #fff; border: 1px solid #e8e2d8; border-radius: 0.375rem; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); }
      h1 { font-size: 1.25rem; margin: 0.25rem 0 0.5rem; color: #141715; font-weight: 800; }
      p { color: #7a766f; margin: 0 0 1.5rem; font-size: 0.875rem; }
      .error-box { background: #fef2f2; border: 1px solid #fee2e2; color: #b91c1c; padding: 0.75rem; border-radius: 0.25rem; font-family: monospace; font-size: 0.75rem; text-align: left; overflow-x: auto; margin-bottom: 1.5rem; white-space: pre-wrap; word-break: break-all; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.6rem 1.25rem; border-radius: 0.25rem; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #141715; color: #fff; }
      .secondary { background: #fff; color: #141715; border-color: #e8e2d8; }
    </style>
  </head>
  <body>
    <div class="card">
      <span style="font-size: 0.65rem; letter-spacing: 0.25em; text-transform: uppercase; color: #d4a25a; font-weight: 800; display: block; margin-bottom: 0.5rem;">JNS Furnishing</span>
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      ${safeErr ? `<div class="error-box"><strong>Server Log:</strong><br/>${safeErr}</div>` : ""}
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
