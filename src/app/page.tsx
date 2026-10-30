import { AppCard } from "@/components/AppCard";
import { apps } from "@/content/apps";
import { site } from "@/content/site";

/** Studio home page: `/`. */
export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">{site.tagline}</h1>
      <p className="mt-4 max-w-xl text-lg text-muted">{site.description}</p>

      <h2 className="mt-16 text-sm font-semibold tracking-wider text-muted uppercase">Our apps</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {apps.map((app) => (
          <AppCard key={app.slug} app={app} />
        ))}
      </div>
    </div>
  );
}
