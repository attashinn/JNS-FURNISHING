import logoAsset from "@/assets/sanvogue-logo.png.asset.json";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 bg-background">
      <div className="relative flex flex-col items-center">
        <img
          src={logoAsset.url}
          alt="Sanvogue"
          className="h-10 w-auto animate-pulse object-contain"
        />
        <div className="mt-8 h-[2px] w-40 overflow-hidden rounded-full bg-muted">
          <div className="loading-bar h-full w-1/3 rounded-full bg-primary" />
        </div>
        <p className="mt-4 text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
          Curating your vogue
        </p>
      </div>

      <style>{`
        @keyframes sanvogue-slide {
          0%   { transform: translateX(-120%); }
          100% { transform: translateX(420%); }
        }
        .loading-bar { animation: sanvogue-slide 1.1s ease-in-out infinite; }
      `}</style>
    </div>
  );
}