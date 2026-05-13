import { LandingPage } from "@/components/marketing/landing-page";

export const metadata = {
  title: "Chord Progression Ear Training",
  description:
    "Practice common pop and songwriting progressions with curated daily listening drills and adaptive repetition.",
};

export default function ChordProgressionEarTrainingPage() {
  return (
    <LandingPage
      eyebrow="Chord progression ear training"
      title="Hear the difference between I–V–vi–IV and ii–V–I without stopping to think."
      description="EarKit keeps the progression pool intentionally small so songwriters and hobbyist musicians can build recognition through daily repetition."
      bullets={[
        "Curated MVP progression set instead of a giant confusing library.",
        "Multiple-choice listening flow designed for quick mobile sessions.",
        "Adaptive weighting repeats the progressions you keep missing.",
      ]}
    />
  );
}
