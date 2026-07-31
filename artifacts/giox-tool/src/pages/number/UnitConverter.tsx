import { useState } from 'react';
import ToolSection from '@/components/ui/ToolSection';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

const conversions = {
  length: {
    meters: { label: 'Meters', toBase: 1 },
    kilometers: { label: 'Kilometers', toBase: 1000 },
    centimeters: { label: 'Centimeters', toBase: 0.01 },
    millimeters: { label: 'Millimeters', toBase: 0.001 },
    miles: { label: 'Miles', toBase: 1609.34 },
    yards: { label: 'Yards', toBase: 0.9144 },
    feet: { label: 'Feet', toBase: 0.3048 },
    inches: { label: 'Inches', toBase: 0.0254 },
  },
  weight: {
    kilograms: { label: 'Kilograms', toBase: 1 },
    grams: { label: 'Grams', toBase: 0.001 },
    milligrams: { label: 'Milligrams', toBase: 0.000001 },
    pounds: { label: 'Pounds', toBase: 0.453592 },
    ounces: { label: 'Ounces', toBase: 0.0283495 },
    tons: { label: 'Metric Tons', toBase: 1000 },
  },
  temperature: {
    celsius: { label: 'Celsius' },
    fahrenheit: { label: 'Fahrenheit' },
    kelvin: { label: 'Kelvin' },
  },
};

export default function UnitConverter() {
  const [category, setCategory] = useState<'length' | 'weight' | 'temperature'>('length');
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('kilometers');

  const convert = () => {
    const num = parseFloat(value);
    if (isNaN(num)) return '';

    if (category === 'temperature') {
      return convertTemperature(num, fromUnit, toUnit).toFixed(2);
    }

    const units = conversions[category] as Record<string, { toBase: number }>;
    const baseValue = num * units[fromUnit].toBase;
    const result = baseValue / units[toUnit].toBase;
    return result.toFixed(6).replace(/\.?0+$/, '');
  };

  const convertTemperature = (val: number, from: string, to: string) => {
    let celsius = val;
    
    if (from === 'fahrenheit') celsius = (val - 32) * 5/9;
    if (from === 'kelvin') celsius = val - 273.15;
    
    if (to === 'celsius') return celsius;
    if (to === 'fahrenheit') return celsius * 9/5 + 32;
    if (to === 'kelvin') return celsius + 273.15;
    
    return celsius;
  };

  const result = convert();

  return (
    <ToolSection 
      title="Unit Converter"
      description="Convert between different units of measurement"
    >
      <Tabs value={category} onValueChange={(v) => setCategory(v as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="length" data-testid="tab-length">Length</TabsTrigger>
          <TabsTrigger value="weight" data-testid="tab-weight">Weight</TabsTrigger>
          <TabsTrigger value="temperature" data-testid="tab-temperature">Temperature</TabsTrigger>
        </TabsList>

        <TabsContent value={category} className="space-y-6 mt-6">
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-medium">From</label>
                <Input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter value"
                  className="text-lg"
                  data-testid="input-value"
                />
                <Select value={fromUnit} onValueChange={setFromUnit}>
                  <SelectTrigger data-testid="select-from-unit">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(conversions[category]).map(([key, { label }]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">To</label>
                <div className="text-lg font-bold text-primary p-3 rounded-lg bg-muted min-h-[42px] flex items-center" data-testid="output-result">
                  {result || '—'}
                </div>
                <Select value={toUnit} onValueChange={setToUnit}>
                  <SelectTrigger data-testid="select-to-unit">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(conversions[category]).map(([key, { label }]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </ToolSection>
  );
}
