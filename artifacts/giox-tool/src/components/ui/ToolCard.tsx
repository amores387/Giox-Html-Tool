import { Link } from 'wouter';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  accent?: string;
}

export default function ToolCard({ title, description, icon: Icon, href, accent = 'primary' }: ToolCardProps) {
  return (
    <Link href={href} data-testid={`tool-card-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className={cn(
        "group relative overflow-hidden",
        "p-6 rounded-xl border border-card-border bg-card",
        "tool-card-hover cursor-pointer"
      )}>
        <div className="relative z-10">
          <div className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
            "bg-primary/10 text-primary",
            "group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200"
          )}>
            <Icon className="w-6 h-6" />
          </div>
          
          <h3 className="text-lg font-semibold mb-2 text-card-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
        
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>
    </Link>
  );
}
