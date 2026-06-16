import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Geo-detected locale switching (§2) is layered on top of next-intl's
// negotiation in Phase 2 via Vercel edge geo. For now this handles
// locale-prefixed routing + Accept-Language negotiation.
export default createMiddleware(routing);

export const config = {
  // Skip API, Next internals, and anything with a file extension.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
