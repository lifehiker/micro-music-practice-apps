import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { trackEvent } from "@/lib/analytics";
import { sendWelcomeEmail } from "@/lib/email";

const registerSchema = z.object({
  name: z.string().trim().min(2).max(60).optional(),
  email: z.email(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid signup details." }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "An account already exists for this email." }, { status: 409 });
  }

  const passwordHash = await hash(parsed.data.password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      name: parsed.data.name || email.split("@")[0],
      passwordHash,
      subscription: { create: { status: "FREE" } },
    },
  });

  await trackEvent("signup_completed", user.id);
  await sendWelcomeEmail(user.email, user.name);

  return NextResponse.json({ ok: true });
}
