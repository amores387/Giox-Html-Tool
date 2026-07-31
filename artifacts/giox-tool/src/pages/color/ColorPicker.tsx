import { useState } from 'react';
import ToolSection from '@/components/ui/ToolSection';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import CopyButton from '@/components/ui/CopyButton';

export default function ColorPicker() {
  const [color, setColor] = useState('#00BCD4');

  const hexToRgb = (hex: string) => {
    const cleanHex = hex.replace('#', '');
    if (!/^[0-9A-F]{6}$/i.test(cleanHex)) return null;

    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);

    return `rgb(${r}, ${g}, ${b})`;
  };

  const hexToHsl = (hex: string) => {
    const cleanHex = hex.replace('#', '');
    if (!/^[0-9A-F]{6}$/i.test(cleanHex)) return null;

    let r = parseInt(cleanHex.substring(0, 2), 16) / 255;
    let g = parseInt(cleanHex.substring(2, 4), 16) / 255;
    let b = parseInt(cleanHex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const rgb = hexToRgb(color);
  const hsl = hexToHsl(color);

  return (
    <ToolSection 
      title="Color Picker"
      description="Pick a color and see it in different formats"
    >
      <div className="max-w-2xl space-y-6">
        <Card className="p-8">
          <div className="space-y-6">
            <div className="text-center">
              <label className="text-sm font-medium mb-3 block">Pick a Color</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-40 rounded-lg cursor-pointer border-2 border-border"
                style={{ colorScheme: 'dark' }}
                data-testid="input-color-picker"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">HEX</div>
                  <div className="font-mono font-semibold" data-testid="color-hex">{color.toUpperCase()}</div>
                </div>
                <CopyButton text={color.toUpperCase()} />
              </div>

              {rgb && (
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">RGB</div>
                    <div className="font-mono font-semibold" data-testid="color-rgb">{rgb}</div>
                  </div>
                  <CopyButton text={rgb} />
                </div>
              )}

              {hsl && (
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">HSL</div>
                    <div className="font-mono font-semibold" data-testid="color-hsl">{hsl}</div>
                  </div>
                  <CopyButton text={hsl} />
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-border">
              <label className="text-sm font-medium mb-2 block">Or enter a HEX value</label>
              <Input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="#00BCD4"
                className="font-mono"
                data-testid="input-hex"
              />
            </div>
          </div>
        </Card>
      </div>
    </ToolSection>
  );
}
