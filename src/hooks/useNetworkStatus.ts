/**
 * Hook para simular o estado de rede do Futuro em Rede.
 * No protótipo, permite alternar entre os 3 modos manualmente.
 * No produto final, detectaria automaticamente a conectividade.
 * 
 * Modos:
 *  - online: servidor acessível via internet
 *  - mesh: rede mesh local disponível, sem internet
 *  - offline: sem qualquer ligação
 */
import { useState, useCallback } from 'react';

export type NetworkMode = 'online' | 'mesh' | 'offline';

export function useNetworkStatus() {
  const [mode, setMode] = useState<NetworkMode>('online');

  /** Alterna para o modo seguinte (para demonstração) */
  const cycleMode = useCallback(() => {
    setMode(prev => {
      if (prev === 'online') return 'mesh';
      if (prev === 'mesh') return 'offline';
      return 'online';
    });
  }, []);

  return { mode, setMode, cycleMode };
}
