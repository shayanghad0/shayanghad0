// Cloudflare Worker entry — serves the built site (./dist) as static
// assets through the ASSETS binding, with an SPA fallback
// configured in wrangler.jsonc (not_found_handling).
// Deploy with: npm run deploy
export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};