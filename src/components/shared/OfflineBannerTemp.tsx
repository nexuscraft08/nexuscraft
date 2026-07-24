import { AlertCircle, Wifi } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface OfflineBannerProps {
  className?: string;
}

export function OfflineBanner({ className }: OfflineBannerProps) {
  return (
    <Alert variant="destructive" className={className}>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex items-center gap-2">
        <Wifi className="h-4 w-4 line-through" />
        You're currently offline. Some features may not work.
      </AlertDescription>
    </Alert>
  );
}
