import { LandingPage } from "@/components/marketing/landing-page";

export const metadata = {
  title: "Chord Progression Practice for Songwriters",
  description:
    "Practice hearing common chord movement by ear with short drills designed for songwriters and producers.",
};

export default function ForSongwritersPage() {
  return (
    <LandingPage
      eyebrow="For songwriters"
      title="Train your ear to recognize progressions you actually write with."
      description="Songwriters do not need a conservatory curriculum to hear better changes. They need repetition on the progressions that keep showing up in real sessions."
      bullets={[
        "Curated progression pool covers common pop and songwriting movement.",
        "Adaptive practice emphasizes the changes your ear still misses.",
        "A mobile-first drill flow makes it easy to practice between writing sessions.",
      ]}
    />
  );
}
