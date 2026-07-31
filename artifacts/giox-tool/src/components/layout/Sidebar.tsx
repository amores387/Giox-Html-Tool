import { Link, useLocation } from 'wouter';
import { 
  Home, 
  Type, 
  Hash, 
  Code, 
  Palette, 
  Key,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { title: 'Home', href: '/', icon: Home },
  { title: 'Text Tools', href: '/text', icon: Type },
  { title: 'Number Tools', href: '/number', icon: Hash },
  { title: 'Encode/Decode', href: '/encode', icon: Code },
  { title: 'Color Tools', href: '/color', icon: Palette },
  { title: 'Password Generator', href: '/password', icon: Key },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-64 border-r border-sidebar-border bg-sidebar flex flex-col min-h-[100dvh]">
      <div className="p-6 border-b border-sidebar-border">
        <Link 
          href="/"
          className="flex items-center gap-2 group"
          data-testid="link-home"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-primary-foreground rounded-sm" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-sidebar-foreground">
            Giox Tool
          </h1>
        </Link>
      </div>

      <nav className="flex-1 p-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location === item.href;
            const Icon = item.icon;
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all relative group",
                    "hover-elevate",
                    isActive 
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                      : "text-sidebar-foreground/70 hover:text-sidebar-foreground"
                  )}
                  data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <Icon className={cn(
                    "w-5 h-5 transition-colors",
                    isActive && "text-primary"
                  )} />
                  <span className="flex-1">{item.title}</span>
                  {isActive && (
                    <ChevronRight className="w-4 h-4 text-primary" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <p className="text-xs text-sidebar-foreground/50 text-center">
          Built with precision
        </p>
      </div>
    </aside>
  );
}
