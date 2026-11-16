import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

/** Bloque flotante oscuro que regresa al mapa de artistas. */
export function BackToIndex({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      viewTransition
      className={cn(
        "group inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3.5 py-2 text-sm text-foreground shadow-float transition-colors hover:bg-surface-active",
        className,
      )}
    >
      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
      Volver al índice
    </Link>
  );
}
