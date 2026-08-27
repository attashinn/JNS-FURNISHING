import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import hero from "@/assets/hero.jpg";
import driftwood from "@/assets/driftwood.jpg";
import forYourself from "@/assets/for-yourself.jpg";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — Khidmah" },
      { name: "description", content: "Notes on fragrance, craft, and ritual from the Khidmah studio." },
      { property: "og:title", content: "Journal — Khidmah" },
      { property: "og:description", content: "Notes on fragrance, craft, and ritual from the Khidmah studio." },
    ],
  }),
  component: Journal,
});

const posts = [
  { title: "The Art of Layering Scents", excerpt: "How to build a signature by pairing complementary notes.", img: hero },
  { title: "Inside the Oak Cellar", excerpt: "Six months of stillness before a fragrance is ready.", img: driftwood },
  { title: "Notes from Marrakech", excerpt: "Sourcing rose absolute from the Ourika Valley.", img: forYourself },
];

function Journal() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Journal</p>
        <h1 className="mt-3 font-display text-5xl md:text-6xl">Notes & Rituals</h1>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {posts.map((p) => (
            <article key={p.title} className="group cursor-pointer">
              <div className="overflow-hidden rounded-2xl">
                <img src={p.img} alt={p.title} className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              </div>
              <h2 className="mt-5 font-display text-2xl leading-snug">{p.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}