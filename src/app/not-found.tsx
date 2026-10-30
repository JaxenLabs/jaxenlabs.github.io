import Link from "next/link";

/** 404 page; GitHub Pages serves the exported `404.html` for unknown paths. */
export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-muted">The page you are looking for does not exist.</p>
      <Link href="/" className="mt-6 inline-block text-accent hover:underline">
        Back to home
      </Link>
    </div>
  );
}
