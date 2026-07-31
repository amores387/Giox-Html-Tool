import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import MainLayout from '@/components/layout/MainLayout';
import NotFound from '@/pages/not-found';
import Home from '@/pages/Home';
import WordCounter from '@/pages/text/WordCounter';
import CaseConverter from '@/pages/text/CaseConverter';
import TextReverser from '@/pages/text/TextReverser';
import DuplicateRemover from '@/pages/text/DuplicateRemover';
import UnitConverter from '@/pages/number/UnitConverter';
import PercentageCalculator from '@/pages/number/PercentageCalculator';
import RandomNumber from '@/pages/number/RandomNumber';
import Base64 from '@/pages/encode/Base64';
import UrlEncoder from '@/pages/encode/UrlEncoder';
import ColorConverter from '@/pages/color/ColorConverter';
import ColorPicker from '@/pages/color/ColorPicker';
import PasswordGenerator from '@/pages/PasswordGenerator';

const queryClient = new QueryClient();

function Router() {
  return (
    <MainLayout>
      <Switch>
        <Route path="/" component={Home} />
        
        <Route path="/text/word-counter" component={WordCounter} />
        <Route path="/text/case-converter" component={CaseConverter} />
        <Route path="/text/reverser" component={TextReverser} />
        <Route path="/text/duplicate-remover" component={DuplicateRemover} />
        
        <Route path="/number/unit-converter" component={UnitConverter} />
        <Route path="/number/percentage" component={PercentageCalculator} />
        <Route path="/number/random" component={RandomNumber} />
        
        <Route path="/encode/base64" component={Base64} />
        <Route path="/encode/url" component={UrlEncoder} />
        
        <Route path="/color/converter" component={ColorConverter} />
        <Route path="/color/picker" component={ColorPicker} />
        
        <Route path="/password" component={PasswordGenerator} />
        
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
