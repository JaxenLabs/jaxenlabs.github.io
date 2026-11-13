import type { IconName } from "./types";

/**
 * HOME PAGE TEXT about Jaxen Labs as a software company: the three values,
 * "What we engineer", the scrolling tech list and "How we work".
 *
 * Rule for editing: every capability and tool listed here must be one our
 * shipped products really use, so the site never claims something the
 * products don't show.
 */

/** The three commitments in the company statement. */
export const values: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "offline",
    title: "Reliable",
    text: "Software that does what it promises: stable, carefully engineered and designed to keep working offline.",
  },
  {
    icon: "layers",
    title: "Scalable",
    text: "Clean architecture and shared code across platforms, so products grow without being rebuilt.",
  },
  {
    icon: "spark",
    title: "Innovative",
    text: "On-device intelligence and modern tooling, used to solve real problems rather than to follow trends.",
  },
];

/** What we engineer. Each one is shipped in at least one of our products. */
export const capabilities: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "device",
    title: "Mobile engineering",
    text: "Native Android with Kotlin and Jetpack Compose, and cross-platform apps with Flutter and Kotlin Multiplatform.",
  },
  {
    icon: "cpu",
    title: "On-device intelligence",
    text: "Text recognition and document scanning that run on the device itself, fast and private, plus natural voice input.",
  },
  {
    icon: "cloud",
    title: "Cloud and integrations",
    text: "Firebase, Google Drive backup and Google Play Billing, connected securely and only where they add value.",
  },
  {
    icon: "lock",
    title: "Privacy and security",
    text: "Local-first data, biometric app lock, password-protected PDFs and clear, honest data policies.",
  },
  {
    icon: "globe",
    title: "Web engineering",
    text: "Fast, accessible and search-friendly websites built with Next.js, React and TypeScript.",
  },
  {
    icon: "pen",
    title: "Product design",
    text: "Calm, focused interfaces with light and dark themes, designed around the people who use them.",
  },
];

/** Tools we build with, shown in the scrolling strip. */
export const techStack = [
  "Kotlin",
  "Jetpack Compose",
  "Kotlin Multiplatform",
  "Flutter",
  "Dart",
  "Firebase",
  "ML Kit",
  "Google Play Billing",
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
];

/** How we take a product from idea to release. */
export const process: { step: string; title: string; text: string }[] = [
  { step: "01", title: "Understand", text: "Start from the real problem and the people who have it." },
  { step: "02", title: "Design", text: "Shape a simple, focused experience before writing code." },
  { step: "03", title: "Engineer", text: "Build it to be reliable, secure and ready to scale." },
  { step: "04", title: "Improve", text: "Ship, listen and keep making it better with every release." },
];
