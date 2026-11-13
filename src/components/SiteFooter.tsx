import Image from "next/image";
import Link from "next/link";
import { apps } from "@/content/apps";
import { site } from "@/content/site";
import { FacebookIcon } from "./FacebookLink";
import { LogoMark } from "./LogoMark";

/** Footer with every app's legal links, so they are one click from any page. */
export function SiteFooter() {
  return (
    <footer className="relative mt-24">
      <div className="h-px bg-linear-to-r from-transparent via-accent/50 to-transparent" />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_2fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5 font-display text-xl font-semibold tracking-tight">
            <LogoMark className="size-9" />
            {site.name}
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted">{site.tagline}</p>
          <div className="mt-5 flex flex-col gap-2 text-sm">
            <Link href="/contact/" className="w-fit font-medium transition-colors hover:text-accent">
              Contact us →
            </Link>
            <a href={`mailto:${site.contactEmail}`} className="w-fit break-all text-accent hover:underline">
              {site.contactEmail}
            </a>
            <a
              href={site.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 text-muted transition-colors hover:text-text"
            >
              <FacebookIcon className="size-4" />
              Follow us on Facebook
            </a>
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {apps.map((app) => (
            <li key={app.slug}>
              <Link href={`/${app.slug}/`} className="group inline-flex items-center gap-2.5 font-medium">
                <Image src={app.iconSrc} alt="" width={28} height={28} className="size-7 rounded-lg" />
                <span className="transition-colors group-hover:text-accent">{app.name}</span>
              </Link>
              <div className="mt-3 flex flex-col gap-2 text-sm text-muted">
                {app.privacy && (
                  <Link href={`/${app.slug}/privacy-policy/`} className="w-fit transition-colors hover:text-text">
                    Privacy Policy
                  </Link>
                )}
                {app.client && <span>Client project</span>}
                {app.terms && (
                  <Link href={`/${app.slug}/terms/`} className="w-fit transition-colors hover:text-text">
                    Terms
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <p className="border-t border-border py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} {site.name}. Made with care.
      </p>
    </footer>
  );
}
