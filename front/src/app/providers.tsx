'use client';

import { LoadingProvider } from '@/context/LoadingContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return <LoadingProvider>{children}</LoadingProvider>;
}
