import { useState } from 'react';
import ToolSection from '@/components/ui/ToolSection';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function PercentageCalculator() {
  const [percentOf, setPercentOf] = useState({ percent: '', value: '' });
  const [whatPercent, setWhatPercent] = useState({ part: '', whole: '' });
  const [percentChange, setPercentChange] = useState({ from: '', to: '' });

  const calculatePercentOf = () => {
    const p = parseFloat(percentOf.percent);
    const v = parseFloat(percentOf.value);
    if (isNaN(p) || isNaN(v)) return '';
    return ((p / 100) * v).toFixed(2);
  };

  const calculateWhatPercent = () => {
    const part = parseFloat(whatPercent.part);
    const whole = parseFloat(whatPercent.whole);
    if (isNaN(part) || isNaN(whole) || whole === 0) return '';
    return ((part / whole) * 100).toFixed(2);
  };

  const calculatePercentChange = () => {
    const from = parseFloat(percentChange.from);
    const to = parseFloat(percentChange.to);
    if (isNaN(from) || isNaN(to) || from === 0) return '';
    return (((to - from) / from) * 100).toFixed(2);
  };

  return (
    <ToolSection 
      title="Percentage Calculator"
      description="Calculate percentages in different ways"
    >
      <Tabs defaultValue="percent-of">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="percent-of" data-testid="tab-percent-of">% of Value</TabsTrigger>
          <TabsTrigger value="what-percent" data-testid="tab-what-percent">What %</TabsTrigger>
          <TabsTrigger value="percent-change" data-testid="tab-percent-change">% Change</TabsTrigger>
        </TabsList>

        <TabsContent value="percent-of" className="mt-6">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="text-sm font-medium mb-2 block">Percent</label>
                  <Input
                    type="number"
                    value={percentOf.percent}
                    onChange={(e) => setPercentOf({ ...percentOf, percent: e.target.value })}
                    placeholder="25"
                    data-testid="input-percent"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Of Value</label>
                  <Input
                    type="number"
                    value={percentOf.value}
                    onChange={(e) => setPercentOf({ ...percentOf, value: e.target.value })}
                    placeholder="200"
                    data-testid="input-value"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Result</label>
                  <div className="text-xl font-bold text-primary p-3 rounded-lg bg-muted" data-testid="output-result">
                    {calculatePercentOf() || '—'}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="what-percent" className="mt-6">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="text-sm font-medium mb-2 block">Part</label>
                  <Input
                    type="number"
                    value={whatPercent.part}
                    onChange={(e) => setWhatPercent({ ...whatPercent, part: e.target.value })}
                    placeholder="50"
                    data-testid="input-part"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Of Whole</label>
                  <Input
                    type="number"
                    value={whatPercent.whole}
                    onChange={(e) => setWhatPercent({ ...whatPercent, whole: e.target.value })}
                    placeholder="200"
                    data-testid="input-whole"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Percentage</label>
                  <div className="text-xl font-bold text-primary p-3 rounded-lg bg-muted" data-testid="output-percentage">
                    {calculateWhatPercent() ? `${calculateWhatPercent()}%` : '—'}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="percent-change" className="mt-6">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="text-sm font-medium mb-2 block">From</label>
                  <Input
                    type="number"
                    value={percentChange.from}
                    onChange={(e) => setPercentChange({ ...percentChange, from: e.target.value })}
                    placeholder="100"
                    data-testid="input-from"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">To</label>
                  <Input
                    type="number"
                    value={percentChange.to}
                    onChange={(e) => setPercentChange({ ...percentChange, to: e.target.value })}
                    placeholder="150"
                    data-testid="input-to"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Change</label>
                  <div className="text-xl font-bold text-primary p-3 rounded-lg bg-muted" data-testid="output-change">
                    {calculatePercentChange() ? `${calculatePercentChange()}%` : '—'}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </ToolSection>
  );
}
