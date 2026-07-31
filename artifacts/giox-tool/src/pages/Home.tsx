import ToolCard from '@/components/ui/ToolCard';
import { 
  Type, 
  Hash, 
  Code, 
  Palette, 
  Key,
  AlignLeft,
  ToggleLeft,
  RotateCcw,
  Copy,
  Ruler,
  Percent,
  Dices,
  Lock,
  Unlock,
  Link as LinkIcon,
  Droplet
} from 'lucide-react';

const tools = [
  {
    category: 'Text Tools',
    items: [
      {
        title: 'Word Counter',
        description: 'Count words, characters, and lines in your text',
        icon: AlignLeft,
        href: '/text/word-counter',
      },
      {
        title: 'Case Converter',
        description: 'Convert text between different cases',
        icon: ToggleLeft,
        href: '/text/case-converter',
      },
      {
        title: 'Text Reverser',
        description: 'Reverse your text instantly',
        icon: RotateCcw,
        href: '/text/reverser',
      },
      {
        title: 'Duplicate Remover',
        description: 'Remove duplicate lines from text',
        icon: Copy,
        href: '/text/duplicate-remover',
      },
    ],
  },
  {
    category: 'Number Tools',
    items: [
      {
        title: 'Unit Converter',
        description: 'Convert between length, weight, and temperature',
        icon: Ruler,
        href: '/number/unit-converter',
      },
      {
        title: 'Percentage Calculator',
        description: 'Calculate percentages quickly',
        icon: Percent,
        href: '/number/percentage',
      },
      {
        title: 'Random Number',
        description: 'Generate random numbers in any range',
        icon: Dices,
        href: '/number/random',
      },
    ],
  },
  {
    category: 'Encode/Decode',
    items: [
      {
        title: 'Base64',
        description: 'Encode and decode Base64 strings',
        icon: Lock,
        href: '/encode/base64',
      },
      {
        title: 'URL Encoder',
        description: 'Encode and decode URLs',
        icon: LinkIcon,
        href: '/encode/url',
      },
    ],
  },
  {
    category: 'Color Tools',
    items: [
      {
        title: 'Color Converter',
        description: 'Convert between HEX and RGB formats',
        icon: Palette,
        href: '/color/converter',
      },
      {
        title: 'Color Picker',
        description: 'Pick and preview colors',
        icon: Droplet,
        href: '/color/picker',
      },
    ],
  },
  {
    category: 'Security',
    items: [
      {
        title: 'Password Generator',
        description: 'Generate secure random passwords',
        icon: Key,
        href: '/password',
      },
    ],
  },
];

export default function Home() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Toolbox
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          A collection of sharp, no-nonsense utilities for everyday tasks. Pick your tool and get to work.
        </p>
      </div>

      {tools.map((category) => (
        <div key={category.category} className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground/80 flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded-full" />
            {category.category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-fade-in">
            {category.items.map((tool) => (
              <ToolCard
                key={tool.title}
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                href={tool.href}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
