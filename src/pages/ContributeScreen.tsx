/**
 * Ecrã de contribuição geral (fora de oficina).
 * Permite ao utilizador submeter texto com tema, autoria e tags.
 * No protótipo, guarda em estado local e mostra confirmação.
 */
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FileText, Mic, Camera, Check } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import type { NetworkMode } from '@/hooks/useNetworkStatus';

type AuthorType = 'named' | 'pseudonym' | 'anonymous';

export default function ContributeScreen() {
  const { t } = useTranslation();
  const { networkMode } = useOutletContext<{ networkMode: NetworkMode }>();
  const [submitted, setSubmitted] = useState(false);
  const [contentText, setContentText] = useState('');
  const [theme, setTheme] = useState('');
  const [authorType, setAuthorType] = useState<AuthorType>('anonymous');
  const [authorDisplay, setAuthorDisplay] = useState('');
  const [tagsText, setTagsText] = useState('');

  const themes = Object.entries(t.archive.themes);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No protótipo, apenas mostra confirmação
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="animate-fade-in-up text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
            <Check className="h-8 w-8 text-accent" />
          </div>
          <h2 className="font-display text-2xl font-bold">
            {networkMode === 'online' ? t.contribute.saved_online : t.contribute.saved_offline}
          </h2>
          <button
            onClick={() => {
              setSubmitted(false);
              setContentText('');
              setTheme('');
              setTagsText('');
            }}
            className="mt-4 text-sm text-accent underline"
          >
            Fazer outra contribuição
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold">{t.contribute.title}</h1>
        <p className="mt-1 text-muted-foreground">{t.contribute.subtitle}</p>
      </header>

      {/* Formatos disponíveis */}
      <div className="mb-8 grid grid-cols-3 gap-3">
        <FormatButton icon={FileText} label={t.contribute.write} active />
        <FormatButton icon={Mic} label={t.contribute.record} disabled />
        <FormatButton icon={Camera} label={t.contribute.photograph} disabled />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Texto */}
        <div>
          <textarea
            value={contentText}
            onChange={e => setContentText(e.target.value)}
            placeholder={t.contribute.text_placeholder}
            rows={5}
            maxLength={500}
            required
            className="w-full resize-none rounded-lg border bg-card p-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
            aria-label={t.contribute.text_placeholder}
          />
          <p className="mt-1 text-right text-xs text-muted-foreground">{contentText.length}/500</p>
        </div>

        {/* Tema */}
        <div>
          <label className="mb-1.5 block text-sm font-medium">{t.contribute.select_theme}</label>
          <select
            value={theme}
            onChange={e => setTheme(e.target.value)}
            required
            className="w-full rounded-lg border bg-card px-3 py-2.5 text-sm outline-none focus:border-accent"
            aria-label={t.contribute.select_theme}
          >
            <option value="">—</option>
            {themes.map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        {/* Autoria */}
        <fieldset>
          <legend className="mb-2 text-sm font-medium">{t.contribute.author_type}</legend>
          <div className="flex flex-wrap gap-2">
            {(['anonymous', 'pseudonym', 'named'] as const).map(at => (
              <label
                key={at}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                  authorType === at ? 'border-accent bg-accent/10' : 'hover:bg-muted'
                }`}
              >
                <input
                  type="radio"
                  name="author_type"
                  value={at}
                  checked={authorType === at}
                  onChange={() => setAuthorType(at)}
                  className="sr-only"
                />
                {at === 'anonymous' ? t.contribute.author_anonymous :
                 at === 'pseudonym' ? t.contribute.author_pseudonym :
                 t.contribute.author_named}
              </label>
            ))}
          </div>
          {authorType !== 'anonymous' && (
            <input
              type="text"
              value={authorDisplay}
              onChange={e => setAuthorDisplay(e.target.value)}
              placeholder={t.contribute.display_name}
              className="mt-3 w-full rounded-lg border bg-card px-3 py-2.5 text-sm outline-none focus:border-accent"
              aria-label={t.contribute.display_name}
            />
          )}
        </fieldset>

        {/* Tags */}
        <div>
          <label className="mb-1.5 block text-sm font-medium">{t.contribute.tags_label}</label>
          <input
            type="text"
            value={tagsText}
            onChange={e => setTagsText(e.target.value)}
            placeholder={t.contribute.tags_placeholder}
            className="w-full rounded-lg border bg-card px-3 py-2.5 text-sm outline-none focus:border-accent"
            aria-label={t.contribute.tags_label}
          />
        </div>

        {/* Aviso de anonimato */}
        <p className="text-xs text-muted-foreground">{t.contribute.anonymous_notice}</p>

        {/* Submeter */}
        <button
          type="submit"
          disabled={!contentText.trim() || !theme}
          className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground transition-colors hover:bg-secondary disabled:opacity-50"
        >
          {t.contribute.submit}
        </button>
      </form>
    </div>
  );
}

function FormatButton({ icon: Icon, label, active, disabled }: {
  icon: typeof FileText;
  label: string;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`flex flex-col items-center gap-2 rounded-lg border p-4 text-sm font-medium transition-colors ${
        active
          ? 'border-accent bg-accent/10 text-foreground'
          : disabled
          ? 'cursor-not-allowed opacity-40'
          : 'hover:bg-muted'
      }`}
      aria-label={label}
    >
      <Icon className="h-6 w-6" aria-hidden="true" />
      {label}
    </button>
  );
}
