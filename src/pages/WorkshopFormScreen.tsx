/**
 * Formulário dinâmico de oficina — lê a configuração (form_config) e gera os campos.
 * Aceita texto, simula áudio e imagem com placeholders.
 */
import { useState } from 'react';
import { useParams, Link, useOutletContext } from 'react-router-dom';
import { ArrowLeft, Check, FileText, Mic, Camera } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import { mockWorkshops } from '@/data/mockData';
import type { NetworkMode } from '@/hooks/useNetworkStatus';

export default function WorkshopFormScreen() {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const { networkMode } = useOutletContext<{ networkMode: NetworkMode }>();
  const workshop = mockWorkshops.find(w => w.slug === slug);
  const [submitted, setSubmitted] = useState(false);
  const [text, setText] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  if (!workshop) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">{t.common.error}</p>
      </div>
    );
  }

  const fc = workshop.form_config;

  if (submitted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="animate-fade-in-up text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
            <Check className="h-8 w-8 text-accent" />
          </div>
          <h2 className="font-display text-2xl font-bold">{fc.confirmation_message}</h2>
          <Link to="/workshops" className="mt-4 inline-block text-sm text-accent underline">
            {t.common.back}
          </Link>
        </div>
      </div>
    );
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <Link
        to="/workshops"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> {t.common.back}
      </Link>

      <header className="mb-8">
        <h1 className="font-display text-2xl font-bold">{fc.main_question}</h1>
        <p className="mt-2 text-muted-foreground">{fc.instructions}</p>
      </header>

      {/* Formatos aceites */}
      <div className="mb-6 flex gap-2">
        {fc.accepted_types.includes('text') && (
          <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium">
            <FileText className="h-3 w-3" /> Texto
          </span>
        )}
        {fc.accepted_types.includes('audio') && (
          <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium">
            <Mic className="h-3 w-3" /> Áudio
          </span>
        )}
        {fc.accepted_types.includes('image') && (
          <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium">
            <Camera className="h-3 w-3" /> Imagem
          </span>
        )}
      </div>

      <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
        <div>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={fc.text_placeholder}
            rows={5}
            maxLength={fc.text_max_chars}
            required
            className="w-full resize-none rounded-lg border bg-card p-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
            aria-label={fc.text_placeholder}
          />
          <p className="mt-1 text-right text-xs text-muted-foreground">{text.length}/{fc.text_max_chars}</p>
        </div>

        {/* Tags personalizadas */}
        {fc.custom_tags.length > 0 && (
          <div>
            <p className="mb-2 text-sm font-medium">{t.contribute.tags_label}</p>
            <div className="flex flex-wrap gap-2">
              {fc.custom_tags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                    selectedTags.includes(tag)
                      ? 'border-accent bg-accent/10 text-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {fc.allow_anonymous && (
          <p className="text-xs text-muted-foreground">{t.contribute.anonymous_notice}</p>
        )}

        <button
          type="submit"
          disabled={!text.trim()}
          className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground transition-colors hover:bg-secondary disabled:opacity-50"
        >
          {t.contribute.submit}
        </button>
      </form>
    </div>
  );
}
