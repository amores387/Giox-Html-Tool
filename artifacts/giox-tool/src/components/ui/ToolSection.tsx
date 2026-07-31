import { ReactNode } from 'react';

interface ToolSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function ToolSection({ title, description, children }: ToolSectionProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
        {description && (
          <p className="text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      
      {children}
    </div>
  );
}
