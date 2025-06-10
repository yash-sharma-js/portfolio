
import { useTerminalMode } from '@/hooks/useTerminalMode';
import { Switch } from '@/components/ui/switch';
import { Code, Terminal } from 'lucide-react';

const TerminalToggle = () => {
  const { isTerminalMode, toggleTerminalMode } = useTerminalMode();

  return (
    <div className="fixed bottom-4 right-4 bg-dark-300/80 backdrop-blur p-3 rounded-full z-50 flex items-center gap-2 border border-neon-blue/30">
      <span className="hidden md:inline text-sm text-gray-400">Terminal Mode</span>
      <Switch
        checked={isTerminalMode}
        onCheckedChange={toggleTerminalMode}
        className="data-[state=checked]:bg-neon-green"
      />
      {isTerminalMode ? (
        <Terminal className="w-4 h-4 text-neon-green" />
      ) : (
        <Code className="w-4 h-4 text-neon-blue" />
      )}
    </div>
  );
};

export default TerminalToggle;
