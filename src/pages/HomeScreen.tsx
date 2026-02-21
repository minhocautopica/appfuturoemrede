/**
 * Ecrã inicial do Futuro em Rede.
 * Apresenta o projecto, estatísticas do arquivo e acesso rápido às secções.
 */
import { Link, useOutletContext } from 'react-router-dom';
import { Archive, PenLine, Users, MessageCircle, BookOpen, CalendarDays, Leaf } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import { mockContributions, mockWorkshops } from '@/data/mockData';
import type { NetworkMode } from '@/hooks/useNetworkStatus';

const quickLinks = [
  { path: '/archive', icon: Archive, labelKey: 'archive' as const, desc: 'Explorar vozes e memórias' },
  { path: '/contribute', icon: PenLine, labelKey: 'contribute' as const, desc: 'Adicionar a tua voz' },
  { path: '/workshops', icon: Users, labelKey: 'workshops' as const, desc: 'Participar em oficinas' },
  { path: '/messages', icon: MessageCircle, labelKey: 'messages' as const, desc: 'Mensagens da vizinhança' },
  { path: '/library', icon: BookOpen, labelKey: 'library' as const, desc: 'Saberes partilhados' },
  { path: '/calendar', icon: CalendarDays, labelKey: 'calendar' as const, desc: 'Eventos do bairro' },
];

export default function HomeScreen() {
  const { t } = useTranslation();
  const { networkMode } = useOutletContext<{ networkMode: NetworkMode }>();
  const totalContributions = mockContributions.length;
  const activeWorkshops = mockWorkshops.filter(w => w.status === 'active').length;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero */}
      <header className="mb-12 animate-fade-in-up text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <Leaf className="h-10 w-10 text-accent" aria-hidden="true" />
        </div>
        <h1 className="font-display text-4xl font-bold sm:text-5xl">{t.app.name}</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Arquivo vivo e participativo do Bairro C, Guimarães
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Uma rede mesh comunitária que preserva vozes, memórias e visões
        </p>
      </header>

      {/* Estatísticas */}
      <section className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4" aria-label="Estatísticas do arquivo">
        <StatCard label="Contribuições" value={totalContributions} />
        <StatCard label="Temas" value={7} />
        <StatCard label="Oficinas activas" value={activeWorkshops} />
        <StatCard label="Modo" value={networkMode === 'online' ? '🟢' : networkMode === 'mesh' ? '🔵' : '🟡'} />
      </section>

      {/* Acesso rápido */}
      <section aria-label="Acesso rápido">
        <h2 className="mb-4 font-display text-xl">Explorar</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map(link => {
            /* Mensagens só disponíveis em modo mesh */
            const disabled = link.path === '/messages' && networkMode !== 'mesh';
            return (
              <Link
                key={link.path}
                to={disabled ? '#' : link.path}
                className={`group flex items-center gap-4 rounded-lg border bg-card p-4 transition-all ${
                  disabled
                    ? 'cursor-not-allowed opacity-50'
                    : 'hover:border-accent hover:shadow-md'
                }`}
                aria-label={t.nav[link.labelKey]}
                aria-disabled={disabled}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-accent">
                  <link.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-medium">{t.nav[link.labelKey]}</p>
                  <p className="text-sm text-muted-foreground">{link.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border bg-card p-4 text-center">
      <p className="font-display text-2xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
