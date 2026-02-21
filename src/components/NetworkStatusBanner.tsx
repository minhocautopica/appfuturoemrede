/**
 * Banner de estado de rede — sempre visível no topo da aplicação.
 * Mostra o modo actual (online/mesh/offline) com cor e ícone distintos.
 * Clicar alterna entre modos para demonstração no protótipo.
 */
import { Wifi, Radio, WifiOff } from 'lucide-react';
import type { NetworkMode } from '@/hooks/useNetworkStatus';
import { useTranslation } from '@/i18n/useTranslation';

interface Props {
  mode: NetworkMode;
  onCycle: () => void;
}

const config: Record<NetworkMode, { icon: typeof Wifi; colorClass: string; key: keyof typeof import('@/i18n/pt-PT').ptPT.network }> = {
  online: { icon: Wifi, colorClass: 'bg-status-online', key: 'online' },
  mesh: { icon: Radio, colorClass: 'bg-status-mesh', key: 'mesh' },
  offline: { icon: WifiOff, colorClass: 'bg-status-offline', key: 'offline' },
};

export default function NetworkStatusBanner({ mode, onCycle }: Props) {
  const { t } = useTranslation();
  const { icon: Icon, colorClass, key } = config[mode];

  return (
    <button
      onClick={onCycle}
      className={`flex w-full items-center justify-center gap-2 px-4 py-1.5 text-sm font-medium text-primary-foreground transition-colors ${colorClass}`}
      aria-label={`Estado de rede: ${t.network[key]}. Clica para alternar modo.`}
      role="status"
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span>{t.network[key]}</span>
      <span className="ml-2 text-xs opacity-75">(clica para alternar)</span>
    </button>
  );
}
