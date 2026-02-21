/**
 * Calendário Comunitário — eventos e encontros do bairro.
 * Lista cronológica com estado de aprovação.
 */
import { CalendarDays, MapPin, Clock, User } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import { mockCalendarEvents } from '@/data/mockData';

export default function CalendarScreen() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold">{t.calendar.title}</h1>
        <p className="mt-1 text-muted-foreground">{t.calendar.subtitle}</p>
      </header>

      <div className="space-y-4">
        {mockCalendarEvents.map(event => (
          <div key={event.id} className="rounded-xl border bg-card p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                {/* Data visual */}
                <div className="flex h-14 w-14 flex-shrink-0 flex-col items-center justify-center rounded-lg bg-muted">
                  <span className="text-xs font-medium text-muted-foreground">
                    {new Date(event.starts_at).toLocaleDateString('pt-PT', { month: 'short' }).toUpperCase()}
                  </span>
                  <span className="font-display text-xl font-bold">
                    {new Date(event.starts_at).getDate()}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold">{event.title}</h3>
                  {event.description && (
                    <p className="mt-1 text-sm text-muted-foreground">{event.description}</p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      {new Date(event.starts_at).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
                      {event.ends_at && ` — ${new Date(event.ends_at).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}`}
                    </span>
                    {event.location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" aria-hidden="true" />
                        {event.location}
                      </span>
                    )}
                    {event.organizer_display && (
                      <span className="inline-flex items-center gap-1">
                        <User className="h-3 w-3" aria-hidden="true" />
                        {event.organizer_display}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {/* Estado */}
              <span className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                event.status === 'approved'
                  ? 'bg-accent/20 text-foreground'
                  : event.status === 'pending'
                  ? 'bg-status-offline/20 text-foreground'
                  : 'bg-destructive/20 text-destructive'
              }`}>
                {event.status === 'approved' ? t.calendar.approved : t.calendar.pending}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
