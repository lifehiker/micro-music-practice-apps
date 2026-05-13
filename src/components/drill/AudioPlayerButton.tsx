"use client";

import { useState } from "react";
import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { playAudio } from "@/lib/audio";

export function AudioPlayerButton({ url }: { url: string }) {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={() => {
        setLoading(true);
        const sound = playAudio(url);
        sound.once("play", () => setLoading(false));
        sound.once("loaderror", () => setLoading(false));
      }}
      className="gap-2"
    >
      <Volume2 size={16} />
      {loading ? "Loading..." : "Replay audio"}
    </Button>
  );
}
