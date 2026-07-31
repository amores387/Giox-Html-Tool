import { useState } from 'react';
import ToolSection from '@/components/ui/ToolSection';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import CopyButton from '@/components/ui/CopyButton';
import { Trash2 } from 'lucide-react';

export default function DuplicateRemover() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [removedCount, setRemovedCount] = useState(0);

  const removeDuplicates = () => {
    const lines = input.split('\n');
    const originalCount = lines.length;
    const uniqueLines = [...new Set(lines)];
    const removed = originalCount - uniqueLines.length;
    
    setOutput(uniqueLines.join('\n'));
    setRemovedCount(removed);
  };

  return (
    <ToolSection 
      title="Duplicate Line Remover"
      description="Remove duplicate lines from your text"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Input Text (one item per line)</label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text with one item per line..."
            className="min-h-[200px] resize-none font-mono text-sm"
            data-testid="input-text"
          />
        </div>

        <Button 
          onClick={removeDuplicates}
          variant="default"
          className="gap-2"
          data-testid="button-remove-duplicates"
        >
          <Trash2 className="w-4 h-4" />
          Remove Duplicates
        </Button>

        {output && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">
                Unique Lines {removedCount > 0 && (
                  <span className="text-primary font-normal">
                    ({removedCount} duplicate{removedCount !== 1 ? 's' : ''} removed)
                  </span>
                )}
              </label>
              <CopyButton text={output} />
            </div>
            <Textarea
              value={output}
              readOnly
              className="min-h-[200px] resize-none bg-muted font-mono text-sm"
              data-testid="output-text"
            />
          </div>
        )}
      </div>
    </ToolSection>
  );
}
