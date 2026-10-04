import { NoiseOverlay } from "@/components/ui/noise-overlay";

export function Backdrop() {
  return (
    <div aria-hidden className="backdrop">
      <NoiseOverlay />
    </div>
  );
}
