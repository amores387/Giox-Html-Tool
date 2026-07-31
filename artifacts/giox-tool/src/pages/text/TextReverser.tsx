import { useState } from 'react';
import ToolSection from '@/components/ui/ToolSection';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import CopyButton from '@/components/ui/CopyButton';
import { RotateCcw } from 'lucide-react';

export default function TextReverser() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const reverseText = () => {
    setOutput(input.split('').reverse().join(''));
  };

  return (
    <ToolSection 
      title="Text Reverser"
      description="Reverse any text string instantly"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Input Text</label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to reverse..."
            className="min-h-[150px] resize-none"
            data-testid="input-text"
          />
        </div>

        <Button 
          onClick={reverseText}
          variant="default"
          className="gap-2"
          data-testid="button-reverse"
        >
          <RotateCcw className="w-4 h-4" />
          Reverse Text
        </Button>

        {output && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">Reversed Text</label>
              <CopyButton text={output} />
            </div>
            <Textarea
              value={output}
              readOnly
              className="min-h-[150px] resize-none bg-muted font-mono"
              data-testid="output-text"
            />
          </div>
        )}
      </div>
    </ToolSection>
  );
}
