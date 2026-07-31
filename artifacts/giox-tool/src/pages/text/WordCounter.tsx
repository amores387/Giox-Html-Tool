import { useState, useMemo } from 'react';
import ToolSection from '@/components/ui/ToolSection';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

export default function WordCounter() {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text ? text.split('\n').length : 0;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0;
    const paragraphs = text.trim() ? text.split(/\n\n+/).filter(p => p.trim()).length : 0;

    return {
      characters,
      charactersNoSpaces,
      words,
      lines,
      sentences,
      paragraphs,
    };
  }, [text]);

  return (
    <ToolSection 
      title="Word & Character Counter"
      description="Paste or type your text to see live statistics"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your text here..."
            className="min-h-[400px] resize-none font-mono text-sm"
            data-testid="input-text"
          />
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
            Statistics
          </h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
            {[
              { label: 'Words', value: stats.words, testId: 'stat-words' },
              { label: 'Characters', value: stats.characters, testId: 'stat-characters' },
              { label: 'Characters (no spaces)', value: stats.charactersNoSpaces, testId: 'stat-characters-no-spaces' },
              { label: 'Lines', value: stats.lines, testId: 'stat-lines' },
              { label: 'Sentences', value: stats.sentences, testId: 'stat-sentences' },
              { label: 'Paragraphs', value: stats.paragraphs, testId: 'stat-paragraphs' },
            ].map((stat) => (
              <Card key={stat.label} className="p-4">
                <div className="text-2xl font-bold text-primary" data-testid={stat.testId}>
                  {stat.value.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </ToolSection>
  );
}
