import Link from "next/link";

/** 404 page; GitHub Pages serves the exported `404.html` for unknown paths. */
export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-28 text-center sm:px-6">
      <p className="font-display text-8xl font-bold tracking-tight sm:text-9xl">
        <span className="text-gradient">404</span>
      </p>
      <h1 className="mt-4 font-display text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-muted">The page you are looking for does not exist.</p>
      <Link href="/" className="btn-primary mt-8 inline-flex h-12 items-center rounded-2xl px-6 font-semibold">
        Back to home
      </Link>
    </div>
  );
}
