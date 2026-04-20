import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ScrollProgress } from "@/components/ScrollProgress";
import { InkCursor } from "@/components/InkCursor";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.5em] text-violet">Out of office</p>
        <h1 className="mt-4 font-display text-8xl text-pearl text-glow">404</h1>
        <h2 className="mt-4 font-display text-2xl italic text-bone">This memo does not exist.</h2>
        <p className="mt-2 text-sm text-bone/70">
          Bartholomew has filed your request in the void. Please refer to your last email.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-3 border border-ink/50 bg-ink/10 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.3em] text-pearl transition-all hover:border-ink hover:bg-ink/20 hover:shadow-[0_0_30px_var(--ink)]"
          >
            ← Return to HQ
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Eternity Corp — $OOO" },
      { name: "description", content: "Synergizing the void, forever. The immortal corporate shitcoin on Ink Chain." },
      { name: "author", content: "Bartholomew, CEO" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="grain bg-obsidian text-pearl antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <ScrollProgress />
      <InkCursor />
      <SiteNav />
      <Outlet />
      <SiteFooter />
    </>
  );
}
