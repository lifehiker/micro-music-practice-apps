import { notFound } from "next/navigation";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { blogPosts, getBlogPost } from "@/lib/blog";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <div className="pb-16">
      <MarketingHeader />
      <main className="shell">
        <article className="glass mx-auto max-w-3xl rounded-[36px] p-8 md:p-10">
          <div className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Blog</div>
          <h1 className="mt-3 text-5xl font-semibold leading-[1.04] text-balance">{post.title}</h1>
          <p className="mt-4 text-base leading-8 text-[var(--ink-soft)]">{post.description}</p>
          <div className="mt-8 space-y-5 text-base leading-8 text-[var(--ink-soft)]">
            {post.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </main>
    </div>
  );
}
