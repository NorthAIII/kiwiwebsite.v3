// The <html>/<body> document shell lives in `[locale]/layout.tsx` so that
// `lang`/`dir` follow the active locale. This root layout only needs to pass
// children through — it exists so a global (non-localized) `not-found.tsx` can
// render for URLs that never match the `[locale]` segment.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
