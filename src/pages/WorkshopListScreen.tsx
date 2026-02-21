/**
 * Lista de oficinas (workshops) activas e encerradas.
 * Cada oficina leva a um formulário dinâmico configurado via form_config.
 */
import { Link } from 'react-router-dom';
import { Users, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import { mockWorkshops } from '@/data/mockData';
import ThemeBadge from '@/components/ThemeBadge';

export default function WorkshopListScreen() {
  const { t } = useTranslation();
  const active = mockWorkshops.filter(w => w.status === 'active');
  const closed = mockWorkshops.filter(w => w.status === 'closed');

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold">{t.workshops.title}</h1>
        <p className="mt-1 text-muted-foreground">{t.workshops.subtitle}</p>
      </header>

      <section className="mb-10">
        <h2 className="mb-4 font-display text-xl">{t.workshops.active}</h2>
        {active.length === 0 ? (
          <p className="text-muted-foreground">{t.workshops.no_active}</p>
        ) : (
          <div className="space-y-3">
            {active.map(w => (
              <Link
                key={w.id}
                to={`/workshops/${w.slug}`}
                className="group flex items-center justify-between rounded-xl border bg-card p-5 transition-all hover:border-accent hover:shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Users className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{w.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{w.description}</p>
                    <div className="mt-2">
                      <ThemeBadge theme={w.theme} label={t.archive.themes[w.theme] ?? w.theme} />
                    </div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        )}
      </section>

      {closed.length > 0 && (
        <section>
          <h2 className="mb-4 font-display text-xl text-muted-foreground">{t.workshops.closed}</h2>
          <div className="space-y-3 opacity-60">
            {closed.map(w => (
              <div key={w.id} className="rounded-xl border bg-card p-5">
                <h3 className="font-display text-lg">{w.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{w.description}</p>
                <div className="mt-2">
                  <ThemeBadge theme={w.theme} label={t.archive.themes[w.theme] ?? w.theme} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
