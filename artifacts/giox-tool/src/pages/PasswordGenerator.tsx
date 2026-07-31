import { useState } from 'react';
import ToolSection from '@/components/ui/ToolSection';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import CopyButton from '@/components/ui/CopyButton';
import { RefreshCw } from 'lucide-react';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const generatePassword = () => {
    let chars = '';
    if (options.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (options.numbers) chars += '0123456789';
    if (options.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (chars.length === 0) {
      setPassword('Please select at least one option');
      return;
    }

    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
  };

  const toggleOption = (key: keyof typeof options) => {
    setOptions({ ...options, [key]: !options[key] });
  };

  return (
    <ToolSection 
      title="Password Generator"
      description="Generate secure random passwords with custom options"
    >
      <div className="max-w-2xl space-y-6">
        <Card className="p-6">
          <div className="space-y-6">
            {password && (
              <div>
                <label className="text-sm font-medium mb-2 block">Generated Password</label>
                <div className="flex items-center gap-3">
                  <Input
                    value={password}
                    readOnly
                    className="font-mono text-lg bg-muted"
                    data-testid="output-password"
                  />
                  <CopyButton text={password} />
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium">Length: {length}</label>
                <span className="text-sm text-muted-foreground">{length} characters</span>
              </div>
              <Slider
                value={[length]}
                onValueChange={(val) => setLength(val[0])}
                min={4}
                max={64}
                step={1}
                className="w-full"
                data-testid="slider-length"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Character Types</h3>
              
              <div className="space-y-3">
                {[
                  { key: 'uppercase' as const, label: 'Uppercase (A-Z)', testId: 'switch-uppercase' },
                  { key: 'lowercase' as const, label: 'Lowercase (a-z)', testId: 'switch-lowercase' },
                  { key: 'numbers' as const, label: 'Numbers (0-9)', testId: 'switch-numbers' },
                  { key: 'symbols' as const, label: 'Symbols (!@#$%...)', testId: 'switch-symbols' },
                ].map((option) => (
                  <div key={option.key} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <Label htmlFor={option.key} className="cursor-pointer flex-1">
                      {option.label}
                    </Label>
                    <Switch
                      id={option.key}
                      checked={options[option.key]}
                      onCheckedChange={() => toggleOption(option.key)}
                      data-testid={option.testId}
                    />
                  </div>
                ))}
              </div>
            </div>

            <Button 
              onClick={generatePassword}
              className="w-full gap-2"
              size="lg"
              data-testid="button-generate"
            >
              <RefreshCw className="w-5 h-5" />
              Generate Password
            </Button>
          </div>
        </Card>
      </div>
    </ToolSection>
  );
}
