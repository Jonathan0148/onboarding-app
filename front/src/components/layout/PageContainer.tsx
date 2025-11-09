import { ReactNode } from 'react';

interface PageContainerProps {
  title?: string | ReactNode;
  action?: ReactNode;
  children: ReactNode;
}

export default function PageContainer({ title, action, children }: PageContainerProps) {
  return (
    <div className="p-6 space-y-6">
      {(title || action) && (
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold flex items-center gap-2">{title}</h1>
          {action && <div>{action}</div>}
        </div>
      )}

      <div className="bg-white shadow rounded-xl p-6">{children}</div>
    </div>
  );
}
