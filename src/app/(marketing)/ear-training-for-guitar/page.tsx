import { LandingPage } from "@/components/marketing/landing-page";

export const metadata = {
  title: "Ear Training App for Guitar",
  description:
    "Daily ear training drills for guitarists. Practice intervals, chord quality, and progression recognition in short sessions.",
};

export default function EarTrainingForGuitarPage() {
  return (
    <LandingPage
      eyebrow="Ear training app for guitar"
      title="Fast ear drills for guitarists who want better ears, not more menu screens."
      description="Train interval color, hear common pop changes faster, and build a daily habit that fits between songs, practice, or recording sessions."
      bullets={[
        "Short daily interval drills tuned for self-taught guitar players.",
        "Chord and progression recognition unlocks when you move into Pro.",
        "Replayable piano prompts help you connect ear color to fretboard intuition.",
      ]}
    />
  );
}
