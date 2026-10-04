export function SkipLink({ targetId = "main" }: { targetId?: string }) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:fixed focus:top-[max(1rem,env(safe-area-inset-top))] focus:left-[max(1rem,env(safe-area-inset-left))] focus:z-50 focus:rounded-sm focus:bg-accent focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-on-accent"
    >
      Skip to content
    </a>
  );
}
