/**
 * Biblioteca Comum — saberes e recursos partilhados do bairro.
 * Mostra itens organizados por categoria.
 */
import { useState } from 'react';
import { BookOpen, ChefHat, Phone, Calendar, Lightbulb, Wrench, Folder } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import { mockLibraryItems } from '@/data/mockData';

const categoryIcons: Record<string, typeof BookOpen> = {
  recipe: ChefHat,
  contact: Phone,
  event: Calendar,
  knowledge: Lightbulb,
  tool: Wrench,
  other: Folder,
};

export default function LibraryScreen() {
  const { t } = useTranslation();
  const [catFilter, setCatFilter] = useState('all');
  const categories = Object.entries(t.library.categories);

  const filtered = catFilter === 'all'
    ? mockLibraryItems
    : mockLibraryItems.filter(item => item.category === catFilter);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold">{t.library.title}</h1>
        <p className="mt-1 text-muted-foreground">{t.library.subtitle}</p>
      </header>

      {/* Filtros de categoria */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setCatFilter('all')}
          className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
            catFilter === 'all' ? 'border-accent bg-accent/10' : 'hover:bg-muted'
          }`}
        >
          Todos
        </button>
        {categories.map(([key, label]) => {
          const Icon = categoryIcons[key] ?? Folder;
          return (
            <button
              key={key}
              onClick={() => setCatFilter(key)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors ${
                catFilter === key ? 'border-accent bg-accent/10' : 'hover:bg-muted'
              }`}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              {label}
            </button>
          );
        })}
      </div>

      {/* Lista */}
      <div className="space-y-3">
        {filtered.map(item => {
          const Icon = categoryIcons[item.category] ?? Folder;
          return (
            <div key={item.id} className="rounded-lg border bg-card p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  {item.description && (
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                  )}
                  {item.content && (
                    <p className="mt-2 text-sm">{item.content}</p>
                  )}
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    {item.author_display && <span>{item.author_display}</span>}
                    <span>·</span>
                    <time dateTime={item.created_at}>
                      {new Date(item.created_at).toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' })}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
