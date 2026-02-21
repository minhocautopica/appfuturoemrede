/**
 * Hook de tradução simples.
 * Por agora só suporta PT-PT, mas a estrutura permite adicionar idiomas facilmente.
 */
import { ptPT } from './pt-PT';

export function useTranslation() {
  return { t: ptPT };
}
