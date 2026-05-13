import { LandingPage } from "@/components/marketing/landing-page";

export const metadata = {
  title: "Music Practice App for Self-Taught Musicians",
  description:
    "A habit-friendly music practice app with short ear training drills for self-taught musicians.",
};

export default function MusicPracticeSelfTaughtPage() {
  return (
    <LandingPage
      eyebrow="Music practice app self taught"
      title="Short listening drills for self-taught musicians who want momentum, not coursework."
      description="EarKit strips ear training down to one daily action, a visible streak, and repeatable audio drills that actually fit real life."
      bullets={[
        "Built for hobbyists, singers, producers, pianists, and guitarists.",
        "Simple onboarding chooses the practice mix that matters most.",
        "Full stats and weak spots show where your ear still hesitates.",
      ]}
    />
  );
}
