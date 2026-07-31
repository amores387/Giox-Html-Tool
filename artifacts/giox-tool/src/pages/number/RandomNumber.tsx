import { useState } from 'react';
import ToolSection from '@/components/ui/ToolSection';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dices } from 'lucide-react';

export default function RandomNumber() {
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [result, setResult] = useState<number | null>(null);

  const generate = () => {
    const minNum = parseInt(min);
    const maxNum = parseInt(max);
    
    if (isNaN(minNum) || isNaN(maxNum)) return;
    if (minNum >= maxNum) return;
    
    const random = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    setResult(random);
  };

  return (
    <ToolSection 
      title="Random Number Generator"
      description="Generate random numbers within a specified range"
    >
      <Card className="p-6 max-w-2xl">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Minimum</label>
              <Input
                type="number"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                placeholder="1"
                data-testid="input-min"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Maximum</label>
              <Input
                type="number"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                placeholder="100"
                data-testid="input-max"
              />
            </div>
          </div>

          <Button 
            onClick={generate}
            className="w-full gap-2"
            size="lg"
            data-testid="button-generate"
          >
            <Dices className="w-5 h-5" />
            Generate Random Number
          </Button>

          {result !== null && (
            <div className="text-center p-8 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-2">Generated Number</div>
              <div className="text-6xl font-bold text-primary" data-testid="output-result">
                {result}
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolSection>
  );
}
