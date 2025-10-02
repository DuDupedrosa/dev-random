import { Loader2Icon } from 'lucide-react';

export default function PageLoading() {
  return (
    <div className="grid place-items-center mt-20 gap-4">
      <Loader2Icon className="animate-spin text-primary w-16 h-16" />
      <p className="text-sm text-muted-foreground">Preparando seus dados...</p>
    </div>
  );
}
