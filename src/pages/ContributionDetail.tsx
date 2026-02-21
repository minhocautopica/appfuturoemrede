/**
 * Detalhe de uma contribuição do arquivo.
 * Mostra conteúdo completo, metadados e botão para responder.
 */
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, Mic, Image, MapPin, Tag, Clock } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import { mockContributions } from '@/data/mockData';
import ThemeBadge from '@/components/ThemeBadge';

export default function ContributionDetail() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const contribution = mockContributions.find(c => c.id === id);

  if (!contribution) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">{t.common.error}</p>
          <Link to="/archive" className="mt-2 inline-block text-sm text-accent underline">
            {t.common.back}
          </Link>
        </div>
      </div>
    );
  }

  const c = contribution;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Link
        to="/archive"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        aria-label={t.common.back}
      >
        <ArrowLeft className="h-4 w-4" /> {t.common.back}
      </Link>

      <article className="animate-fade-in-up rounded-xl border bg-card p-6 sm:p-8">
        {/* Metadados superiores */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <ThemeBadge theme={c.theme} label={t.archive.themes[c.theme] ?? c.theme} size="md" />
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
            {t.archive.types[c.type] ?? c.type}
          </span>
          <span className="rounded-full bg-muted px-3 py-1 text-xs">
            {t.archive.contexts[c.context_type] ?? c.context_type}
          </span>
        </div>

        {/* Conteúdo principal */}
        {c.type === 'text' && (
          <p className="mb-6 text-lg leading-relaxed">{c.content_text}</p>
        )}
        {c.type === 'audio' && (
          <div className="mb-6 rounded-lg bg-muted p-6 text-center">
            <Mic className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {c.content_text}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              <Clock className="mr-1 inline h-3 w-3" />
              {Math.floor((c.content_duration_seconds ?? 0) / 60)}:{String((c.content_duration_seconds ?? 0) % 60).padStart(2, '0')}
            </p>
            <div className="mt-3 h-2 rounded-full bg-accent/30">
              <div className="h-full w-1/3 rounded-full bg-accent" />
            </div>
          </div>
        )}
        {c.type === 'image' && (
          <div className="mb-6 rounded-lg bg-muted p-8 text-center">
            <Image className="mx-auto mb-2 h-12 w-12 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">{c.content_text}</p>
          </div>
        )}

        {/* Detalhes */}
        <div className="space-y-3 border-t pt-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {c.author_type === 'anonymous' ? t.common.anonymous : c.author_display}
            </span>
            {c.author_type === 'pseudonym' && (
              <span className="text-xs">(pseudónimo)</span>
            )}
          </div>

          {c.geo_label && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {c.geo_label}
            </div>
          )}

          {c.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <Tag className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              {c.tags.map(tag => (
                <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-xs">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <time dateTime={c.created_at}>
              {new Date(c.created_at).toLocaleDateString('pt-PT', {
                day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
              })}
            </time>
            <span>· {c.license}</span>
          </div>
        </div>

        {/* Acção */}
        <div className="mt-6 border-t pt-4">
          <Link
            to="/contribute"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-secondary"
          >
            Responder a esta contribuição
          </Link>
        </div>
      </article>
    </div>
  );
}
