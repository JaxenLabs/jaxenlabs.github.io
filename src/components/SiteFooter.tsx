import Link from "next/link";
import { apps } from "@/content/apps";
import { site } from "@/content/site";

/** Footer with every app's legal links, so they are one click from any page. */
export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 text-sm sm:grid-cols-2 sm:px-6">
        <div>
          <p className="font-semibold">{site.name}</p>
          <p className="mt-1 text-muted">{site.tagline}</p>
          <a href={`mailto:${site.contactEmail}`} className="mt-3 inline-block text-accent hover:underline">
            {site.contactEmail}
          </a>
        </div>
        <ul className="grid gap-4 sm:justify-end">
          {apps.map((app) => (
            <li key={app.slug}>
              <Link href={`/${app.slug}/`} className="font-medium hover:text-accent">
                {app.name}
              </Link>
              <div className="mt-1 flex gap-4 text-muted">
                <Link href={`/${app.slug}/privacy-policy/`} className="hover:text-text">
                  Privacy Policy
                </Link>
                <Link href={`/${app.slug}/terms/`} className="hover:text-text">
                  Terms
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <p className="pb-8 text-center text-xs text-muted">
        © {new Date().getFullYear()} {site.name}
      </p>
    </footer>
  );
}
