import { useState } from 'react';
import ToolSection from '@/components/ui/ToolSection';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import CopyButton from '@/components/ui/CopyButton';
import { Lock, Unlock } from 'lucide-react';

export default function Base64() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const encode = () => {
    try {
      const encoded = btoa(input);
      setOutput(encoded);
      setMode('encode');
    } catch (error) {
      setOutput('Error: Invalid input for encoding');
    }
  };

  const decode = () => {
    try {
      const decoded = atob(input);
      setOutput(decoded);
      setMode('decode');
    } catch (error) {
      setOutput('Error: Invalid Base64 string');
    }
  };

  return (
    <ToolSection 
      title="Base64 Encoder/Decoder"
      description="Encode and decode Base64 strings"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Input</label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to encode or Base64 string to decode..."
            className="min-h-[150px] resize-none font-mono text-sm"
            data-testid="input-text"
          />
        </div>

        <div className="flex gap-3">
          <Button 
            onClick={encode}
            variant="default"
            className="gap-2"
            data-testid="button-encode"
          >
            <Lock className="w-4 h-4" />
            Encode to Base64
          </Button>
          <Button 
            onClick={decode}
            variant="secondary"
            className="gap-2"
            data-testid="button-decode"
          >
            <Unlock className="w-4 h-4" />
            Decode from Base64
          </Button>
        </div>

        {output && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">
                Output ({mode === 'encode' ? 'Encoded' : 'Decoded'})
              </label>
              {!output.startsWith('Error:') && <CopyButton text={output} />}
            </div>
            <Textarea
              value={output}
              readOnly
              className={`min-h-[150px] resize-none font-mono text-sm ${
                output.startsWith('Error:') ? 'bg-destructive/10 text-destructive' : 'bg-muted'
              }`}
              data-testid="output-text"
            />
          </div>
        )}
      </div>
    </ToolSection>
  );
}
