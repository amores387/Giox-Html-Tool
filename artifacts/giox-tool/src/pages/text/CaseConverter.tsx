import { useState } from 'react';
import ToolSection from '@/components/ui/ToolSection';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import CopyButton from '@/components/ui/CopyButton';

export default function CaseConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const convertCase = (type: 'upper' | 'lower' | 'title' | 'sentence') => {
    let result = '';
    
    switch (type) {
      case 'upper':
        result = input.toUpperCase();
        break;
      case 'lower':
        result = input.toLowerCase();
        break;
      case 'title':
        result = input.toLowerCase().split(' ').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        break;
      case 'sentence':
        result = input.toLowerCase().replace(/(^\w|\.\s+\w)/g, letter => letter.toUpperCase());
        break;
    }
    
    setOutput(result);
  };

  return (
    <ToolSection 
      title="Case Converter"
      description="Transform text between different letter cases"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Input Text</label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your text here..."
            className="min-h-[150px] resize-none"
            data-testid="input-text"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={() => convertCase('upper')}
            variant="default"
            data-testid="button-uppercase"
          >
            UPPERCASE
          </Button>
          <Button 
            onClick={() => convertCase('lower')}
            variant="default"
            data-testid="button-lowercase"
          >
            lowercase
          </Button>
          <Button 
            onClick={() => convertCase('title')}
            variant="default"
            data-testid="button-titlecase"
          >
            Title Case
          </Button>
          <Button 
            onClick={() => convertCase('sentence')}
            variant="default"
            data-testid="button-sentencecase"
          >
            Sentence case
          </Button>
        </div>

        {output && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">Output</label>
              <CopyButton text={output} />
            </div>
            <Textarea
              value={output}
              readOnly
              className="min-h-[150px] resize-none bg-muted"
              data-testid="output-text"
            />
          </div>
        )}
      </div>
    </ToolSection>
  );
}
