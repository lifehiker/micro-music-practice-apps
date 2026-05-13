export function UpgradePromptEmail(name?: string | null) {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1a1d23">
      <h1>Ready for unlimited drills${name ? `, ${name}` : ""}?</h1>
      <p>Unlock chord quality, progressions, adaptive repetition, and your full practice history with EarKit Pro.</p>
    </div>
  `;
}
