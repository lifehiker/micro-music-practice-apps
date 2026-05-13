import { LandingPage } from "@/components/marketing/landing-page";

export const metadata = {
  title: "Ear Training Drills for Singers",
  description:
    "Daily interval and chord ear training drills for singers who want confident pitch recognition in just a few minutes.",
};

export default function ForSingersPage() {
  return (
    <LandingPage
      eyebrow="For singers"
      title="A daily ear routine for singers who want pitch confidence without theory overload."
      description="Use short piano prompts, replay audio, and train interval color before the session turns into homework."
      bullets={[
        "Perfect for singers building relative pitch in short sessions.",
        "Immediate feedback helps connect hearing to vocal recall.",
        "Progression drills support harmony awareness for ensembles and songwriting.",
      ]}
    />
  );
}
