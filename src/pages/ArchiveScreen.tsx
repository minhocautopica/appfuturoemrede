/**
 * Ecrã do Arquivo Vivo — lista, filtra e pesquisa contribuições.
 * Mostra contribuições em cards com tema, tipo e contexto.
 */
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText, Mic, Image, Video, Vote } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import { mockContributions } from '@/data/mockData';
import ThemeBadge from '@/components/ThemeBadge';

const typeIcons: Record<string, typeof FileText> = {
  text: FileText,
  audio: Mic,
  image: Image,
  video: Video,
  vote_result: Vote,
};

export default function ArchiveScreen() {
  const { t } = useTranslation();
  const [themeFilter, setThemeFilter] = useState('all');
  const [search, setSearch] = useState('');

  const themes = Object.entries(t.archive.themes);

  const filtered = useMemo(() => {
    return mockContributions.filter(c => {
      if (themeFilter !== 'all' && c.theme !== themeFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        const text = (c.content_text ?? '').toLowerCase();
        const tags = c.tags.join(' ').toLowerCase();
        const author = (c.author_display ?? '').toLowerCase();
        if (!text.includes(q) && !tags.includes(q) && !author.includes(q)) return false;
      }
      return true;
    });
  }, [themeFilter, search]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* Cabeçalho */}
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold">{t.archive.title}</h1>
        <p className="mt-1 text-muted-foreground">{t.archive.subtitle}</p>
      </header>

      {/* Filtros */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Pesquisa */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            type="search"
            placeholder={t.archive.search_placeholder}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-lg border bg-card py-2.5 pl-10 pr-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
            aria-label={t.archive.search_placeholder}
          />
        </div>
        {/* Filtro de tema */}
        <select
          value={themeFilter}
          onChange={e => setThemeFilter(e.target.value)}
          className="rounded-lg border bg-card px-3 py-2.5 text-sm outline-none focus:border-accent"
          aria-label={t.archive.filter_by_theme}
        >
          <option value="all">{t.archive.all_themes}</option>
          {themes.map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      {/* Contagem */}
      <p className="mb-4 text-sm text-muted-foreground">
        {filtered.length} {t.archive.contributions}
      </p>

      {/* Lista de contribuições */}
      {filtered.length === 0 ? (
        <div className="rounded-lg border bg-card p-8 text-center">
          <p className="text-muted-foreground">{t.archive.empty}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((c, i) => {
            const Icon = typeIcons[c.type] ?? FileText;
            return (
              <Link
                key={c.id}
                to={`/archive/${c.id}`}
                className="block rounded-lg border bg-card p-4 transition-all hover:border-accent hover:shadow-sm"
                style={{ animationDelay: `${i * 50}ms` }}
                aria-label={`${t.archive.types[c.type] ?? c.type}: ${c.content_text?.slice(0, 60) ?? 'Contribuição'}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1.5 flex flex-wrap items-center gap-2">
                      <ThemeBadge theme={c.theme} label={t.archive.themes[c.theme] ?? c.theme} />
                      <span className="text-xs text-muted-foreground">
                        {t.archive.contexts[c.context_type] ?? c.context_type}
                      </span>
                      {c.geo_label && (
                        <span className="text-xs text-muted-foreground">· {c.geo_label}</span>
                      )}
                    </div>
                    <p className="line-clamp-2 text-sm">
                      {c.content_text ?? `[${t.archive.types[c.type]}]`}
                    </p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                      <span>
                        {c.author_type === 'anonymous' ? t.common.anonymous : c.author_display}
                      </span>
                      <span>·</span>
                      <time dateTime={c.created_at}>
                        {new Date(c.created_at).toLocaleDateString('pt-PT', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        })}
                      </time>
                      {c.type === 'audio' && c.content_duration_seconds && (
                        <>
                          <span>·</span>
                          <span>{Math.floor(c.content_duration_seconds / 60)}:{String(c.content_duration_seconds % 60).padStart(2, '0')}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
