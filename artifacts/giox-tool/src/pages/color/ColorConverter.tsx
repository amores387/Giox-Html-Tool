import { useState } from 'react';
import ToolSection from '@/components/ui/ToolSection';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import CopyButton from '@/components/ui/CopyButton';
import { ArrowRight } from 'lucide-react';

export default function ColorConverter() {
  const [hex, setHex] = useState('#00BCD4');
  const [rgb, setRgb] = useState({ r: 0, g: 188, b: 212 });

  const hexToRgb = (hexValue: string) => {
    const cleanHex = hexValue.replace('#', '');
    if (!/^[0-9A-F]{6}$/i.test(cleanHex)) return null;

    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);

    return { r, g, b };
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    const toHex = (n: number) => {
      const hex = Math.max(0, Math.min(255, n)).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  };

  const handleHexChange = (value: string) => {
    setHex(value);
    const result = hexToRgb(value);
    if (result) setRgb(result);
  };

  const handleRgbChange = (channel: 'r' | 'g' | 'b', value: string) => {
    const num = parseInt(value) || 0;
    const newRgb = { ...rgb, [channel]: num };
    setRgb(newRgb);
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  return (
    <ToolSection 
      title="Color Converter"
      description="Convert between HEX and RGB color formats"
    >
      <div className="max-w-4xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              HEX Color
            </h3>
            <div className="space-y-4">
              <Input
                value={hex}
                onChange={(e) => handleHexChange(e.target.value)}
                placeholder="#00BCD4"
                className="font-mono text-lg"
                data-testid="input-hex"
              />
              <div className="flex items-center justify-between">
                <div 
                  className="w-full h-20 rounded-lg border-2 border-border"
                  style={{ backgroundColor: hex }}
                  data-testid="color-preview-hex"
                />
                <CopyButton text={hex} className="ml-3" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              RGB Color
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Red</label>
                  <Input
                    type="number"
                    min="0"
                    max="255"
                    value={rgb.r}
                    onChange={(e) => handleRgbChange('r', e.target.value)}
                    data-testid="input-rgb-r"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Green</label>
                  <Input
                    type="number"
                    min="0"
                    max="255"
                    value={rgb.g}
                    onChange={(e) => handleRgbChange('g', e.target.value)}
                    data-testid="input-rgb-g"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Blue</label>
                  <Input
                    type="number"
                    min="0"
                    max="255"
                    value={rgb.b}
                    onChange={(e) => handleRgbChange('b', e.target.value)}
                    data-testid="input-rgb-b"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div 
                  className="w-full h-20 rounded-lg border-2 border-border"
                  style={{ backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` }}
                  data-testid="color-preview-rgb"
                />
                <CopyButton text={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} className="ml-3" />
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 bg-muted/50">
          <div className="flex items-center gap-4">
            <div className="flex-1 font-mono text-sm">
              {hex}
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
            <div className="flex-1 font-mono text-sm">
              rgb({rgb.r}, {rgb.g}, {rgb.b})
            </div>
          </div>
        </Card>
      </div>
    </ToolSection>
  );
}
