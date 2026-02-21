/**
 * Componente reutilizável para etiquetas de tema.
 * Cada tema tem uma cor distinta para identificação visual rápida.
 */

const themeColors: Record<string, string> = {
  ecological_futures: 'bg-theme-ecological/20 text-foreground',
  memory: 'bg-theme-memory/20 text-foreground',
  proximity_economy: 'bg-theme-economy/20 text-foreground',
  childhood_futures: 'bg-theme-childhood/20 text-foreground',
  governance: 'bg-theme-governance/20 text-foreground',
  data_art: 'bg-theme-data-art/20 text-foreground',
  other: 'bg-theme-other/20 text-foreground',
};

interface Props {
  theme: string;
  label: string;
  size?: 'sm' | 'md';
}

export default function ThemeBadge({ theme, label, size = 'sm' }: Props) {
  const colorClass = themeColors[theme] ?? themeColors.other;
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${colorClass} ${sizeClass}`}>
      {label}
    </span>
  );
}
