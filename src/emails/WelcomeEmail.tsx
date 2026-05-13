export function WelcomeEmail(name?: string | null) {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1a1d23">
      <h1>Welcome to EarKit${name ? `, ${name}` : ""}</h1>
      <p>Your daily drill is ready. Open the app, finish one short session, and keep the streak alive.</p>
    </div>
  `;
}
